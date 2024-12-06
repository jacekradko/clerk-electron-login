import { Navigate } from "@tanstack/react-router";
import { signinRoute } from "@/src/app/route-tree";
import { useEffect } from "react";
import { router } from "@/src/app/router";
import { Loading } from "@/components/fallbacks/Loading";
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";

export const Signout = () => {
  const clerk = useClerk();
  const session = useSession();
  const { isSignedIn } = useAuth();


  useEffect(() => {
    void router.invalidate();
  }, []);
  console.log("SIGNOUT");

  console.log("-- isSignedIn --");
  console.log("useAuth().isSignedIn", isSignedIn);
  console.log("useSession().isSignedIn", session.isSignedIn);

  console.log("-- session --");
  console.log("useClerk().session", clerk.session);
  console.log("useSession().session", session.session);

  return (
    <>
      {session.isSignedIn ? (
        <Loading />
      ) : (
        <Navigate to={signinRoute.fullPath} />
      )}
    </>
  );
};
