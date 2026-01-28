// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import Editor from "@monaco-editor/react";

// export default function CodeWorkspace({ question }) {
//   // Use starterCode.javascript from your schema
//   const [code, setCode] = useState(question.starterCode?.javascript || "// write your code here");
//   const [output, setOutput] = useState([]);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const workerRef = useRef(null);
//   const editorRef = useRef(null);

//   // 1. Guard against mounting issues
//   useEffect(() => {
//     setIsMounted(true);
//     workerRef.current = new Worker('/codeWorker.js');
//     return () => {
//       if (workerRef.current) workerRef.current.terminate();
//     };
//   }, []);

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor;
//   };

//   // const runTestCases = () => {
//   //   if (!workerRef.current) return;
//   //   setIsRunning(true);
//   //   setOutput([]); 

//   //   question.testCases.forEach((tc, index) => {
//   //     workerRef.current.postMessage({ code, input: tc.input });

//   //     workerRef.current.onmessage = (e) => {
//   //       const { success, output: userOutput, error, time } = e.data;
//   //       const passed = success && String(userOutput).trim() === String(tc.expectedOutput).trim();
        
//   //       setOutput(prev => [...prev, {
//   //         index,
//   //         passed,
//   //         userOutput: success ? userOutput : error,
//   //         expected: tc.expectedOutput,
//   //         time
//   //       }]);

//   //       if (index === question.testCases.length - 1) setIsRunning(false);
//   //     };
//   //   });
//   // };

//   const runTestCases = async () => {
//     setIsRunning(true);
//     setOutput([]); 
  
//     // Use a standard for...of loop to handle async/await
//     for (let i = 0; i < question.testCases.length; i++) {
//       const tc = question.testCases[i];
      
//       // We wrap the worker logic in a Promise to wait for it
//       const result = await new Promise((resolve) => {
//         workerRef.current.postMessage({ code, input: tc.input });
        
//         workerRef.current.onmessage = (e) => {
//           resolve(e.data);
//         };
//       });
  
//       const { success, output: userOutput, error, time } = result;
//       const passed = success && String(userOutput).trim() === String(tc.expectedOutput).trim();
  
//       setOutput(prev => [...prev, {
//         index: i,
//         passed,
//         userOutput: success ? userOutput : error,
//         expected: tc.expectedOutput,
//         time
//       }]);
//     }
    
//     setIsRunning(false);
//   };

//   if (!isMounted) return null;

//   return (
//     <div className="flex h-[calc(100vh-56px)] bg-[#020617] text-slate-300">
//       {/* Left: Problem Info */}
//       <div className="w-1/3 p-6 border-r border-white/10 overflow-y-auto">
//         <h2 className="text-xl font-bold text-white mb-4">{question.title}</h2>
//         <div 
//           className="prose prose-invert prose-sm max-w-none" 
//           dangerouslySetInnerHTML={{ __html: question.problemStatement }} 
//         />
//       </div>

//       {/* Right: Code & Console */}
//       <div className="flex-1 flex flex-col">
//         <div className="h-2/3 border-b border-white/10">
//           <Editor
//             height="100%"
//             theme="vs-dark"
//             defaultLanguage="javascript"
//             value={code}
//             onMount={handleEditorDidMount}
//             onChange={(val) => setCode(val)}
//             options={{ 
//               fontSize: 14, 
//               minimap: { enabled: false },
//               automaticLayout: true,
//               scrollBeyondLastLine: false,
//             }}
//           />
//         </div>

//         <div className="h-1/3 bg-[#0a0f1e] p-4 overflow-y-auto">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Terminal_Output</h3>
//             <button 
//               onClick={runTestCases}
//               disabled={isRunning}
//               className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-black px-4 py-1.5 rounded font-bold text-xs transition-all"
//             >
//               {isRunning ? "Executing..." : "Run Test Cases"}
//             </button>
//           </div>

//           <div className="space-y-2">
//             {output.map((res, i) => (
//               <div key={i} className={`p-3 rounded border ${res.passed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
//                 <div className="flex justify-between text-[10px] mb-1 uppercase font-bold">
//                   <span className={res.passed ? 'text-emerald-400' : 'text-red-400'}>
//                     Test Case {res.index + 1}: {res.passed ? 'Success' : 'Failure'}
//                   </span>
//                   <span className="text-slate-500">{res.time}ms</span>
//                 </div>
//                 <div className="font-mono text-xs">
//                    <p className="text-slate-300">Output: <span className="text-white">{String(res.userOutput)}</span></p>
//                    {!res.passed && <p className="text-slate-500">Expected: {res.expected}</p>}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import Editor from "@monaco-editor/react";

// export default function CodeWorkspace({ question }) {
//   const [activeTab, setActiveTab] = useState('problem'); // 'problem' or 'solution'
//   const [code, setCode] = useState(question.starterCode?.javascript || "");
//   // ... (keep your existing state and worker logic)
//   const [output, setOutput] = useState([]);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const workerRef = useRef(null);
//   const editorRef = useRef(null);

//   // 1. Guard against mounting issues
//   useEffect(() => {
//     setIsMounted(true);
//     workerRef.current = new Worker('/codeWorker.js');
//     return () => {
//       if (workerRef.current) workerRef.current.terminate();
//     };
//   }, []);

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor;
//   };

//   // const runTestCases = () => {
//   //   if (!workerRef.current) return;
//   //   setIsRunning(true);
//   //   setOutput([]); 

//   //   question.testCases.forEach((tc, index) => {
//   //     workerRef.current.postMessage({ code, input: tc.input });

//   //     workerRef.current.onmessage = (e) => {
//   //       const { success, output: userOutput, error, time } = e.data;
//   //       const passed = success && String(userOutput).trim() === String(tc.expectedOutput).trim();
        
//   //       setOutput(prev => [...prev, {
//   //         index,
//   //         passed,
//   //         userOutput: success ? userOutput : error,
//   //         expected: tc.expectedOutput,
//   //         time
//   //       }]);

//   //       if (index === question.testCases.length - 1) setIsRunning(false);
//   //     };
//   //   });
//   // };

//   const runTestCases = async () => {
//     setIsRunning(true);
//     setOutput([]); 
  
//     // Use a standard for...of loop to handle async/await
//     for (let i = 0; i < question.testCases.length; i++) {
//       const tc = question.testCases[i];
      
//       // We wrap the worker logic in a Promise to wait for it
//       const result = await new Promise((resolve) => {
//         workerRef.current.postMessage({ code, input: tc.input });
        
//         workerRef.current.onmessage = (e) => {
//           resolve(e.data);
//         };
//       });
  
//       const { success, output: userOutput, error, time } = result;
//       const passed = success && String(userOutput).trim() === String(tc.expectedOutput).trim();
  
//       setOutput(prev => [...prev, {
//         index: i,
//         passed,
//         userOutput: success ? userOutput : error,
//         expected: tc.expectedOutput,
//         time
//       }]);
//     }
    
//     setIsRunning(false);
//   };

//   if (!isMounted) return null;

//   return (
//     <div className="flex h-[calc(100vh-56px)] bg-[#020617] text-slate-300">
      
//       {/* LEFT PANEL: Description & Solution */}
//       <div className="w-1/3 flex flex-col border-r border-white/10">
//         {/* Tabs Header */}
//         <div className="flex border-b border-white/10 bg-slate-900/50">
//           <button 
//             onClick={() => setActiveTab('problem')}
//             className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'problem' ? 'text-sky-400 border-b-2 border-sky-400 bg-sky-400/5' : 'text-slate-500 hover:text-slate-300'}`}
//           >
//             Description
//           </button>
//           <button 
//             onClick={() => setActiveTab('solution')}
//             className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'solution' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-400/5' : 'text-slate-500 hover:text-slate-300'}`}
//           >
//             View_Solution
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="flex-1 p-6 overflow-y-auto">
//           {activeTab === 'problem' ? (
//             <div className="space-y-8">
//             {/* Title & Description */}
//             <section>
//               <h2 className="text-xl font-bold text-white mb-4">{question.title}</h2>
//               <div 
//                 className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed" 
//                 dangerouslySetInnerHTML={{ __html: question.problemStatement }} 
//               />
//             </section>
      
//             {/* Test Cases Section */}
//             <section className="space-y-4">
//               <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-white/5 pb-2">
//                 Examples
//               </h3>
              
//               <div className="space-y-4">
//                 {question.testCases
//                   .filter(tc => tc.isPublic) // Only show public examples
//                   .map((tc, idx) => (
//                     <div key={idx} className="bg-slate-900/50 rounded-lg p-4 border border-white/5 font-mono text-xs">
//                       <div className="mb-3">
//                         <span className="text-sky-500 mb-1 block uppercase text-[10px] font-bold">Input</span>
//                         <code className="text-slate-200 bg-black/30 px-2 py-1 rounded block w-full overflow-x-auto">
//                           {tc.input}
//                         </code>
//                       </div>
//                       <div>
//                         <span className="text-emerald-500 mb-1 block uppercase text-[10px] font-bold">Expected Output</span>
//                         <code className="text-slate-200 bg-black/30 px-2 py-1 rounded block w-full overflow-x-auto">
//                           {tc.expectedOutput}
//                         </code>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </section>
//           </div>
//           ) : (
//             <div className="space-y-4">
//               <h3 className="text-emerald-400 font-bold flex items-center gap-2 text-sm">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//                 Reference_Implementation
//               </h3>
//               <div className="rounded-2xl border border-white/5 overflow-hidden">
//                 <Editor
//                   height="400px"
//                   theme="vs-dark"
//                   defaultLanguage="javascript"
//                   value={question.solutionCode?.javascript || "// No solution provided yet."}
//                   options={{ 
//                     readOnly: true, 
//                     minimap: { enabled: false },
//                     fontSize: 12,
//                     lineNumbers: 'on',
//                     domReadOnly: true
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* RIGHT PANEL: User Editor (Keep your existing code here) */}
//       <div className="flex-1 flex flex-col">
//         <div className="h-2/3 border-b border-white/10">
//           <Editor
//             height="100%"
//             theme="vs-dark"
//             defaultLanguage="javascript"
//             value={code}
//             onMount={handleEditorDidMount}
//             onChange={(val) => setCode(val)}
//             options={{ 
//               fontSize: 14, 
//               minimap: { enabled: false },
//               automaticLayout: true,
//               scrollBeyondLastLine: false,
//             }}
//           />
//         </div>

//         <div className="h-1/3 bg-[#0a0f1e] p-4 overflow-y-auto">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Terminal_Output</h3>
//             <button 
//               onClick={runTestCases}
//               disabled={isRunning}
//               className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-black px-4 py-1.5 rounded font-bold text-xs transition-all"
//             >
//               {isRunning ? "Executing..." : "Run Test Cases"}
//             </button>
//           </div>

//           <div className="space-y-2">
//             {output.map((res, i) => (
//               <div key={i} className={`p-3 rounded border ${res.passed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
//                 <div className="flex justify-between text-[10px] mb-1 uppercase font-bold">
//                   <span className={res.passed ? 'text-emerald-400' : 'text-red-400'}>
//                     Test Case {res.index + 1}: {res.passed ? 'Success' : 'Failure'}
//                   </span>
//                   <span className="text-slate-500">{res.time}ms</span>
//                 </div>
//                 <div className="font-mono text-xs">
//                    <p className="text-slate-300">Output: <span className="text-white">{String(res.userOutput)}</span></p>
//                    {!res.passed && <p className="text-slate-500">Expected: {res.expected}</p>}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect, useRef } from 'react';
import Editor from "@monaco-editor/react";

export default function CodeWorkspace({ question }) {
  const [activeTab, setActiveTab] = useState('problem');
  const [code, setCode] = useState(question.starterCode?.javascript || "");
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const workerRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    workerRef.current = new Worker('/codeWorker.js');
    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // Logic to execute code against a subset of test cases
  const executeTests = async (testSet) => {
    const results = [];
    let allPassed = true;

    for (let i = 0; i < testSet.length; i++) {
      const tc = testSet[i];
      const result = await new Promise((resolve) => {
        workerRef.current.postMessage({ code, input: tc.input });
        workerRef.current.onmessage = (e) => resolve(e.data);
      });

      const { success, output: userOutput, error, time } = result;
      const passed = success && String(userOutput).trim() === String(tc.expectedOutput).trim();
      
      if (!passed) allPassed = false;

      results.push({
        index: i,
        passed,
        userOutput: success ? userOutput : error,
        expected: tc.expectedOutput,
        time,
        isPublic: tc.isPublic
      });
    }
    return { results, allPassed };
  };

  const runTestCases = async () => {
    setIsRunning(true);
    setShowSuccess(false);
    setOutput([]);
    
    // Only run public test cases for the "Run" action
    const publicTests = question.testCases.filter(tc => tc.isPublic);
    const { results } = await executeTests(publicTests);
    
    setOutput(results);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setShowSuccess(false);
    setOutput([]);

    // Run ALL test cases (public + hidden)
    const { results, allPassed } = await executeTests(question.testCases);

    setOutput(results);
    setIsSubmitting(false);
    
    if (allPassed) {
      setShowSuccess(true);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#020617] text-slate-300">
      
      {/* LEFT PANEL: Description & Solution */}
      <div className="w-1/3 flex flex-col border-r border-white/10 overflow-hidden">
        <div className="flex border-b border-white/10 bg-slate-900/50">
          <button onClick={() => setActiveTab('problem')} className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'problem' ? 'text-sky-400 border-b-2 border-sky-400 bg-sky-400/5' : 'text-slate-500'}`}>Description</button>
          <button onClick={() => setActiveTab('solution')} className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'solution' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-400/5' : 'text-slate-500'}`}>View_Solution</button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {activeTab === 'problem' ? (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-white mb-2">{question.title}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${question.difficulty === 'Hard' ? 'border-red-500/50 text-red-500' : 'border-sky-500/50 text-sky-500'}`}>{question.difficulty}</span>
                <div className="prose prose-invert prose-sm max-w-none mt-4 text-slate-300" dangerouslySetInnerHTML={{ __html: question.problemStatement }} />
              </section>
              
              <section className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-white/5 pb-2">Examples</h3>
                {question.testCases.filter(tc => tc.isPublic).map((tc, idx) => (
                  <div key={idx} className="bg-slate-900/50 rounded-lg p-4 border border-white/5 font-mono text-xs">
                    <div className="mb-2"><span className="text-sky-500 text-[10px] font-bold uppercase block">Input</span><code className="text-slate-200">{tc.input}</code></div>
                    <div><span className="text-emerald-500 text-[10px] font-bold uppercase block">Output</span><code className="text-slate-200">{tc.expectedOutput}</code></div>
                  </div>
                ))}
              </section>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-emerald-400 font-bold flex items-center gap-2 text-sm">Reference_Implementation</h3>
              <div className="rounded-xl border border-white/5 overflow-hidden">
                <Editor height="400px" theme="vs-dark" defaultLanguage="javascript" value={question.solutionCode?.javascript} options={{ readOnly: true, minimap: { enabled: false }, fontSize: 12 }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Editor & Terminal */}
      <div className="flex-1 flex flex-col relative">
        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center p-6">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/50 animate-pulse">
              <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter mb-2">SUCCESS!</h2>
            <p className="text-slate-400 text-sm max-w-xs mb-6">All test cases, including hidden ones, have passed perfectly.</p>
            <button onClick={() => setShowSuccess(false)} className="bg-emerald-500 text-black px-8 py-2 rounded-full font-bold hover:scale-105 transition-transform">Continue Exploring</button>
          </div>
        )}

        <div className="h-2/3 border-b border-white/10">
          <Editor height="100%" theme="vs-dark" defaultLanguage="javascript" value={code} onMount={handleEditorDidMount} onChange={(val) => setCode(val)} options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }} />
        </div>

        <div className="h-1/3 bg-[#0a0f1e] p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Console</h3>
            <div className="flex gap-3">
              <button onClick={runTestCases} disabled={isRunning || isSubmitting} className="text-slate-400 hover:text-white px-4 py-1.5 rounded font-bold text-xs transition-all disabled:opacity-30">Run Code</button>
              <button onClick={handleSubmit} disabled={isRunning || isSubmitting} className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-1.5 rounded font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-30">{isSubmitting ? "Submitting..." : "Submit"}</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
            {output.map((res, i) => (
              <div key={i} className={`p-3 rounded border ${res.passed ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                <div className="flex justify-between text-[10px] mb-1 font-bold uppercase tracking-tight">
                  <span className={res.passed ? 'text-emerald-400' : 'text-red-400'}>{res.isPublic ? `Test Case ${i+1}` : 'Hidden Test Case'} {res.passed ? '✓' : '✗'}</span>
                  <span className="text-slate-600 font-mono">{res.time}ms</span>
                </div>
                <div className="font-mono text-[11px] space-y-1">
                  <p className="text-slate-400">Output: <span className="text-slate-100">{String(res.userOutput)}</span></p>
                  {!res.passed && <p className="text-red-400/70 text-[10px]">Expected: {res.isPublic ? res.expected : '???'}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}