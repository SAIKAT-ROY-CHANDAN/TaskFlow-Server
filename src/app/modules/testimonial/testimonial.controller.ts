import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { TestimonialServices } from './testimonial.service';

const createTestimonial = catchAsync(async (req, res) => {
  const profilePhotoUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await TestimonialServices.createtesTimonialIntoDB({
    ...req.body,
    profilePhoto: profilePhotoUrl,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Testimonial created successfully',
    data: response,
  });
});

const getAllTestimonial = catchAsync(async (req, res) => {
  const { meta, data } = await TestimonialServices.getAllTimonialFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Testimonial retrieved successfully',
    meta,
    data,
  });
});

const getSingleTestimonial = catchAsync(async (req, res) => {
  const response = await TestimonialServices.getSingleTestimonialFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Testimonial retrieved successfully',
    data: response,
  });
});

const updateTestimonial = catchAsync(async (req, res) => {
  const profilePhotoUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await TestimonialServices.updateTestimonialIntoDB(req.params.id, {
    ...req.body,
    profilePhoto: profilePhotoUrl,
    tags: JSON.parse(req.body.tags || '[]'),
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Testimonial updated successfully',
    data: response,
  });
});

const deleteTestimonial = catchAsync(async (req, res) => {
  const response = await TestimonialServices.deleteTestimonialFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Testimonial deleted successfully',
    data: response,
  });
});

export const TestimonialController = {
  createTestimonial,
  getAllTestimonial,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
