import { useQuery } from "@tanstack/react-query";
import { searchBitbucketRepositories } from "../../api/bitbucket";
import { useAuth } from "../../context/auth-context";

export const useSearchBitbucketRepositories = (query: string) => {
  const { bitbucketToken } = useAuth();

  return useQuery({
    queryKey: ["bitbucket", "search", query],
    queryFn: () => searchBitbucketRepositories(query),
    enabled: !!bitbucketToken && query.length > 0,
  });
};
