import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const register = catchAsync(async (req, res) => {
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
});

const login = catchAsync(async (req, res) => {
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
});

export const AuthController = {
  register,
  login,
};
