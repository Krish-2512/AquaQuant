import { unstable_cache } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

function getTier(score) {
  if (score >= 2200) return "Grandmaster";
  if (score >= 1400) return "Knight";
  if (score >= 700) return "Apprentice";
  return "Junior";
}

export async function buildLeaderboard() {
  await dbConnect();
  const users = await User.find({})
    .select("name email image university totalAttempted totalCorrect questionProgress codingProgress")
    .lean();

  return users
    .map((user) => {
      const theoryAttemptedEntries =
        user.questionProgress?.filter((entry) => (entry.attemptsCount || 0) > 0) || [];
      const codingAttemptedEntries =
        user.codingProgress?.filter(
          (entry) =>
            (entry.attemptsCount || 0) > 0 || entry.status?.toLowerCase() !== "unattempted"
        ) || [];

      const theorySolved =
        theoryAttemptedEntries.filter(
          (entry) => entry.status?.toLowerCase() === "solved"
        ).length || 0;
      const codingSolved =
        codingAttemptedEntries.filter(
          (entry) => entry.status?.toLowerCase() === "solved"
        ).length || 0;

      const theoryAttempted = theoryAttemptedEntries.length;
      const codingAttempted = codingAttemptedEntries.length;
      const totalSolved = theorySolved + codingSolved;
      const totalAttempted = theoryAttempted + codingAttempted;
      const accuracy =
        totalAttempted > 0 ? Number(((totalSolved / totalAttempted) * 100).toFixed(2)) : 0;

      const score =
        totalSolved * 120 + Math.round(accuracy * 4) + totalAttempted * 3;

      return {
        id: String(user._id),
        name: user.name || "Anonymous User",
        email: user.email || "",
        university: user.university || "Not Specified",
        image: user.image || "",
        theoryAttempted,
        codingAttempted,
        theorySolved,
        codingSolved,
        totalAttempted,
        totalSolved,
        accuracy,
        score,
        tier: getTier(score),
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.totalSolved !== a.totalSolved) return b.totalSolved - a.totalSolved;
      if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
      if (b.totalAttempted !== a.totalAttempted) return b.totalAttempted - a.totalAttempted;
      return a.name.localeCompare(b.name);
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
}

export const getCachedLeaderboard = unstable_cache(
  buildLeaderboard,
  ["leaderboard-v1"],
  { revalidate: 60, tags: ["leaderboard"] }
);
