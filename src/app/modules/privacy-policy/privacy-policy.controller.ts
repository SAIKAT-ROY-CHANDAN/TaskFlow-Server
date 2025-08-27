import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { privacyPolicyServices } from './privacy-policy.service';

const createPrivacyPolicy = catchAsync(async (req, res) => {
  const response = await privacyPolicyServices.createprivacyPolicyIntoDB({
    ...req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Privacy Policy created successfully',
    data: response,
  });
});

const getPrivacyPolicy = catchAsync(async (req, res) => {
  const response = await privacyPolicyServices.getprivacyPolicyFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Privacy Policy retrieved successfully',
    data: response,
  });
});


const updatePrivacyPolicy = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
  };
  const response = await privacyPolicyServices.updateprivacyPolicyIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Privacy Policy updated successfully!',
    data: response,
  });
});


export const PrivacyPolicyController = {
  createPrivacyPolicy,
  getPrivacyPolicy,
  updatePrivacyPolicy,
};
