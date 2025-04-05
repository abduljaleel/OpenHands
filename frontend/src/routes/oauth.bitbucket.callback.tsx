import OpenHands from "#/api/open-hands";
import { useAuth } from "#/context/auth-context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BitbucketAuthCallback() {
  const navigate = useNavigate();
  const { setBitbucketToken } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      setError(error);
      return;
    }

    if (!code) {
      setError("No authorization code received");
      return;
    }

    OpenHands.post("/api/bitbucket/token", { code })
      .then((response) => {
        setBitbucketToken(response.data.access_token);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message || "Failed to authenticate with Bitbucket");
      });
  }, [setBitbucketToken, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-red-500">{error}</p>
        <button
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
