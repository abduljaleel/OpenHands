import { useTranslation } from "react-i18next";
import { ModalBody } from "./modal-body";
import {
  BaseModalDescription,
  BaseModalTitle,
} from "./confirmation-modals/base-modal";
import { useAuth } from "#/context/auth-context";
import { ModalButton } from "../buttons/modal-button";
import { CustomInput } from "../custom-input";

interface ConnectToBitbucketModalProps {
  onClose: () => void;
}

export function ConnectToBitbucketModal({
  onClose,
}: ConnectToBitbucketModalProps) {
  const { bitbucketToken, setBitbucketToken } = useAuth();
  useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bbToken = formData.get("bbToken")?.toString();

    if (bbToken) setBitbucketToken(bbToken);
    onClose();
  };

  return (
    <ModalBody>
      <div className="flex flex-col gap-2 self-start">
        <BaseModalTitle title="Connect to Bitbucket" />
        <BaseModalDescription
          description={
            <span>
              Get your Bitbucket token{" "}
              <a
                href="https://bitbucket.org/account/settings/app-passwords/new"
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#0052CC] underline"
              >
                here
              </a>
            </span>
          }
        />
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <CustomInput
          label="Bitbucket Token"
          name="bbToken"
          required
          type="password"
          defaultValue={bitbucketToken ?? ""}
        />

        <div className="flex flex-col gap-2 w-full">
          <ModalButton
            testId="connect-to-bitbucket"
            type="submit"
            text="Connect"
            className="bg-[#0052CC] w-full"
          />
          <ModalButton
            onClick={onClose}
            text="Close"
            className="bg-[#737373] w-full"
          />
        </div>
      </form>
    </ModalBody>
  );
}
