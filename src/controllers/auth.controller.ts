import {
  registerRequestDTO,
  verifyEmailRequestDTO,
} from "../dto/auth.request.dto.js";
import {
  registerSchema,
  verifyEmailSchema,
} from "../validators/auth.schema.js";
import {
  registerService,
  verifyEmailService,
} from "../services/auth.service.js";
import { registerResponseDTO } from "../dto/auth.response.dto.js";
import { successResponse } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";

export const registerController = catchAsync(async (req, res) => {
  const dto = registerRequestDTO(req);
  const validatedData = registerSchema.parse(dto);
  const user = await registerService(validatedData);
  const response = registerResponseDTO(user);
  res.status(201).json(successResponse(response));
});

export const verifyEmailController = catchAsync(async (req, res) => {
  const dto = verifyEmailRequestDTO(req);
  const validatedToken = verifyEmailSchema.parse(dto);
  const response =await verifyEmailService(validatedToken);
  res.status(200).json(successResponse(response));
});
