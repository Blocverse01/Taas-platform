"use client";
import { Navbar } from "@/components/landingPage/navbar";
import { aeonikFont } from "@/font/setup";
import Image from "next/image";
import hero from "@/assets/hero-img.png";
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

export default function Home() {
  type MenuItems = ComponentProps<typeof Navbar>["menuItems"]; // MenuItem[];

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
      <h2 className="text-center text-[36px] font-bold">{title}</h2>
      <p className=" text-xl md:text-[20px] mt-4 md:mt-0  opacity-70 leading-[32px]  font-medium text-center max-w-[851px] mx-auto">
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
    <div className={`${aeonikFont.variable} font-aeonik`}>
      <Navbar menuItems={menuItems} isLoggedIn={false} />
      <main className="mt-20 overflow-x-hidden   text-t-black">
        <section className="text-center px-6 md:px-12 xl:px-20 flex flex-col relative space-y-8">
          <div className="absolute  opacity-20  right-[10px] xl:right-[0px] xl:left-[160px] top-0">
            <HeroBg />
          </div>
          <p className="text-center text-t-purple text-sm  rounded-[32px] p-4 bg-t-faded-purple2 w-fit mx-auto">
            The best asset tokenization platform
          </p>
          <h1 className=" text-[40px] md:text-[60px] lg:text-[80px] font-bold xl:w-[1000px] mx-auto leading-[55x] md:leading-[80px] lg:leading-[96px]">
            Unlock The Power of Asset Tokenization
          </h1>

          <p className="text-[24px] leading-[36px] lg:w-[733px] mx-auto">
            On Taas, we enable developers create and manage tokenized assets
            while securing accounts and monitoring trading metrics.
          </p>
          <button
            type="button"
            className="select-none w-fit mx-auto hover:-translate-y-[3px] duration-200 font-medium bg-t-purple text-white  rounded-lg text-[20px] py-4 px-8"
          >
            Get Started
          </button>

          <div className="relative top-10">
            <Image src={hero} alt="Image" className="mx-auto" />
          </div>
        </section>

        <section className=" px-6 md:px-12 xl:px-20 mt-28 md:mt-[200px]">
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
          <div className=" scale-110 ">
            <Plus />
          </div>
          <div className="h-[1px] bg-[#F0F2F5] w-full"></div>
        </div>

        <section className="md:mt-32 px-6 md:px-12 xl:px-20 mt-28">
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

        <section className="md:mt-32 px-6 md:px-12 xl:px-20 mt-28">
          <TitleAndText
            title="Exploring the Possibilities"
            text="On TAAS, you can create tokens for different platforms."
          />

          <div className="grid  md:grid-cols-2 xl:grid-cols-4 mt-12 gap-6">
            <div className="bg-t-faded-purple hover:-translate-y-[3px] duration-200 p-7 rounded-xl ">
              <p className=" text-2xl ">Startup Investment</p>
              <p className="text-base mt-2 leading-[28px] opacity-70">
                TAAS offers the opportunity to create tokens for your startup
                investment scheme. It’s comes in really handy for new startups
                looking to raise funds.{" "}
              </p>
            </div>
            <div className="border hover:-translate-y-[3px] duration-200 border-[#ECECEC] p-7 rounded-xl ">
              <p className=" text-2xl ">Real Estate</p>
              <p className="text-base mt-2 leading-[28px] opacity-70">
                Create and manage tokens for your real estate projects with
                ease, enabling fractional liquidity and ownership for property
                investments.
              </p>
            </div>
            <div className="bg-t-faded-purple p-7 hover:-translate-y-[3px] duration-200 rounded-xl ">
              <p className=" text-2xl ">Blue/Green Bonds</p>
              <p className="text-base mt-2 leading-[28px] opacity-70">
                TAAS helps you support sustainable projects, and invest in blue
                or green bonds with digital tokens.
              </p>
            </div>
            <div className="border border-[#ECECEC] p-7 hover:-translate-y-[3px] duration-200 rounded-xl ">
              <p className=" text-2xl ">Antiques</p>
              <p className="text-base mt-2 leading-[28px] opacity-70">
                On TAAS, you are able to diversify your portfolio, and trade
                shares in valuable antiques as digital tokens.
              </p>
            </div>
          </div>
        </section>

        <section className="md:mt-32 px-6 md:px-12 xl:px-20 mt-28">
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between ">
            <div>
              <h2 className="  xl:w-auto md:w-[360px] text-[36px] font-bold">
                Seamless Integration for Developers
              </h2>
              <p className=" xl:w-auto md:w-[360px]  text-xl md:text-[20px] mt-4 md:mt-0  opacity-70 leading-[32px]  font-medium  max-w-[700px] ">
                On Taas, we enable developers create and manage tokenized assets
                while securing accounts and monitoring trading metrics.
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
          <div className="grid grid-cols-1 gap-y-12 md:gap-y-0  md:gap-x-12  mt-16  md:grid-cols-3">
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

        <section className=" bg-[#FAFAFA] mt-8 md:mt-16 px-6 md:px-12 xl:px-20 py-28 md:py-32 ">
          <TitleAndText
            title="Pricing Plans"
            text="TAAS has affordable plans for teams of every size and capacity, enabling you work with maximum efficiency."
          />
          <div className="grid grid-cols-1 gap-y-8 mt-10  md:grid-cols-2 xl:grid-cols-3 md:mt-16 h-fit md:gap-8 lg:ml-16">
            <div className="flex flex-col w-full md:w-[322px] p-4 shadow-sm rounded-xl space-y-8">
              <h2 className="text-[20px] font-bold text-t-purple">
                Team Member Plan
              </h2>
              <button className="select-none hover:-translate-y-[3px] font-semibold text-white bg-t-purple  duration-200  gradient-bg rounded-lg text-base py-2 px-10">
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
            <div className="flex flex-col bg-t-purple w-full md:w-[322px] p-4 shadow-sm rounded-xl space-y-8">
              <h2 className="text-[20px] font-bold text-white">
                Property Listing Plan
              </h2>
              <button className="select-none hover:-translate-y-[3px] font-semibold text-t-purple bg-white  duration-200  gradient-bg rounded-lg text-base py-2 px-10">
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
            <div className="flex flex-col w-full md:w-[322px] h-[364px] xl:h-full p-4 shadow-sm rounded-xl justify-between">
              <div className="flex flex-col space-y-8">
                <h2 className="text-[20px] font-bold text-t-purple">Custom</h2>
                <button className="select-none hover:-translate-y-[3px] font-semibold text-white  duration-200  bg-t-purple rounded-lg text-base py-2 px-10">
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
          </div>
        </section>
        <section className="md:mt-32 px-6 md:px-12 xl:px-20 mt-28">
          <div className="flex flex-col md:flex-row space-y-8 md:sapce-y-0 justify-between ">
            <div>
              <h2 className=" text-[36px] max-w-[404px] leading-[46px] font-bold">
                Tokenize your assets in another dimension
              </h2>
              <p className=" text-xl lg:w-[500px] xl:w-[384px] md:text-[20px] mt-4 md:mt-0  opacity-70 leading-[32px]  font-medium  max-w-[700px] ">
                Let us help you create and manage your tokenized assets with
                extraordinary ease.
              </p>
            </div>
            <div>
              <a
                href="#"
                type="button"
                className="select-none w-fit  hover:-translate-y-[3px] duration-200 font-medium bg-t-purple text-white  rounded-lg text-[20px] py-4 px-8"
              >
                Send us a message
              </a>
            </div>
          </div>
        </section>
        <footer className="md:mt-32 px-6 md:px-12 xl:px-20 mt-28 mb-10 flex flex-col md:flex-row space-y-8 md:space-y-0 justify-around items-center text-t-purple">
          <div className="w-[200px] flex justify-around">
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
          <p className="text-black">© 2023 TAAS. All rights reserved.</p>
          <h2 className="font-bold text-2xl">TAAS</h2>
        </footer>
      </main>
    </div>
  );
}