import posthog from "posthog-js";
import React from "react";
import OpenHands from "#/api/open-hands";
import {
  removeGitHubTokenHeader as removeOpenHandsGitHubTokenHeader,
  setGitHubTokenHeader as setOpenHandsGitHubTokenHeader,
} from "#/api/open-hands-axios";
import {
  setAuthTokenHeader as setGitHubAuthTokenHeader,
  removeAuthTokenHeader as removeGitHubAuthTokenHeader,
  setupAxiosInterceptors as setupGithubAxiosInterceptors,
} from "#/api/github-axios-instance";
import {
  setAuthTokenHeader as setBitbucketAuthTokenHeader,
  removeAuthTokenHeader as removeBitbucketAuthTokenHeader,
  setupAxiosInterceptors as setupBitbucketAxiosInterceptors,
} from "#/api/bitbucket-axios-instance";

interface AuthContextType {
  gitHubToken: string | null;
  bitbucketToken: string | null;
  setUserId: (userId: string) => void;
  setGitHubToken: (token: string | null) => void;
  setBitbucketToken: (token: string | null) => void;
  clearGitHubToken: () => void;
  clearBitbucketToken: () => void;
  refreshToken: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: React.PropsWithChildren) {
  const [gitHubTokenState, setGitHubTokenState] = React.useState<string | null>(
    () => localStorage.getItem("ghToken"),
  );
  
  const [bitbucketTokenState, setBitbucketTokenState] = React.useState<string | null>(
    () => localStorage.getItem("bitbucketToken"),
  );

  const [userIdState, setUserIdState] = React.useState<string>(
    () => localStorage.getItem("userId") || "",
  );

  const clearGitHubToken = () => {
    setGitHubTokenState(null);
    localStorage.removeItem("ghToken");

    removeOpenHandsGitHubTokenHeader();
    removeGitHubAuthTokenHeader();
  };
  
  const clearBitbucketToken = () => {
    setBitbucketTokenState(null);
    localStorage.removeItem("bitbucketToken");
    
    removeBitbucketAuthTokenHeader();
  };

  const setGitHubToken = (token: string | null) => {
    setGitHubTokenState(token);

    if (token) {
      localStorage.setItem("ghToken", token);
      setOpenHandsGitHubTokenHeader(token);
      setGitHubAuthTokenHeader(token);
    } else {
      clearGitHubToken();
    }
  };
  
  const setBitbucketToken = (token: string | null) => {
    setBitbucketTokenState(token);
    
    if (token) {
      localStorage.setItem("bitbucketToken", token);
      setBitbucketAuthTokenHeader(token);
    } else {
      clearBitbucketToken();
    }
  };

  const setUserId = (userId: string) => {
    setUserIdState(userIdState);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    clearGitHubToken();
    clearBitbucketToken();
    setUserIdState("");
    localStorage.removeItem("userId");
    posthog.reset();
  };

  const refreshToken = async (): Promise<boolean> => {
    const config = await OpenHands.getConfig();

    if (config.APP_MODE !== "saas" || !gitHubTokenState) {
      return false;
    }

    const newToken = await OpenHands.refreshToken(config.APP_MODE, userIdState);
    if (newToken) {
      setGitHubToken(newToken);
      return true;
    }

    clearGitHubToken();
    return false;
  };

  React.useEffect(() => {
    const storedGitHubToken = localStorage.getItem("ghToken");

    const userId = localStorage.getItem("userId") || "";

    setGitHubToken(storedGitHubToken);
    setUserId(userId);
    const setupIntercepter = async () => {
      const config = await OpenHands.getConfig();
      setupGithubAxiosInterceptors(config.APP_MODE, refreshToken, logout);
      setupBitbucketAxiosInterceptors(config.APP_MODE, refreshToken, logout);
    };

    setupIntercepter();
  }, []);

  const value = React.useMemo(
    () => ({
      gitHubToken: gitHubTokenState,
      bitbucketToken: bitbucketTokenState,
      setGitHubToken,
      setBitbucketToken,
      setUserId,
      clearGitHubToken,
      clearBitbucketToken,
      refreshToken,
      logout,
    }),
    [gitHubTokenState, bitbucketTokenState],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
