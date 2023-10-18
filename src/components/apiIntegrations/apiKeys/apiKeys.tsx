import { DeleteIcon, InfoSolidCircleIcon } from "@/assets/icon";
import { format } from "date-fns";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { DisplayApiKeyDialog } from "../generateApiKey/displayApiKeyDialog";

interface ApiKey {
  id: string;
  project: {
    id: string;
    name: string;
  };
  createdAt: string;
}

interface ApiKeysProps {
  apiKeys: Array<ApiKey>;
  regenerateApiKey: (projectId: string) => Promise<string>;
  deleteApiKey: (apiKeyId: string) => Promise<void>;
}

const ApiKeys: FC<ApiKeysProps> = ({
  apiKeys,
  regenerateApiKey,
  deleteApiKey,
}) => {
  const [generatedApiKey, setGeneratedApiKey] = useState<string>();
  const [generating, setGenerating] = useState<{
    [key: string]: boolean;
  }>();

  const formatCreatedAt = (date: string) => {
    return format(new Date(date), "MMM d, yyyy; h:mm a 'UTC'");
  };

  const setGeneratingForProject = (projectId: string, generating: boolean) => {
    setGenerating((prev) => ({
      ...prev,
      [projectId]: generating,
    }));
  };

  const canRegenerateApiKey =
    !generating ||
    Object.values(generating).filter((val) => val === true).length === 0;

  const handleApiKeyRegeneration = async (projectId: string) => {
    if (!canRegenerateApiKey) return;

    const toastOptions = { id: "regenerate-api-key" };
    try {
      toast.loading("Regenerating API Key", toastOptions);
      setGeneratingForProject(projectId, true);

      const newApiKey = await regenerateApiKey(projectId);

      toast.success("API Key regenerated", toastOptions);
      setGeneratedApiKey(newApiKey);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage, toastOptions);
    } finally {
      setGeneratingForProject(projectId, false);
    }
  };

  const handleApiKeyDeletion = async (apiKeyId: string) => {
    const toastOptions = { id: "delete-api-key" };
    try {
      toast.loading("Deleting API Key", toastOptions);

      await deleteApiKey(apiKeyId);

      toast.success("API Key deleted", toastOptions);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage, toastOptions);
    } finally {
    }
  };

  return (
    <>
      {generatedApiKey && (
        <DisplayApiKeyDialog
          apiKey={generatedApiKey}
          open={Boolean(generatedApiKey)}
          onOpenChange={(open) => {
            // unset generated API key when modal is closed
            if (!open) {
              setGeneratedApiKey(undefined);
            }
          }}
        />
      )}
      <div className="flex flex-col gap-[28px]">
        <h3 className="text-base text-t-black">
          Access all integrations for your projects here, and create new ones.
        </h3>
        <section className="rounded border border-t-gray-8 flex flex-col divide-y divide-t-gray-8">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.project.id}
              className="py-[18px] px-9 flex items-center justify-between"
            >
              <section className="flex flex-col gap-1">
                <h4 className="text-t-black text-base">
                  {apiKey.project.name}
                </h4>
                <p className="text-t-gray-9 text-sm">
                  You generated an API Key for {apiKey.project.name} on{" "}
                  {formatCreatedAt(apiKey.createdAt)}
                </p>
              </section>
              <section className="flex gap-8">
                <button
                  disabled={!canRegenerateApiKey}
                  onClick={async () => {
                    await handleApiKeyRegeneration(apiKey.project.id);
                  }}
                  type="button"
                  className="text-t-purple underline text-base"
                >
                  {generating && generating[apiKey.project.id]
                    ? "Regenerating..."
                    : "Regenerate API Key"}
                </button>
                <button
                  type="button"
                  title="delete api key"
                  onClick={async () => {
                    await handleApiKeyDeletion(apiKey.id);
                  }}
                >
                  <DeleteIcon />
                </button>
              </section>
            </div>
          ))}
        </section>
        <div className="flex gap-1 items-center">
          <InfoSolidCircleIcon />
          <p className="text-t-black/70 text-sm">
            Never share or expose your API Keys. If you believe your key has
            been compromised, please regenerate it.
          </p>
        </div>
      </div>
    </>
  );
};

export { ApiKeys };
