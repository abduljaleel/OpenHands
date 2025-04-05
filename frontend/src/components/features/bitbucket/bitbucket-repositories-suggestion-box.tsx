import React from "react";
import { useTranslation } from "react-i18next";
import { SuggestionBox } from "#/components/features/suggestions/suggestion-box";
import BitbucketLogo from "#/assets/branding/bitbucket-logo.svg?react";
import { BitbucketRepositorySelector } from "./bitbucket-repo-selector";
import { ModalButton } from "#/components/shared/buttons/modal-button";
import { ConnectToBitbucketModal } from "#/components/shared/modals/connect-to-bitbucket-modal";
import { ModalBackdrop } from "#/components/shared/modals/modal-backdrop";
import { useBitbucketRepositories } from "#/hooks/query/use-bitbucket-repositories";
import { useSearchBitbucketRepositories } from "#/hooks/query/use-search-bitbucket-repositories";
import { sanitizeQuery } from "#/utils/sanitize-query";
import { useDebounce } from "#/hooks/use-debounce";

interface BitbucketRepositoriesSuggestionBoxProps {
  handleSubmit: () => void;
  bitbucketAuthUrl: string | null;
  user: BitbucketUser | null;
}

export function BitbucketRepositoriesSuggestionBox({
  handleSubmit,
  bitbucketAuthUrl,
  user,
}: BitbucketRepositoriesSuggestionBoxProps) {
  useTranslation();
  const [connectToBitbucketModalOpen, setConnectToBitbucketModalOpen] =
    React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: bitbucketRepositories } = useBitbucketRepositories();
  const { data: searchedRepos } = useSearchBitbucketRepositories(
    sanitizeQuery(debouncedSearchQuery),
  );

  const repositories =
    bitbucketRepositories?.pages.flatMap((page) => page.data) || [];

  const handleConnectToBitbucket = () => {
    if (bitbucketAuthUrl) {
      window.location.href = bitbucketAuthUrl;
    } else {
      setConnectToBitbucketModalOpen(true);
    }
  };

  const isLoggedIn = !!user;

  return (
    <>
      <SuggestionBox
        title="Connect to Bitbucket"
        content={
          isLoggedIn ? (
            <BitbucketRepositorySelector
              onInputChange={setSearchQuery}
              onSelect={handleSubmit}
              publicRepositories={searchedRepos?.values || []}
              userRepositories={repositories}
            />
          ) : (
            <ModalButton
              text="Connect to Bitbucket"
              icon={<BitbucketLogo width={20} height={20} />}
              className="bg-[#0052CC] w-full"
              onClick={handleConnectToBitbucket}
            />
          )
        }
      />
      {connectToBitbucketModalOpen && (
        <ModalBackdrop onClose={() => setConnectToBitbucketModalOpen(false)}>
          <ConnectToBitbucketModal
            onClose={() => setConnectToBitbucketModalOpen(false)}
          />
        </ModalBackdrop>
      )}
    </>
  );
}
