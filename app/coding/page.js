import dbConnect from "@/lib/dbConnect";
import CodingQuestion from "@/models/CodingQuestion";
import CodingList from "@/components/CodingList";

export default async function CodingListPage() {
  await dbConnect();
  // Fetch all coding questions from MongoDB
  const questions = await CodingQuestion.find({}).lean();
  
  const serializedQuestions = questions.map(q => ({
    ...q,
    _id: q._id.toString(),
  }));

  return (
    <div className="min-h-screen bg-[#020617] p-12">
      <div className="max-w-4xl mx-auto">
        <CodingList questions={serializedQuestions} />
      </div>
    </div>
  );
}