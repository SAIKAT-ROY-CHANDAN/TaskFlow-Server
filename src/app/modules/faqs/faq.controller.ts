import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FaqsServices } from './faq.service';

const createFaqs = catchAsync(async (req, res) => {

  const response = await FaqsServices.createFaqsIntoDB({
    ...req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Faqs created successfully',
    data: response,
  });
});

const getAllFaqs = catchAsync(async (req, res) => {
  const { meta, data } = await FaqsServices.getAllFaqsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faqs retrieved successfully',
    meta,
    data,
  });
});

const getSingleFaqs = catchAsync(async (req, res) => {
  const response = await FaqsServices.getSingleFaqsFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faqs retrieved successfully',
    data: response,
  });
});

const updateFaqs = catchAsync(async (req, res) => {
  const response = await FaqsServices.updateFaqsIntoDB(req.params.id, {
    ...req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faqs updated successfully',
    data: response,
  });
});

const deleteFaqs = catchAsync(async (req, res) => {
  const response = await FaqsServices.deleteFaqsFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faqs deleted successfully',
    data: response,
  });
});

export const FaqsController = {
  createFaqs,
  getAllFaqs,
  getSingleFaqs,
  updateFaqs,
  deleteFaqs,
};
