interface BitbucketErrorResponse {
  message: string;
  documentation_url: string;
  status: number;
}

interface BitbucketUser {
  uuid: string;
  nickname: string;
  display_name: string;
  account_id: string;
  links: {
    avatar: {
      href: string;
    };
  };
}

interface BitbucketRepository {
  uuid: string;
  full_name: string;
  name: string;
  slug: string;
  workspace: {
    slug: string;
    uuid: string;
    name: string;
  };
  links: {
    html: {
      href: string;
    };
  };
}

interface BitbucketRepositoryResponse {
  values: BitbucketRepository[];
  page: number;
  size: number;
  next?: string;
}

interface BitbucketCommit {
  hash: string;
  date: string;
  author: {
    raw: string;
  };
  links: {
    html: {
      href: string;
    };
  };
}
