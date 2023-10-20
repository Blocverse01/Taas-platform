import type { Session } from "next-auth";
import { Address } from "viem"

const FEATURE_READY = false;
const getTeamMembers = async (currentUser: Session, teamId: string) => {
  if (!FEATURE_READY) {
    const dummyMembers = [{
      email: "toochukwukingz6@gmail.com",
      walletAddress: "0x2525D2694A862Bb03e143Ad8B10695177EBC6CF0",
      firstname: "",
      userId: ""
    },
    {
      email: "adelekekehinde06@gmail.com",
      walletAddress: "0x4AA4b9EAF070DBeDBF1ED7709e330C2118C7CF16",
      firstname: "",
      userId: ""
    },
    {
      email: "avoajajoshua@gmail.com",
      walletAddress: "0xaBeDc0A70237A82482F4c6E48623005d80E2b95C",
      firstname: "",
      userId: ""
    }]
    return dummyMembers.map((member) => ({
      ...member,
      walletAddress: member.walletAddress as Address,
      isCurrentUser: member.email === currentUser.user.email
    }))
  }
  return [];
}

export { getTeamMembers }