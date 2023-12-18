import { Magic } from "@magic-sdk/admin";
import { MissingEnvVariableError } from "@/resources/errors";

let instance: Magic | undefined = undefined;

export const getMagicAdmin = () => {
  const magicSecretKey = process.env.MAGIC_SECRET_KEY;
  if (magicSecretKey === undefined || magicSecretKey === "") {
    throw new MissingEnvVariableError("MAGIC_SECRET_KEY");
  }

  if (!instance) {
    instance = new Magic(magicSecretKey);
  }

  return instance;
};
