import { useQuery } from "@tanstack/react-query";
import { retrieveBitbucketUser } from "../../api/bitbucket";
import { useAuth } from "../../context/auth-context";

export const useBitbucketUser = () => {
  const { bitbucketToken } = useAuth();

  return useQuery({
    queryKey: ["bitbucket", "user"],
    queryFn: retrieveBitbucketUser,
    enabled: !!bitbucketToken,
  });
};
