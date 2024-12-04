import { useAuth, useClerk, useSession } from "@clerk/clerk-react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/src/app/router";
import { queryClient } from "@/src/network/QueryClient";

export const InnerApp = () => {
  const clerk = useClerk();
  const session = useSession();
  const { isSignedIn } = useAuth();
  console.log("SIGNIN");

  console.log("-- isSignedIn --");
  console.log("useAuth().isSignedIn", isSignedIn);
  console.log("useSession().isSignedIn", session.isSignedIn);

  console.log("-- session --");
  console.log("useClerk().session", clerk.session);
  console.log("useSession().session", session.session);

  return <RouterProvider router={router} context={{ clerk, queryClient }} />;
};
