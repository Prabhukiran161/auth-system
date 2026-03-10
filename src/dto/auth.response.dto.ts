import { UserDocument } from "../models/user.model.js";

export const registerResponseDTO = (user: UserDocument) => {
  return {
    id: user._id.toString(),
    email: user.email,
    emaiVerified: user.emailVerified,
  };
};
