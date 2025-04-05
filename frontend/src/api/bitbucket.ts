import { extractNextPageFromLink } from "#/utils/extract-next-page-from-link";
import { openHands } from "./open-hands-axios";

/**
 * Retrieves repositories from Bitbucket Cloud
 * @returns A list of repositories
 */
export const retrieveBitbucketRepositories = async (
  page = 1,
  per_page = 30,
) => {
  const response = await openHands.get<BitbucketRepositoryResponse>(
    "/api/bitbucket/repositories",
    {
      params: {
        page,
        per_page,
      },
    },
  );

  const link = response.headers.link ?? "";
  const nextPage = extractNextPageFromLink(link);

  return { data: response.data.values, nextPage };
};

/**
 * Retrieves the current authenticated user from Bitbucket
 * @returns User information
 */
export const retrieveBitbucketUser = async () => {
  const response = await openHands.get<BitbucketUser>("/api/bitbucket/user");
  return response.data;
};

/**
 * Searches for repositories in Bitbucket Cloud
 * @param query Search query
 * @returns Search results
 */
export const searchBitbucketRepositories = async (
  query: string,
  per_page: number = 5,
) => {
  const response = await openHands.get<BitbucketRepositoryResponse>(
    "/api/bitbucket/search/repositories",
    {
      params: {
        q: query,
        per_page,
      },
    },
  );

  return response.data;
};
