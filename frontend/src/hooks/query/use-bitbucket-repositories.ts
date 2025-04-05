import { useAuth } from "../../context/auth-context";

export const useBitbucketRepositories = () => {
  useAuth();

  return {
    data: {
      pages: [
        {
          data: [],
        },
      ],
    },
  };
};
