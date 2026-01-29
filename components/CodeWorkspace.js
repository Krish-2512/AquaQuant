
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Editor from "@monaco-editor/react";
import { useSession } from "next-auth/react";
import { 
  Terminal as TerminalIcon, 
  History, 
  FileCode, 
  Play, 
  Send, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';

export default function CodeWorkspace({ question }) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('problem');
  const [code, setCode] = useState(question.starterCode?.javascript || "");
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const workerRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    workerRef.current = new Worker('/codeWorker.js');
    return () => { if (workerRef.current) workerRef.current.terminate(); };
  }, []);

  const handleEditorDidMount = (editor) => { editorRef.current = editor; };

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch(`/api/user/progress/${question._id}`);
      const data = await res.json();
      if (data.success && data.progress) {
        const sorted = (data.progress.pastSubmissions || []).reverse();
        setHistory(sorted);
      }
    } catch (err) { console.error("History fetch failed:", err); } 
    finally { setIsLoadingHistory(false); }
  };

  const executeTests = async (testSet) => {
    const results = [];
    let allPassed = true;
    for (let i = 0; i < testSet.length; i++) {
      const tc = testSet[i];
      const result = await new Promise((resolve) => {
        workerRef.current.postMessage({ code, input: tc.input });
        workerRef.current.onmessage = (e) => resolve(e.data);
      });
      const passed = result.success && String(result.output).trim() === String(tc.expectedOutput).trim();
      if (!passed) allPassed = false;
      results.push({ ...result, passed, index: i, isPublic: tc.isPublic, expected: tc.expectedOutput });
    }
    return { results, allPassed };
  };

  const runTestCases = async () => {
    setIsRunning(true);
    setOutput([]);
    const publicTests = question.testCases.filter(tc => tc.isPublic);
    const { results } = await executeTests(publicTests);
    setOutput(results);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setOutput([]);
    const { results, allPassed } = await executeTests(question.testCases);
    setOutput(results);
    try {
      await fetch('/api/user/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question._id,
          isCorrect: allPassed,
          submittedCode: code,
          language: 'javascript',
          isCoding: true 
        }),
      });
      if (activeTab === 'attempts') fetchHistory();
    } catch (err) { console.error("Submit failed:", err); }
    setIsSubmitting(false);
    if (allPassed) setShowSuccess(true);
  };

  if (!isMounted) return null;

  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#020617] text-slate-300 font-sans">
      
      {/* LEFT PANEL: CONTENT AREA */}
      <div className="w-2/5 flex flex-col border-r border-white/5 bg-[#030816]">
        {/* Navigation Tabs */}
        <div className="flex p-2 gap-1 bg-black/40 border-b border-white/5">
          {[
            { id: 'problem', label: 'Description', icon: FileCode, color: 'text-sky-400' },
            { id: 'attempts', label: 'History', icon: History, color: 'text-amber-400' },
            { id: 'solution', label: 'Solution', icon: CheckCircle2, color: 'text-emerald-400' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); if(tab.id === 'attempts') fetchHistory(); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                activeTab === tab.id 
                ? `bg-white/5 shadow-inner border border-white/10 ${tab.color}` 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {activeTab === 'problem' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
              <header>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                    question.difficulty === 'Hard' ? 'border-rose-500/30 text-rose-400 bg-rose-500/5' : 'border-sky-500/30 text-sky-400 bg-sky-500/5'
                  }`}>
                    {question.difficulty.toUpperCase()}
                  </span>
                  <span className="text-slate-700 text-[10px]">// LEVEL_{question.difficulty === 'Hard' ? '03' : '01'}</span>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tighter mb-6">{question.title}</h1>
                <div className="prose prose-invert prose-sm max-w-none text-slate-400 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: question.problemStatement }} />
              </header>

              <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <div className="w-1 h-3 bg-sky-500" /> IO_EXAMPLES
                </h3>
                {question.testCases.filter(tc => tc.isPublic).map((tc, idx) => (
                  <div key={idx} className="group bg-black/40 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sky-500 text-[9px] font-bold uppercase block mb-2 opacity-50 tracking-widest">Input</span>
                        <code className="text-slate-200 font-mono text-xs">{tc.input}</code>
                      </div>
                      <div>
                        <span className="text-emerald-500 text-[9px] font-bold uppercase block mb-2 opacity-50 tracking-widest">Output</span>
                        <code className="text-slate-200 font-mono text-xs">{tc.expectedOutput}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}

          {activeTab === 'attempts' && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Execution_Logs</h3>
              {isLoadingHistory ? (
                <div className="flex flex-col items-center py-20 opacity-20"><RotateCcw className="animate-spin mb-4" /><p className="text-[10px] uppercase font-bold">Synchronizing...</p></div>
              ) : history.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl opacity-20"><p className="text-xs uppercase font-bold">No Records Found</p></div>
              ) : (
                history.map((sub, idx) => (
                  <div key={idx} className="group bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${sub.isCorrect ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${sub.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {sub.isCorrect ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-600 tracking-tighter">{new Date(sub.submittedAt).toLocaleString()}</span>
                    </div>
                    <pre className="text-[11px] bg-black/40 p-3 rounded-xl text-slate-500 font-mono truncate border border-white/5 mb-4 group-hover:text-slate-300 transition-colors">
                      {sub.code}
                    </pre>
                    <button 
                      onClick={() => { setCode(sub.code); setActiveTab('problem'); }}
                      className="w-full py-2 bg-white/5 hover:bg-sky-500 hover:text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                    >
                      Restore Artifact
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'solution' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <CheckCircle2 className="text-emerald-500" size={18} />
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Optimized_Reference_Model</p>
              </div>
              <div className="rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <Editor height="450px" theme="vs-dark" defaultLanguage="javascript" value={question.solutionCode?.javascript} options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, padding: { top: 20 } }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: EDITOR & CONSOLE */}
      <div className="flex-1 flex flex-col relative bg-[#01040a]">
        {/* Success Modal */}
        {showSuccess && (
          <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl z-[100] flex flex-col items-center justify-center text-center p-6 animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
              <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4">CRACKED!</h2>
            <p className="text-slate-400 text-sm max-w-sm mb-8 font-medium">System integrity verified. All test vectors have returned successful handshakes.</p>
            <button onClick={() => setShowSuccess(false)} className="px-10 py-3 bg-emerald-500 text-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]">Continue_Session</button>
          </div>
        )}

        {/* Editor Area */}
        <div className="h-2/3 relative group">
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-[10px] font-black text-slate-600 bg-black/40 px-3 py-1 rounded-full border border-white/5">MONACO_KERNEL_V2</span>
          </div>
          <Editor height="100%" theme="vs-dark" defaultLanguage="javascript" value={code} onMount={handleEditorDidMount} onChange={(val) => setCode(val)} 
                  options={{ fontSize: 15, minimap: { enabled: false }, automaticLayout: true, padding: { top: 20 }, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>

        {/* Console Area */}
        <div className="h-1/3 bg-[#030816] border-t border-white/10 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <TerminalIcon size={16} className="text-slate-500" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">System_Terminal</h3>
            </div>
            <div className="flex gap-4">
              <button onClick={runTestCases} disabled={isRunning || isSubmitting} className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-20 group">
                <Play size={14} className="group-hover:scale-110 transition-transform" /> Run_Tests
              </button>
              <button onClick={handleSubmit} disabled={isRunning || isSubmitting} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-black px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] transition-all shadow-lg shadow-sky-500/10 disabled:opacity-30 active:scale-95">
                {isSubmitting ? <RotateCcw size={14} className="animate-spin" /> : <Send size={14} />}
                {isSubmitting ? "Processing..." : "Submit_Core"}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {output.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-10">
                <TerminalIcon size={40} />
                <p className="text-[10px] font-black mt-2">Awaiting Execution...</p>
              </div>
            )}
            {output.map((res, i) => (
              <div key={i} className={`p-4 rounded-2xl border transition-all duration-300 ${res.passed ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    {res.passed ? <CheckCircle2 size={14} className="text-emerald-400" /> : <AlertCircle size={14} className="text-rose-400" />}
                    <span className={`text-[10px] font-black uppercase tracking-tighter ${res.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {res.isPublic ? `Case_${i+1}` : 'Hidden_Vector'}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-600">{res.time}ms</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px]">
                  <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                    <span className="text-[9px] text-slate-600 block mb-1 uppercase font-bold tracking-widest">Result</span>
                    <span className="text-slate-200">{String(res.userOutput)}</span>
                  </div>
                  {!res.passed && (
                    <div className="bg-rose-500/5 p-2 rounded-lg border border-rose-500/10">
                      <span className="text-[9px] text-rose-500/50 block mb-1 uppercase font-bold tracking-widest">Expected</span>
                      <span className="text-rose-200">{res.isPublic ? res.expected : 'UNDEFINED'}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}