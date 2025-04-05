import React from "react";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import posthog from "posthog-js";
import { I18nKey } from "#/i18n/declaration";
import { setSelectedRepository } from "#/state/initial-query-slice";
import { sanitizeQuery } from "#/utils/sanitize-query";

interface BitbucketRepositorySelectorProps {
  onInputChange: (value: string) => void;
  onSelect: () => void;
  userRepositories: BitbucketRepository[];
  publicRepositories: BitbucketRepository[];
}

export function BitbucketRepositorySelector({
  onInputChange,
  onSelect,
  userRepositories,
  publicRepositories,
}: BitbucketRepositorySelectorProps) {
  const { t } = useTranslation();
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);

  const allRepositories: BitbucketRepository[] = [
    ...publicRepositories.filter(
      (repo) => !publicRepositories.find((r) => r.uuid === repo.uuid),
    ),
    ...userRepositories,
  ];

  const dispatch = useDispatch();

  const handleRepoSelection = (id: string | null) => {
    const repo = allRepositories.find((r) => r.uuid === id);
    if (repo) {
      dispatch(setSelectedRepository(repo.full_name));
      posthog.capture("repository_selected");
      onSelect();
      setSelectedKey(id);
    }
  };

  const handleClearSelection = () => {
    dispatch(setSelectedRepository(null));
  };

  const emptyContent = t(I18nKey.GITHUB$NO_RESULTS);

  return (
    <Autocomplete
      data-testid="bitbucket-repo-selector"
      name="repo"
      aria-label="Bitbucket Repository"
      placeholder="Select a repository"
      isVirtualized={false}
      selectedKey={selectedKey}
      inputProps={{
        classNames: {
          inputWrapper:
            "text-sm w-full rounded-[4px] px-3 py-[10px] bg-[#525252] text-[#A3A3A3]",
        },
      }}
      onSelectionChange={(id) => handleRepoSelection(id?.toString() ?? null)}
      onInputChange={onInputChange}
      clearButtonProps={{ onClick: handleClearSelection }}
      listboxProps={{
        emptyContent,
      }}
      defaultFilter={(textValue, inputValue) =>
        !inputValue ||
        sanitizeQuery(textValue).includes(sanitizeQuery(inputValue))
      }
    >
      {userRepositories.length > 0 ? (
        <AutocompleteSection showDivider title="Your Repositories">
          {userRepositories.map((repo) => (
            <AutocompleteItem
              data-testid="bitbucket-repo-item"
              key={repo.uuid}
              value={repo.uuid}
              className="data-[selected=true]:bg-default-100"
              textValue={repo.full_name}
            >
              {repo.full_name}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
      ) : null}
      {publicRepositories.length > 0 ? (
        <AutocompleteSection showDivider title="Public Repositories">
          {publicRepositories.map((repo) => (
            <AutocompleteItem
              data-testid="bitbucket-repo-item"
              key={repo.uuid}
              value={repo.uuid}
              className="data-[selected=true]:bg-default-100"
              textValue={repo.full_name}
            >
              {repo.full_name}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
      ) : null}
    </Autocomplete>
  );
}
