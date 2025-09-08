import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IndustryServices } from './industry.service';

const createIndustry = catchAsync(async (req, res) => {
  const response = await IndustryServices.createIndustryIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Industry created successfully',
    data: response,
  });
});

const getIndustries = catchAsync(async (req, res) => {
  const { data, meta } = await IndustryServices.getIndustriesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Industries retrieved successfully',
    meta,
    data,
  });
});

const getIndustry = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await IndustryServices.getIndustryFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Industry retrieved successfully',
    data: response,
  });
});

const updateIndustry = catchAsync(async (req, res) => {
  const response = await IndustryServices.updateIndustryInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Industry updated successfully',
    data: response,
  });
});

const deleteIndustry = catchAsync(async (req, res) => {
  const response = await IndustryServices.deleteIndustryInDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Industry deleted successfully',
    data: response,
  });
});

export const IndustryController = {
  createIndustry,
  getIndustries,
  getIndustry,
  updateIndustry,
  deleteIndustry,
};
