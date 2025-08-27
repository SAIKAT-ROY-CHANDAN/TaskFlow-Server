import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TermsConditionsServices } from './terms-condition.service';

const createTermaConditons = catchAsync(async (req, res) => {
  const response = await TermsConditionsServices.createTermsConditionsIntoDB({
    ...req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Terms and Conditions created successfully',
    data: response,
  });
});

const getTermsConditons = catchAsync(async (req, res) => {
  const response = await TermsConditionsServices.getTermsConditionsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Terms and Conditions retrieved successfully',
    data: response,
  });
});


const updateTermsConditions = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
  };
  const response = await TermsConditionsServices.updateTermsConditionsIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Terms and Conditions updated successfully!',
    data: response,
  });
});


export const TermsCOnditionsController = {
  createTermaConditons,
  getTermsConditons,
  updateTermsConditions,
};
