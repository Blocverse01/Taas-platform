import Navbar from "@/components/navbar";
import { aeonikFont } from "@/font/setup";
import { MenuItem } from "@/types/types";
import Image from "next/image";
import hero from "@/assets/hero-img.png";
import {
  Api,
  Security,
  Team,
  Plus,
  Padlock,
  Levels,
  Wallet,
  Compatibility,
  Developers,
  Sdk,
  Vector1,
  Tick,
  Tick2,
  Facebook,
  Twitter,
  Instagram,
  Linkedln,
} from "@/assets/icon";

export default function Home() {
  const menuItems: MenuItem[] = [
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

  interface FeatureObjects {
    id: number;
    icon: React.ReactNode;
    title: string;
    text: string;
  }

  const ManageAssets: FeatureObjects[] = [
    {
      id: 1,
      title: "Token and asset security",
      text: "TAAS Ensures the security of tokenized assets by implementing robust security measures to protect digital assets, user data, and transactions from unauthorized access, manipulation, or theft.",
      icon: <Security />,
    },
    {
      id: 2,
      title: "Easy API integration",
      text: "TAAS makes it easy for you to connect and extend your systems effortlessly. Our goal is to manage all the complexity of tokenization, while enabling you to focus on scaling your business.",
      icon: <Api />,
    },
    {
      id: 3,
      title: "Easy asset and team management",
      text: "TAAS empowers you to efficiently add, tokenize, and organize your assets as well as enables seamless team collaboration in one dashboard.",
      icon: <Team />,
    },
  ];

  const TeamManagement: FeatureObjects[] = [
    {
      id: 1,
      title: "Role Based Access",
      text: "TAAS makes it possible for you to give access based on roles i.e Admin and Software developer.",
      icon: <Padlock />,
    },
    {
      id: 2,
      title: "Multi Authorization Levels",
      text: "Create multi authorization requirements for Token asset creation, sales creation and withdrawals.",
      icon: <Levels />,
    },
    {
      id: 3,
      title: "Safe Multisig Wallet",
      text: "TAAS Integrates a smart contract based multi-signature wallet.",
      icon: <Wallet />,
    },
  ];

  const DevIntegrations: FeatureObjects[] = [
    {
      id: 1,
      title: "Cross-platform compatibility",
      text: "We enable integrations across various technology stacks and frameworks, bring your frontend, we've got your back.😉",
      icon: <Compatibility />,
    },
    {
      id: 2,
      title: "Collaborate with other developers",
      text: "TAAS enables you to expand your technical team and let them have access to our Docs and API.",
      icon: <Developers />,
    },
    {
      id: 3,
      title: "API/SDK",
      text: "Our API and SDK is built with easy integration.",
      icon: <Sdk />,
    },
  ];

  interface PricingObject {
    id: number;
    plan: string;
  }

  const TeamMemberPlan: PricingObject[] = [
    {
      id: 1,
      plan: "1 dev = free",
    },
    {
      id: 2,
      plan: "1 admin = $20/month",
    },
    {
      id: 3,
      plan: "2 admin = $36/months",
    },
    {
      id: 4,
      plan: "3 admin = $90/months",
    },
  ];

  const PropertyListingPlan: PricingObject[] = [
    {
      id: 1,
      plan: "1 dev = free",
    },
    {
      id: 2,
      plan: "2 properties = $45/annum",
    },
    {
      id: 3,
      plan: "5 properties = $200/annum",
    },
    {
      id: 4,
      plan: "10 properties = $425/annum",
    },
  ];

  const CustomPlan: PricingObject[] = [
    {
      id: 1,
      plan: "Unlimited admin",
    },
    {
      id: 2,
      plan: "Unlimited property",
    },
  ];

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
      <main className="mt-20 px-6 md:px-12 xl:px-20 text-t-black">
        <section className="text-center flex flex-col space-y-8">
          <p className="text-center text-t-purple text-sm md:text-[20px] rounded-[32px] p-4 bg-t-faded-purple w-fit mx-auto">
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

        <section className=" mt-28 md:mt-[200px]">
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

        <div className="w-fit md:mt-32 mt-28 mx-auto">
          {" "}
          <Plus />
        </div>

        <section className="md:mt-32 mt-28">
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

        <section className="md:mt-32 mt-28">
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between items-center">
            <div>
              <h2 className="  xl:w-auto md:w-[360px] text-[36px] font-bold">
                Seamless Integration for Developers
              </h2>
              <p className=" xl:w-auto md:w-[360px]  text-xl md:text-[20px] mt-4 md:mt-0  opacity-70 leading-[32px]  font-medium  max-w-[700px] ">
                On Taas, we enable developers create and manage tokenized assets
                while securing accounts and monitoring trading metrics.
              </p>
            </div>
            <a
              href="#"
              type="button"
              className="select-none w-fit  hover:-translate-y-[3px] duration-200 font-medium bg-t-purple text-white  rounded-lg text-[20px] py-4 px-8"
            >
              See Api Docs
            </a>
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

        <section className="md:mt-32 mt-28">
          <TitleAndText
            title="Exploring the Possibilities"
            text="On TAAS, you can create tokens for different platforms."
          />

          <div className="grid  md:grid-cols-2 xl:grid-cols-4 mt-12 gap-8">
            <div className="bg-t-faded-purple hover:-translate-y-[3px] duration-200 p-7 rounded-xl ">
              <p className="text-3xl">Startup Investment</p>
              <p className="text-base mt-2 leading-[28px] opacity-70">
                TAAS offers the opportunity to create tokens for your startup
                investment scheme. It’s comes in really handy for new startups
                looking to raise funds.{" "}
              </p>
            </div>
            <div className="border hover:-translate-y-[3px] duration-200 border-[#ECECEC] p-7 rounded-xl ">
              <p className="text-3xl">Real Estate</p>
              <p className="text-base mt-2 leading-[28px] opacity-70">
                Create and manage tokens for your real estate projects with
                ease, enabling fractional liquidity and ownership for property
                investments.
              </p>
            </div>
            <div className="bg-t-faded-purple p-7 hover:-translate-y-[3px] duration-200 rounded-xl ">
              <p className="text-3xl">Blue/Green Bonds</p>
              <p className="text-base mt-2 leading-[28px] opacity-70">
                TAAS helps you support sustainable projects, and invest in blue
                or green bonds with digital tokens.
              </p>
            </div>
            <div className="border border-[#ECECEC] p-7 hover:-translate-y-[3px] duration-200 rounded-xl ">
              <p className="text-3xl">Antiques</p>
              <p className="text-base mt-2 leading-[28px] opacity-70">
                On TAAS, you are able to diversify your portfolio, and trade
                shares in valuable antiques as digital tokens.
              </p>
            </div>
          </div>
        </section>

        <section className="md:mt-32 mt-28">
          <TitleAndText
            title="Pricing Plans"
            text="TAAS has affordable plans for teams of every size and capacity, enabling you work with maximum efficiency."
          />
          <div className="grid grid-cols-1 gap-y-8 mt-10  md:grid-cols-2 xl:grid-cols-3 md:mt-16 h-fit md:gap-8 lg:ml-16">
            <div className="flex flex-col w-full md:w-[322px] p-4 gradient-border border-2 rounded-[12px] space-y-8">
              <h2 className="text-2xl font-bold text-t-purple">
                Team Member Plan
              </h2>
              <button className="select-none hover:-translate-y-[3px] font-semibold text-white bg-t-purple  duration-200  gradient-bg rounded-lg text-[20px] py-2 px-10">
                Get Started
              </button>
              {TeamMemberPlan.map((plan) => (
                <div className="text-t-purple" key={plan.id}>
                  <p className="flex items-center ">
                    <p className="w-5 h-5 justify-center rounded-full flex items-center bg-t-purple">
                      <Tick />
                    </p>
                    <span className="ml-3 text-[18px] font-medium">
                      {" "}
                      {plan.plan}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col bg-t-purple w-full md:w-[322px] p-4 gradient-border border-2 rounded-[12px] space-y-8">
              <h2 className="text-2xl font-bold text-white">
                Property Listing Plan
              </h2>
              <button className="select-none hover:-translate-y-[3px] font-semibold text-t-purple bg-white  duration-200  gradient-bg rounded-lg text-[20px] py-2 px-10">
                Get Started
              </button>
              {PropertyListingPlan.map((plan) => (
                <div className="text-white" key={plan.id}>
                  <p className="flex items-center ">
                    <p className="w-5 h-5 justify-center rounded-full flex items-center bg-white">
                      <Tick2 />
                    </p>
                    <span className="ml-3 text-[18px] font-medium">
                      {" "}
                      {plan.plan}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full md:w-[322px] h-[364px] xl:h-full p-4 gradient-border border-2 rounded-[12px] justify-between">
              <div className="flex flex-col space-y-8">
                <h2 className="text-2xl font-bold text-t-purple">Custom</h2>
                <button className="select-none hover:-translate-y-[3px] font-semibold text-white  duration-200  bg-t-purple rounded-lg text-[20px] py-2 px-10">
                  Contact Us
                </button>
                {CustomPlan.map((plan) => (
                  <div className="text-t-purple" key={plan.id}>
                    <p className="flex items-center ">
                      <p className="w-5 h-5 justify-center rounded-full flex items-center bg-t-purple">
                        <Tick />
                      </p>
                      <span className="ml-3 text-[18px] font-medium">
                        {" "}
                        {plan.plan}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="md:mt-32 mt-28">
          <div className="flex flex-col md:flex-row space-y-8 md:sapce-y-0 justify-between items-center">
            <div>
              <h2 className=" text-[36px] max-w-[404px] leading-[46px] font-bold">
                Tokenize your assets in another dimension
              </h2>
              <p className=" text-xl lg:w-[500px] xl:w-auto md:text-[20px] mt-4 md:mt-0  opacity-70 leading-[32px]  font-medium  max-w-[700px] ">
                Let us help you create and manage your tokenized assets with
                extraordinary ease.
              </p>
            </div>
            <a
              href="#"
              type="button"
              className="select-none w-fit  hover:-translate-y-[3px] duration-200 font-medium bg-t-purple text-white  rounded-lg text-[20px] py-4 px-8"
            >
              Send us a message
            </a>
          </div>
        </section>
        <footer className="md:mt-32 mt-28 mb-10 flex flex-col md:flex-row space-y-8 md:space-y-0 justify-around items-center text-t-purple">
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
