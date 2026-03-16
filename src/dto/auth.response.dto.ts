import { LoginAttemptDocument } from "../models/loginAttempt.model.js";
import { SessionDocument } from "../models/session.model.js";
import { UserDocument } from "../models/user.model.js";

export const registerResponseDTO = (user: UserDocument) => {
  return {
    id: user._id.toString(),
    email: user.email,
    emaiVerified: user.emailVerified,
  };
};

export const getAuthSessionsResponseDTO = (
  sessions: SessionDocument[],
  sessionId: string,
) => {
  return sessions.map((session) => ({
    id: session._id.toString(),
    device: session.device,
    ip: session.ipAddress,
    createdAt: session.createdAt,
    isCurrent: session._id.toString() === sessionId,
  }));
};

export const loginHistoryResponseDTO = (logins: LoginAttemptDocument[]) => {
  return logins.map((login) => ({
    ip: login.ip,
    device: login.device,
    success: login.success,
    createdAt: login.createdAt,
  }));
};
