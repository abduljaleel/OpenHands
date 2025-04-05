import axios, { AxiosError } from "axios";

type BitbucketErrorResponse = {
  message: string;
  documentation_url: string;
  status: number;
};

const bitbucket = axios.create({
  baseURL: "https://api.bitbucket.org/2.0",
  headers: {
    Accept: "application/json",
  },
});

const setAuthTokenHeader = (token: string) => {
  bitbucket.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthTokenHeader = () => {
  if (bitbucket.defaults.headers.common.Authorization) {
    delete bitbucket.defaults.headers.common.Authorization;
  }
};

/**
 * Checks if response has attributes to perform refresh
 */
const canRefresh = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return !!(
      error.config &&
      error.response &&
      error.response.status
    );
  }
  return false;
};

/**
 * Checks if the data is a Bitbucket error response
 * @param data The data to check
 * @returns Boolean indicating if the data is a Bitbucket error response
 */
export const isBitbucketErrorResponse = <T extends object | Array<unknown>>(
  data: T | BitbucketErrorResponse | null,
): data is BitbucketErrorResponse =>
  !!data && "message" in data && data.message !== undefined;

const setupAxiosInterceptors = (
  appMode: string,
  refreshToken: () => Promise<boolean>,
  logout: () => void,
) => {
  bitbucket.interceptors.response.use(
    (response) => {
      const parsedData = response.data;
      if (isBitbucketErrorResponse(parsedData)) {
        const error = new AxiosError(
          "Failed",
          "",
          response.config,
          response.request,
          response,
        );
        throw error;
      }
      return response;
    },
    async (error) => {
      if (!canRefresh(error)) {
        return Promise.reject(new Error("Failed to refresh token"));
      }

      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        !originalRequest._retry // Prevent infinite retry loops
      ) {
        originalRequest._retry = true;

        if (appMode === "saas") {
          try {
            const refreshed = await refreshToken();
            if (refreshed) {
              return await bitbucket(originalRequest);
            }

            logout();
            return await Promise.reject(new Error("Failed to refresh token"));
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }
      }

      return Promise.reject(error);
    },
  );
};

export {
  bitbucket,
  setAuthTokenHeader,
  removeAuthTokenHeader,
  setupAxiosInterceptors,
};
