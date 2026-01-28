"use client"; // This tells Next.js this is a Client Component

import dynamic from 'next/dynamic';

// Import the workspace only on the client side
const CodeWorkspace = dynamic(
  () => import("./CodeWorkspace"), 
  { 
    ssr: false, 
    loading: () => (
      <div className="h-screen bg-[#020617] flex items-center justify-center text-sky-500 font-mono">
        Initializing_Environment...
      </div>
    ) 
  }
);

export default function CodeEditorClient({ question }) {
  return <CodeWorkspace question={question} />;
}