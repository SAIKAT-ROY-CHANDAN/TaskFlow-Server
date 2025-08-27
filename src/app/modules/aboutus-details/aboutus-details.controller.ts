import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AboutUsDetailsServices } from './aboutus-details.service';

const createAboutUsDetails = catchAsync(async (req, res) => {
  const response = await AboutUsDetailsServices.createAboutUsDetailsIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'AboutUsDetail created successfully',
    data: response,
  });
});

const getAboutUsDetails = catchAsync(async (req, res) => {
  const response = await AboutUsDetailsServices.getAboutUsDetailsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'AboutUsDetails retrieved successfully',
    data: response,
  });
});



const updateAboutUsDetails = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
  };
  const response = await AboutUsDetailsServices.updateAboutUsDetailsIntoDB(payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'AboutUsDetail updated successfully',
    data: response,
  });
});




export const AboutUsDetailsController = {
  createAboutUsDetails,
  getAboutUsDetails,
  updateAboutUsDetails,
};
