import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { spawn } from 'child_process';
import vm from 'vm';

export async function POST(request) {
  try {
    const { language, code } = await request.json();

    if (!language || !code) {
      return new Response(JSON.stringify({ error: 'language and code are required' }), { status: 400 });
    }

    if (language === 'javascript') {
      const logs = [];
      const sandbox = {
        console: { log: (...args) => logs.push(args.map(a => String(a)).join(' ')) },
        // do not expose require, process, or other globals
      };

      vm.createContext(sandbox);
      const wrapped = `(async () => { try { ${code} } catch(e) { console.log('UNCAUGHT:', e && e.stack ? e.stack : String(e)) } })()`;

      try {
        const script = new vm.Script(wrapped, { filename: 'user-code.js' });
        // run with a timeout to avoid long loops
        const result = await script.runInContext(sandbox, { timeout: 2000 });
        return new Response(JSON.stringify({ stdout: logs.join('\n'), result: null }), { status: 200 });
      } catch (err) {
        return new Response(JSON.stringify({ stdout: logs.join('\n'), error: String(err) }), { status: 200 });
      }
    }

    if (language === 'python') {
      const dir = tmpdir();
      const filename = `user_code_${Date.now()}.py`;
      const filepath = join(dir, filename);
      await writeFile(filepath, code, 'utf8');

      return await new Promise((resolve) => {
        const proc = spawn('python', [filepath], { shell: false });
        proc.on('error', async (err) => {
          try { await unlink(filepath); } catch (e) {}
          resolve(new Response(JSON.stringify({ error: `python execution error: ${String(err)}` }), { status: 200 }));
        });
        let stdout = '';
        let stderr = '';
        const killTimer = setTimeout(() => {
          try { proc.kill('SIGKILL'); } catch (e) {}
        }, 7000);

        proc.stdout.on('data', (d) => (stdout += d.toString()));
        proc.stderr.on('data', (d) => (stderr += d.toString()));

        proc.on('close', async (codeExit) => {
          clearTimeout(killTimer);
          try { await unlink(filepath); } catch (e) {}
          resolve(new Response(JSON.stringify({ stdout, stderr, exitCode: codeExit }), { status: 200 }));
        });
      });
    }

    if (language === 'java') {
      const dir = tmpdir();
      const filename = `UserProgram_${Date.now()}.java`;
      const filepath = join(dir, filename);

      // Detect class name in user code
      let className = null;
      const classMatch = code.match(/public\s+class\s+(\w+)/) || code.match(/class\s+(\w+)/);
      if (classMatch) className = classMatch[1];

      let source = code;
      if (!className) {
        className = 'Main';
        // Wrap user's code into a Main class main method
        source = `public class ${className} { public static void main(String[] args) {\n${code}\n} }`;
      }

      await writeFile(filepath, source, 'utf8');

      return await new Promise((resolve) => {
        const compile = spawn('javac', [filepath], { shell: false });
        let compOut = '';
        let compErr = '';
        const compKill = setTimeout(() => {
          try { compile.kill('SIGKILL'); } catch (e) {}
        }, 10000);

        compile.on('error', async (err) => {
          try { await unlink(filepath); } catch (e) {}
          resolve(new Response(JSON.stringify({ error: `javac error: ${String(err)}` }), { status: 200 }));
        });

        compile.stdout.on('data', (d) => (compOut += d.toString()));
        compile.stderr.on('data', (d) => (compErr += d.toString()));

        compile.on('close', (codeExit) => {
          clearTimeout(compKill);
          if (codeExit !== 0) {
            (async () => { try { await unlink(filepath); } catch (e) {} })();
            resolve(new Response(JSON.stringify({ compileStdout: compOut, compileStderr: compErr, compileExitCode: codeExit }), { status: 200 }));
            return;
          }

          // Run with 'java -cp <dir> <className>'
          const proc = spawn('java', ['-cp', dir, className], { shell: false });
          proc.on('error', async (err) => {
            try { await unlink(filepath); } catch (e) {}
            resolve(new Response(JSON.stringify({ error: `java runtime error: ${String(err)}` }), { status: 200 }));
          });

          let stdout = '';
          let stderr = '';
          const runKill = setTimeout(() => {
            try { proc.kill('SIGKILL'); } catch (e) {}
          }, 7000);

          proc.stdout.on('data', (d) => (stdout += d.toString()));
          proc.stderr.on('data', (d) => (stderr += d.toString()));

          proc.on('close', async (runCode) => {
            clearTimeout(runKill);
            try { await unlink(filepath); } catch (e) {}
            try {
              const classFile = join(dir, `${className}.class`);
              await unlink(classFile).catch(() => {});
            } catch (e) {}
            resolve(new Response(JSON.stringify({ compileStdout: compOut, compileStderr: compErr, compileExitCode: codeExit, stdout, stderr, runExitCode: runCode }), { status: 200 }));
          });
        });
      });
    }

    if (language === 'cpp' || language === 'c++') {
      const dir = tmpdir();
      const filename = `user_code_${Date.now()}.cpp`;
      const filepath = join(dir, filename);
      await writeFile(filepath, code, 'utf8');

      const exeName = `user_exec_${Date.now()}${process.platform === 'win32' ? '.exe' : ''}`;
      const exePath = join(dir, exeName);

      // Compile with g++
      return await new Promise((resolve) => {
        const compile = spawn('g++', [filepath, '-O2', '-std=c++17', '-o', exePath], { shell: false });
        let compOut = '';
        let compErr = '';
        const compKill = setTimeout(() => {
          try { compile.kill('SIGKILL'); } catch (e) {}
        }, 10000);

        compile.stdout.on('data', (d) => (compOut += d.toString()));
        compile.stderr.on('data', (d) => (compErr += d.toString()));

        compile.on('close', (codeExit) => {
          clearTimeout(compKill);
          if (codeExit !== 0) {
            // compilation failed
            (async () => { try { await unlink(filepath); } catch (e) {} })();
            resolve(new Response(JSON.stringify({ compileStdout: compOut, compileStderr: compErr, compileExitCode: codeExit }), { status: 200 }));
            return;
          }

          // Run the executable
          const proc = spawn(exePath, [], { shell: false });
          let stdout = '';
          let stderr = '';
          const runKill = setTimeout(() => {
            try { proc.kill('SIGKILL'); } catch (e) {}
          }, 7000);

          proc.stdout.on('data', (d) => (stdout += d.toString()));
          proc.stderr.on('data', (d) => (stderr += d.toString()));

          proc.on('close', async (runCode) => {
            clearTimeout(runKill);
            try { await unlink(filepath); } catch (e) {}
            try { await unlink(exePath); } catch (e) {}
            resolve(new Response(JSON.stringify({ compileStdout: compOut, compileStderr: compErr, compileExitCode: codeExit, stdout, stderr, runExitCode: runCode }), { status: 200 }));
          });
        });
      });
    }

    return new Response(JSON.stringify({ error: 'language not supported' }), { status: 400 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
