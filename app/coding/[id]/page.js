import dbConnect from "@/lib/dbConnect";
import CodingQuestion from "@/models/CodingQuestion";
import CodeEditorClient from "@/components/CodeEditorClient"; // Import the wrapper
import { notFound } from "next/navigation";

export default async function CodingPage({ params }) {
  // Unwrap params for Next.js 15+
  const { id } = await params; 
  
  await dbConnect();
  
  const question = await CodingQuestion.findById(id).lean();

  if (!question) return notFound();

  // Convert MongoDB object to a plain string-based object for the client
  const serializedQuestion = {
    ...JSON.parse(JSON.stringify(question)),
    _id: question._id.toString(),
  };

  return (
    <main className="h-screen w-full">
      {/* Pass data to the Client Wrapper */}
      <CodeEditorClient question={serializedQuestion} />
    </main>
  );
}