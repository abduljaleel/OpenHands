import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import OpenHands from "#/api/open-hands";
import { useAuth } from "#/context/auth-context";

function BitbucketAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setBitbucketToken } = useAuth();

  const code = searchParams.get("code");

  const { data, isSuccess, error } = useQuery({
    queryKey: ["bitbucket_access_token", code],
    queryFn: () => OpenHands.getBitbucketAccessToken(code!),
    enabled: !!code,
  });

  React.useEffect(() => {
    if (isSuccess) {
      setBitbucketToken(data.access_token);
      navigate("/");
    }
  }, [isSuccess, data, setBitbucketToken, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-red-500">{(error as Error).message}</p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Authenticating with Bitbucket</h1>
      <p>Please wait while we complete the authentication process...</p>
    </div>
  );
}

export default BitbucketAuthCallback;
