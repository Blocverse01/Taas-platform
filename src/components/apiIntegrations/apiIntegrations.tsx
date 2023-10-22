import { ComponentProps, FC } from "react";
import { ApiKeys } from "./apiKeys";
import { GenerateApiKeyDialog } from "./generateApiKey";
import classNames from "classnames";

type ApiKeysProps = ComponentProps<typeof ApiKeys>;
type GenerateApiKeyProps = ComponentProps<typeof GenerateApiKeyDialog>;

interface ApiIntegrationsProps {
  apiKeys: ApiKeysProps["apiKeys"];
  deleteApiKey: ApiKeysProps["deleteApiKey"];
  generateApiKey: ApiKeysProps["regenerateApiKey"];
  projects: GenerateApiKeyProps["projects"];
}

const ApiIntegrations: FC<ApiIntegrationsProps> = ({ apiKeys, deleteApiKey, generateApiKey, projects }) => {
  return (
    <div
      className={classNames({
        "flex h-[calc(100vh-300px)] overflow-y-hidden items-center flex-col justify-center": apiKeys.length === 0,
      })}
    >
      <div>
        {apiKeys.length === 0 ? (
          <div className="mb-5 w-fit mx-auto">
            <p className="max-w-[297px] text-t-black/70 text-center text-sm">
              No API key has been generated. Click on the button to generate a new API key.
            </p>
          </div>
        ) : null}
        {apiKeys.length > 0 ? (
          <div className="mb-[85px]">
            <ApiKeys apiKeys={apiKeys} regenerateApiKey={generateApiKey} deleteApiKey={deleteApiKey} />
          </div>
        ) : null}
      </div>
      <div className="w-fit mx-auto">
        <GenerateApiKeyDialog generateApiKey={generateApiKey} projects={projects} />
      </div>
    </div>
  );
};

export { ApiIntegrations };
