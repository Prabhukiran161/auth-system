import type { Request, Response } from "express";
import { registerRequestDTO } from "../dto/auth.request.dto.js";
import { registerSchema } from "../validators/auth.schema.js";
import { registerService } from "../services/auth.service.js";
import { registerResponseDTO } from "../dto/auth.response.dto.js";
import { successResponse } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";

export const registerController = catchAsync(
  async (req: Request, res: Response) => {
    const dto = registerRequestDTO(req);
    const validatedData = registerSchema.parse(dto);
    const user = await registerService(validatedData);
    const response = registerResponseDTO(user);
    res.status(201).json(successResponse(response));
  },
);
