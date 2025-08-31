import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { SpecializedIndustryService } from './specialized-industry.service';

const createSpecializedIndustry = catchAsync(async (req, res) => {
  const iconUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response =
    await SpecializedIndustryService.createSpecializedIndustryIntoDB({
      ...req.body,
      icon: iconUrl,
    });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Specialized industry created successfully',
    data: response,
  });
});

const getSpecializedIndustries = catchAsync(async (req, res) => {
  const { meta, data } =
    await SpecializedIndustryService.getSpecializedIndustriesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Specialized industries retrieved successfully',
    meta,
    data,
  });
});

const getSpecializedIndustry = catchAsync(async (req, res) => {
  const response =
    await SpecializedIndustryService.getSpecializedIndustryFromDB(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Specialized industry retrieved successfully',
    data: response,
  });
});

const updateSpecializedIndustry = catchAsync(async (req, res) => {
  const iconUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response =
    await SpecializedIndustryService.updateSpecializedIndustryIntoDB(
      req.params.id,
      {
        ...req.body,
        icon: iconUrl,
      },
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Specialized industry updated successfully',
    data: response,
  });
});

const deleteSpecializedIndustry = catchAsync(async (req, res) => {
  const response =
    await SpecializedIndustryService.deleteSpecializedIndustryFromDB(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Specialized industry deleted successfully',
    data: response,
  });
});

export const SpecializedIndustryController = {
  createSpecializedIndustry,
  getSpecializedIndustries,
  getSpecializedIndustry,
  updateSpecializedIndustry,
  deleteSpecializedIndustry,
};
