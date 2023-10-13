import {
  Api,
  Security,
  Team,
  Padlock,
  Levels,
  Wallet,
  Compatibility,
  Developers,
  Sdk,
} from "@/assets/icon";
interface FeatureObjects {
  id: number;
  icon: React.ReactNode;
  title: string;
  text: string;
}
export const ManageAssets: FeatureObjects[] = [
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

export const TeamManagement: FeatureObjects[] = [
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

export const DevIntegrations: FeatureObjects[] = [
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

export const TeamMemberPlan: PricingObject[] = [
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

export const PropertyListingPlan: PricingObject[] = [
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

export const CustomPlan: PricingObject[] = [
  {
    id: 1,
    plan: "Unlimited admin",
  },
  {
    id: 2,
    plan: "Unlimited property",
  },
];
