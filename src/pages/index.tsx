"use client";
import { Navbar } from "@/components/landingPage/navbar";
import Image from "next/image";
import hero from "@/assets/hero-img.png";
import heroRaw from "@/assets/hero-img-raw.png";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedln,
  Plus,
  Tick,
  Tick2,
  HeroBg,
} from "@/assets/icon";
import { ComponentProps } from "react";
import {
  CustomPlan,
  DevIntegrations,
  ManageAssets,
  PropertyListingPlan,
  TeamManagement,
  TeamMemberPlan,
} from "@/components/landingPage/sectionData";

type MenuItems = ComponentProps<typeof Navbar>["menuItems"]; // MenuItem[];

export default function Home() {
  const menuItems: MenuItems = [
    { title: "Docs", href: "/", isScrollLink: false },
    { title: "Pricing", target: "pricing", href: "/", isScrollLink: true },
    {
      title: "Contact Us",
      target: "contact-us",
      href: "/",
      isScrollLink: true,
    },
  ];

  type TitleAndTextProps = {
    title: string;
    text: string;
  };

  type FeatureProps = {
    icon: React.ReactNode;
    title: string;
    text: string;
  };

  const TitleAndText: React.FC<TitleAndTextProps> = ({ title, text }) => (
    <div>
      <h2 className="text-center text-[36px] font-medium">{title}</h2>
      <p className="text-xl md:text-[20px] mt-4 text-t-black opacity-70 leading-[32px] text-center max-w-[700px] mx-auto">
        {text}
      </p>
    </div>
  );

  const Features: React.FC<FeatureProps> = ({ icon, text, title }) => (
    <div className="flex flex-col space-y-4">
      <div className="mx-auto w-fit">{icon}</div>
      <h2 className="text-[24px] text-center font-medium">{title}</h2>
      <p className="xl:max-w-[383px] xl:ml-4 text-center text-base opacity-70">
        {text}
      </p>
    </div>
  );

  const Integrations: React.FC<FeatureProps> = ({ icon, text, title }) => (
    <div className="flex flex-col space-y-4">
      <div className=" w-fit">{icon}</div>
      <h2 className="text-[24px]  font-medium">{title}</h2>
      <p className="xl:max-w-[383px]   text-base opacity-70">{text}</p>
    </div>
  );

  return (
    <div>
      <div className="max-w-[1440px] mx-auto">
        <Navbar menuItems={menuItems} isLoggedIn={false} />
        <main className="lg:mt-[100px] mt-20 overflow-x-hidden text-t-black">
          <section className="text-center px-6 md:px-12 xl:px-[102px] flex flex-col relative">
            <p className="text-center text-t-purple text-sm rounded-[32px] h-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] py-[7px] px-[18px] bg-t-purple/10 w-fit mx-auto mb-5">
              The best asset tokenization platform
            </p>
            <h1 className="text-[40px] md:text-[60px] lg:text-[80px] font-bold max-w-[1000px] mx-auto leading-[55x] md:leading-[80px] lg:leading-[96px]">
              Unlock The Power of Asset Tokenization
            </h1>
            <p className="text-[24px] text-center leading-[36px] max-w-[733px] mx-auto mt-8 text-t-black">
              On Taas, we enable developers create and manage tokenized assets
              while securing accounts and monitoring trading metrics.
            </p>
            <button
              type="button"
              className="w-fit mx-auto hover:-translate-y-[3px] mt-8 duration-200 font-medium bg-t-purple text-white rounded-lg text-[20px] py-4 px-[36.75px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
            >
              Get Started
            </button>

            <div className="relative z-50 mt-[100px]">
              <Image
                src={heroRaw}
                alt="Image"
                className="mx-auto 2xl:max-w-[1103px] max-h-[600px] object-cover object-top border-t-purple border-[3px] rounded-[24px]"
              />
            </div>
          </section>

          <section className="px-6 md:px-12 xl:px-[102px] mt-28 md:mt-[150px]">
            <TitleAndText
              title="Create and Manage your Assets"
              text="On Taas, we enable developers create and manage tokenized assets while securing accounts and monitoring trading metrics."
            />
            <div className="grid grid-cols-1 gap-8 mt-16  md:grid-cols-3">
              {ManageAssets.map((item) => (
                <div key={item.id}>
                  <Features
                    title={item.title}
                    text={item.text}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="full flex items-center justify-between space-x-2 md:mt-32 mt-28 mx-auto">
            <div className="h-[1px] bg-[#F0F2F5] w-full"></div>
            <div className="scale-110">
              <Plus />
            </div>
            <div className="h-[1px] bg-[#F0F2F5] w-full"></div>
          </div>

          <section className="md:mt-[150px] px-6 md:px-12 xl:px-[102px] mt-28">
            <TitleAndText
              title="Efficient Team Management"
              text="On Taas, we enable developers create and manage tokenized assets while securing accounts and monitoring trading metrics."
            />
            <div className="grid grid-cols-1 gap-8 mt-16  md:grid-cols-3">
              {TeamManagement.map((item) => (
                <div key={item.id}>
                  <Features
                    title={item.title}
                    text={item.text}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="md:mt-[150px] px-6 md:px-12 xl:px-[102px] mt-28">
            <TitleAndText
              title="Exploring the Possibilities"
              text="On TAAS, you can create tokens for different platforms."
            />

            <div className="grid  md:grid-cols-2 xl:grid-cols-4 mt-12 gap-6">
              <div className="bg-t-purple/20 hover:-translate-y-[3px] duration-200 p-7 rounded-xl ">
                <p className=" text-2xl ">Startup Investment</p>
                <p className="text-base mt-2 leading-[28px] opacity-70">
                  TAAS offers the opportunity to create tokens for your startup
                  investment scheme. It’s comes in really handy for new startups
                  looking to raise funds.{" "}
                </p>
              </div>
              <div className="border hover:-translate-y-[3px] duration-200 border-t-gray-12 p-7 rounded-xl ">
                <p className=" text-2xl ">Real Estate</p>
                <p className="text-base mt-2 leading-[28px] opacity-70">
                  Create and manage tokens for your real estate projects with
                  ease, enabling fractional liquidity and ownership for property
                  investments.
                </p>
              </div>
              <div className="bg-t-purple/20 p-7 hover:-translate-y-[3px] duration-200 rounded-xl">
                <p className=" text-2xl ">Blue/Green Bonds</p>
                <p className="text-base mt-2 leading-[28px] opacity-70">
                  TAAS helps you support sustainable projects, and invest in
                  blue or green bonds with digital tokens.
                </p>
              </div>
              <div className="border border-t-gray-12 p-7 hover:-translate-y-[3px] duration-200 rounded-xl ">
                <p className=" text-2xl ">Antiques</p>
                <p className="text-base mt-2 leading-[28px] opacity-70">
                  On TAAS, you are able to diversify your portfolio, and trade
                  shares in valuable antiques as digital tokens.
                </p>
              </div>
            </div>
          </section>

          <section className="md:mt-[150px] px-6 md:px-12 xl:px-[102px] mt-28">
            <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between md:items-start">
              <div>
                <h2 className="xl:w-auto md:w-[360px] text-[36px] font-medium">
                  Seamless Integration for Developers
                </h2>
                <p className="xl:w-auto md:w-[360px] text-xl md:text-[20px] mt-4 text-t-black opacity-70 leading-[32px] max-w-[700px]">
                  On Taas, we enable developers create and manage tokenized
                  assets while securing accounts and monitoring trading metrics.
                </p>
              </div>
              <div>
                <a
                  href="#"
                  type="button"
                  className="select-none w-fit  hover:-translate-y-[3px] duration-200 font-medium bg-t-purple text-white  rounded-lg text-[20px] py-4 px-8"
                >
                  See API Docs
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-12 md:gap-y-0 md:gap-x-12 mt-16 md:grid-cols-3">
              {DevIntegrations.map((item) => (
                <div key={item.id}>
                  <Integrations
                    title={item.title}
                    text={item.text}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#FAFAFA] mt-8 md:mt-[150px] px-6 md:px-12 xl:px-[102px] py-28 md:py-[63px]">
            <TitleAndText
              title="Pricing Plans"
              text="TAAS has affordable plans for teams of every size and capacity, enabling you work with maximum efficiency."
            />
            <div className="grid grid-cols-1 gap-y-8 mt-10 md:grid-cols-2 xl:grid-cols-3 md:mt-16 md:gap-8 lg:gap-x-[48px]">
              <div className="flex flex-col w-full bg-white rounded-[12px] space-y-8 px-[26px] py-10">
                <h2 className="text-[20px] font-medium text-t-purple">
                  Team Member Plan
                </h2>
                <button className="select-none hover:-translate-y-[3px] text-white bg-t-purple duration-200 gradient-bg rounded-lg text-base font-medium py-[18px] px-10">
                  Get Started
                </button>
                {TeamMemberPlan.map((plan) => (
                  <div className="text-t-purple text-base" key={plan.id}>
                    <div className="flex items-center ">
                      <p className="w-5 h-5 justify-center rounded-full flex items-center bg-t-purple">
                        <Tick />
                      </p>
                      <span className="ml-3 text-[18px] font-medium">
                        {" "}
                        {plan.plan}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col bg-t-purple w-full px-[26px] py-10 rounded-[12px] space-y-8">
                <h2 className="text-[20px] font-medium text-white">
                  Property Listing Plan
                </h2>
                <button className="select-none hover:-translate-y-[3px] text-t-purple bg-white  duration-200  gradient-bg rounded-lg text-base font-medium py-[18px] px-10">
                  Get Started
                </button>
                {PropertyListingPlan.map((plan) => (
                  <div className="text-white text-base" key={plan.id}>
                    <div className="flex items-center ">
                      <p className="w-5 h-5 justify-center rounded-full flex items-center bg-white">
                        <Tick2 />
                      </p>
                      <span className="ml-3 text-[18px] font-medium">
                        {" "}
                        {plan.plan}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col space-y-8 w-full px-[26px] py-10 rounded-[12px] bg-white">
                <h2 className="text-[20px] font-medium text-t-purple">
                  Custom
                </h2>
                <button className="select-none hover:-translate-y-[3px] text-white  duration-200  bg-t-purple rounded-lg text-base font-medium py-[18px] px-10">
                  Contact Us
                </button>
                {CustomPlan.map((plan) => (
                  <div className="text-t-purple text-base" key={plan.id}>
                    <div className="flex items-center ">
                      <p className="w-5 h-5 justify-center rounded-full flex items-center bg-t-purple">
                        <Tick />
                      </p>
                      <span className="ml-3 text-[18px] font-medium">
                        {" "}
                        {plan.plan}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="md:mt-[100px] px-6 md:px-12 xl:px-[102px] mt-28 py-[64px]">
            <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between md:items-start">
              <div>
                <h2 className="text-[32px] max-w-[354px] leading-[120%] font-medium">
                  Tokenize your assets in another dimension
                </h2>
                <p className="text-base max-w-[384px] mt-3 opacity-70 leading-[140%]">
                  Let us help you create and manage your tokenized assets with
                  extraordinary ease.
                </p>
              </div>
              <div>
                <a
                  href="#"
                  type="button"
                  className="select-none w-fit  hover:-translate-y-[3px] duration-200 font-medium bg-t-purple text-white rounded-lg text-[20px] py-4 px-8"
                >
                  Send us a message
                </a>
              </div>
            </div>
            <footer className="mt-12 flex flex-col md:flex-row justify-between py-7 px-8 bg-gray-50 rounded-[10px] md:items-center gap-y-6">
              <div className="flex items-center gap-x-6">
                <a href="#">
                  <Facebook />
                </a>
                <a href="#">
                  <Twitter />
                </a>
                <a href="#">
                  <Instagram />
                </a>
                <a href="#">
                  <Linkedln />
                </a>
              </div>
              <p className="text-sm text-gray-800">
                © 2023 TAAS. All rights reserved.
              </p>
              <h2 className="font-bold text-2xl text-t-purple">TAAS</h2>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}
