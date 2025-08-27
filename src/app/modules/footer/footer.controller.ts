import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FooterServices } from './footer.service';

const createFooter = catchAsync(async (req, res) => {
  const response = await FooterServices.createFooterIntoDB({
    ...req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Footer created successfully',
    data: response,
  });
});

const getFooter = catchAsync(async (req, res) => {
  const response = await FooterServices.getFooterFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Footer retrieved successfully',
    data: response,
  });
});

const getSingleFooter = catchAsync(async (req, res) => {
  const response = await FooterServices.getSingleFooterFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Footer retrieved successfully',
    data: response,
  });
});

const updateFooter = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
  };
  const response = await FooterServices.updateFooterIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Footer updated successfully!',
    data: response,
  });
});

const deleteFooter = catchAsync(async (req, res) => {
  const response = await FooterServices.deleteFooterFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Footer deleted successfully',
    data: response,
  });
});

export const FooterController = {
  createFooter,
  getFooter,
  getSingleFooter,
  updateFooter,
  deleteFooter,
};
