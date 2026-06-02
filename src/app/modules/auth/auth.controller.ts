import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

export const authController = {
  register: catchAsync(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User registered successfully',
      data: result.user,
      token: {
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      },
    });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully',
      data: result.user,
      token: {
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      },
    });
  }),
};
