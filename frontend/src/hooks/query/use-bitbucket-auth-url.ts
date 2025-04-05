import React from "react";
import { generateBitbucketAuthUrl } from "../../utils/generate-bitbucket-auth-url";
import { GetConfigResponse } from "../../api/open-hands.types";

interface UseBitbucketAuthUrlConfig {
  bitbucketToken: string | null;
  appMode: GetConfigResponse["APP_MODE"] | null;
  bitbucketClientId: GetConfigResponse["BITBUCKET_CLIENT_ID"] | null;
}

export const useBitbucketAuthUrl = (config: UseBitbucketAuthUrlConfig) =>
  React.useMemo(() => {
    if (config.appMode === "saas" && !config.bitbucketToken)
      return generateBitbucketAuthUrl(
        config.bitbucketClientId || "",
        new URL(window.location.href),
      );
    return undefined;
  }, [config.appMode, config.bitbucketToken, config.bitbucketClientId]);
