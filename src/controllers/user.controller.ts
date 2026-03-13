import { refreshTokenCookieOptions } from "../config/cookie.js";
import {
  deleteUserRequestDTO,
  updateUserRequestDTO,
} from "../dto/user.request.dto.js";
import {
  getUserResponseDTO,
  updateUserResponseDTO,
} from "../dto/user.response.dto.js";
import {
  deleteUserService,
  getUserService,
  updateUserService,
} from "../services/user.service.js";
import { successResponse } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";
import {
  deleteUserSchema,
  updateUserSchema,
} from "../validators/user.schema.js";

export const getUserConroller = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const user = await getUserService(userId);
  const response = getUserResponseDTO(user);
  res.status(200).json(successResponse(response));
});

export const updateUserController = catchAsync(async (req, res) => {
  const dto = updateUserRequestDTO(req);
  const validatedData = updateUserSchema.parse(dto);
  const userId = req.user!.userId;
  const updatedUser = await updateUserService(validatedData.name, userId);
  const response = updateUserResponseDTO(updatedUser);
  res.status(200).json(successResponse(response));
});

export const deleteUserController = catchAsync(async (req, res) => {
  const dto = deleteUserRequestDTO(req);
  const validpassword = deleteUserSchema.parse(dto);
  const response = await deleteUserService(
    validpassword.password,
    req.user!.userId,
  );
  res.clearCookie("refreshToken", refreshTokenCookieOptions);
  res.status(200).json(successResponse(response));
});
