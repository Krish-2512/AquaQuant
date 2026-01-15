import ProblemWorkspace from "@/components/ProblemWorkspace";
import ProgressSidebar from "@/components/ProgressSidebar";

// This will render for ANY ID clicked on the dashboard
export default function ProblemPage() {
  
  // Static test data to check the interface
  const staticProblem = {
    title: "The Poisoned Wine",
    difficulty: "Medium",
    category: "Brainteasers",
    description: "A king has 1,000 bottles of wine. One is poisoned and will kill anyone who drinks it within 24 hours. You have 10 prisoners to test the wine. What is the minimum number of days required to find the poisoned bottle, and how do you do it?",
    hint: "Think about binary representation. Each prisoner can represent a bit (0 or 1) in a 10-bit number.",
    solution: "1 day. Assign each bottle a binary number from 1 to 1000. Each prisoner drinks from the bottles that have a '1' in their specific bit position."
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left: Your 50% better Workspace UI */}
      <ProblemWorkspace 
        problem={staticProblem} 
      />

      {/* Right: Thin Progress Sidebar */}
      <ProgressSidebar />
    </div>
  );
}