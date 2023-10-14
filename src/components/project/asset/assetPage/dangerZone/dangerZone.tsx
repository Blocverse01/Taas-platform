import { DangerCircleIcon } from "@/assets/icon";
import { FC } from "react";
import { Address } from "viem";
import * as Accordion from "@radix-ui/react-accordion";

interface DangerZoneProps {
  assetType: AssetType;
  assetId: string;
  tokenAddress: Address;
  disableToken: (tokenAddress: Address) => Promise<void>;
  delistAsset: (assetId: string) => Promise<void>;
}

const DELIST_ASSET_REF_DICTIONARY: {
  [key in AssetType]: string;
} = {
  "real estate": "property",
};

const DangerZone: FC<DangerZoneProps> = ({ assetId, tokenAddress, disableToken, delistAsset, assetType }) => {
  async function handleDisableToken() {
    try {
      await disableToken(tokenAddress);
    } catch (error) {
      // Todo: Do something with error
    }
  }
  async function handleDelistAsset() {
    try {
      await delistAsset(assetId);
    } catch (error) {
      // Todo: Do something with error
    }
  }

  return (
    <Accordion.Root className="bg-t-gray-6 p-6 rounded-xl" type="single" collapsible>
      <Accordion.Item value="danger-zone">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="group flex items-center justify-between cursor-default w-full">
            <div className="flex items-center gap-2.5">
              <DangerCircleIcon />
              <h3 className="text-xl text-t-red-1 font-medium">Danger Zone</h3>
            </div>
            <svg
              className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 20.5332L8 12.5332L9.86667 10.6665L16 16.7998L22.1333 10.6665L24 12.5332L16 20.5332Z"
                fill="#1A1A1A"
              />
            </svg>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-[168px] pt-[22px]">
            <section className="space-y-6">
              <div>
                <h3 className="mb-3 text-t-black text-base">Disable Token Issuance</h3>
                <p className="text-t-gray-4 text-base">Reduce total supply and stop purchase of the token.</p>
              </div>
              <button
                type="button"
                onClick={handleDisableToken}
                className="bg-t-red-1 py-[18px] px-[49px] text-white rounded"
              >
                Disable Token
              </button>
            </section>
            <section className="space-y-6">
              <div>
                <h3 className="mb-3 text-t-black capitalize text-base">
                  Delist {DELIST_ASSET_REF_DICTIONARY[assetType]}
                </h3>
                <p className="text-t-gray-4 text-base">
                  This {DELIST_ASSET_REF_DICTIONARY[assetType]} will no longer exist on the platform.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDelistAsset}
                className="bg-t-red-1 py-[18px] px-[49px] text-white rounded"
              >
                Delist {DELIST_ASSET_REF_DICTIONARY[assetType]}
              </button>
            </section>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export { DangerZone };
