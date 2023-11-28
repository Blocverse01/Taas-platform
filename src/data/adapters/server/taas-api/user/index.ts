import { userRepository } from "@/resources/constants";

type CreateTaasUserPayload = {
  walletAddress: string;
  email: string;
};

const createUser = async (payload: CreateTaasUserPayload) => {
  return await userRepository().create({
    email: payload.email,
    walletAddress: payload.walletAddress,
  });
};

const getUserById = async (Id: string) => {

  const user = await userRepository()
    .filter({ id: Id })
    .select([
      "id",
      "email",
      "walletAddress"
    ])
    .getFirst();

  return user;
}

export { createUser, getUserById };
