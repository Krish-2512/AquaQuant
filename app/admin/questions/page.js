import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";
import { requireAdminPage } from "@/lib/admin";
import AdminQuestionsClient from "@/components/admin/AdminQuestionsClient";

export default async function AdminQuestionsPage() {
  await requireAdminPage();
  await dbConnect();

  const questions = await Question.find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  const serializedQuestions = questions.map((question) => ({
    ...question,
    _id: String(question._id),
  }));

  return <AdminQuestionsClient initialQuestions={serializedQuestions} />;
}
