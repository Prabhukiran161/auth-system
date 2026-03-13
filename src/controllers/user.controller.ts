import { getUserResponseDTO } from "../dto/user.response.dto.js";
import { AppError } from "../errors/AppError.js";
import { getUserService } from "../services/user.service.js";
import { successResponse } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getUserConroller = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const user = await getUserService(userId);
  const response = getUserResponseDTO(user);
  res.status(200).json(successResponse(response));
});
