"use client";
import React, { useState, useEffect, use } from 'react'; // 1. Added 'use'
import { useParams } from 'next/navigation';
import ProblemWorkspace from "@/components/ProblemWorkspace";
import ProgressSidebar from "@/components/ProgressSidebar";

// 2. REMOVE 'async' from the function definition
export default function ProblemPage({ params }) {
  // 3. In Next.js 15/16, we unwrap the params promise using React.use()
  const resolvedParams = use(params); 
  const id = resolvedParams.id;

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProblemDetails();
    }
  }, [id]);

  const fetchProblemDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/questions/${id}`);
      const json = await res.json();
      
      if (json.success) {
        const data = json.data;
        setProblem({
          title: data.Title || data.title,
          difficulty: data.Difficulty || data.difficulty,
          category: data.Category || data.category,
          description: data.Content || data.content,
          solution: data.Solution || data.solution,
          answer: data.Answer || data.answer,
          hint: data.Hint || data.hint || "No hint available.",
          relatedTopics: data.RelatedTopics || data.relatedTopics || [],
          constraints: data.constraints || [],
          
        });
      }
    } catch (error) {
      console.error("Error fetching problem:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!problem) return <div className="text-white text-center mt-20">Problem not found.</div>;

  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      <ProblemWorkspace problem={problem} />
      <ProgressSidebar problemId={id} />
    </div>
  );
}