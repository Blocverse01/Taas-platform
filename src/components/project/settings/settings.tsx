import Image from "next/image";
import React from "react";
import usdt from "@/assets/usdt.png";
import usdc from "@/assets/usdc.png";
import euroc from "@/assets/euroc.png";
import * as Switch from "@radix-ui/react-switch";

const Settings = () => {
  return (
    <div>
      <div className="flex text-t-black justify-between">
        <div className="p-8 rounded-xl border w-[494px] flex flex-col space-y-8 border-[#EFEFEF]">
          <div className="flex flex-col space-y-2">
            <p className="text-[20px] font-medium">Token Factory</p>
            <p className="text-sm p-3 rounded bg-t-gray-2">
              0x1C9ABA03fDC540386241c59Cbe8
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-[20px] font-medium">Treasury Wallet</p>
            <p className="text-sm p-3 rounded bg-t-gray-2">
              0x1C9ABA03fDC540386241c59Cbe8
            </p>
          </div>
        </div>
        <div className="p-8 rounded-xl border w-[494px] flex flex-col space-y-8 border-[#EFEFEF]">
          <p className="text-[20px] font-medium">Payment Methods</p>
          <div className="flex justify-between items-center">
            <label
              className=" flex items-center space-x-2 text-[15px] leading-none pr-[15px]"
              htmlFor="airplane-mode"
            >
              <Image src={usdt} alt="USDT logo" />
              <span> USDT</span>
            </label>
            <Switch.Root
              className="w-[42px] h-[25px] bg-[#E4E7EC] rounded-full relative  data-[state=checked]:bg-t-purple outline-none cursor-pointer"
              id="airplane-mode"
            >
              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>
          <div className="flex justify-between items-center">
            <label
              className=" flex items-center space-x-2 text-[15px] leading-none pr-[15px]"
              htmlFor="airplane-mode"
            >
              <Image src={euroc} alt="USDT logo" />
              <span> EUROC</span>
            </label>
            <Switch.Root
              className="w-[42px] h-[25px] bg-[#E4E7EC] rounded-full relative  data-[state=checked]:bg-t-purple outline-none cursor-pointer"
              id="airplane-mode"
            >
              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>
          <div className="flex justify-between items-center">
            <label
              className=" flex items-center space-x-2 text-[15px] leading-none pr-[15px]"
              htmlFor="airplane-mode"
            >
              <Image src={usdc} alt="USDT logo" />
              <span> USDC</span>
            </label>
            <Switch.Root
              className="w-[42px] h-[25px] bg-[#E4E7EC] rounded-full relative  data-[state=checked]:bg-t-purple outline-none cursor-pointer"
              id="airplane-mode"
            >
              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Settings };
