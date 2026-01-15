// "use client";
// import { useSession } from "next-auth/react";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect } from "react";

// export default function AuthGuard({ children }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     // Wait until the session is fully loaded
//     if (status === "authenticated" && session) {
      
//       const isOnboarded = session.user.isOnboarded;
      
//       // If NOT onboarded and NOT already on the onboarding page, REDIRECT
//       if (isOnboarded === false && pathname !== "/onboarding") {
//         router.push("/onboarding");
//       } 
//       // If ALREADY onboarded and trying to go back to onboarding, go to dashboard
//       else if (isOnboarded === true && pathname === "/onboarding") {
//         router.push("/dashboard");
//       }
//     }
//   }, [session, status, pathname, router]);

//   // Show nothing or a loader while checking status to prevent "flicker"
//   if (status === "loading") {
//     return <div className="min-h-screen bg-black flex items-center justify-center text-sky-500 font-mono">INITIALIZING_SESSION...</div>;
//   }

//   return <>{children}</>;
// }