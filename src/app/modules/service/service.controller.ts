import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { ServiceServices } from './service.service';

const createService = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const thumbnails: {
    thumbnail?: string | null;
    thumbnailOptional1?: string | null;
    thumbnailOptional2?: string | null;
  } = {};

  if (files && files['thumbnail'] && files['thumbnail'][0]) {
    thumbnails.thumbnail = getSingleImageUrl(req, files['thumbnail'][0]);
  }

  if (files && files['thumbnailOptional1'] && files['thumbnailOptional1'][0]) {
    thumbnails.thumbnailOptional1 = getSingleImageUrl(
      req,
      files['thumbnailOptional1'][0],
    );
  }

  if (files && files['thumbnailOptional2'] && files['thumbnailOptional2'][0]) {
    thumbnails.thumbnailOptional2 = getSingleImageUrl(
      req,
      files['thumbnailOptional2'][0],
    );
  }

  // Parse serviceOfferKeyPoints if it's a string
  let serviceOfferKeyPoints;
  if (req.body.serviceOfferKeyPoints) {
    try {
      serviceOfferKeyPoints = Array.isArray(req.body.serviceOfferKeyPoints)
        ? req.body.serviceOfferKeyPoints
        : JSON.parse(req.body.serviceOfferKeyPoints);
    } catch {
      serviceOfferKeyPoints = [];
    }
  }

  const payload = {
    ...req.body,
    ...thumbnails,
    serviceOfferKeyPoints,
  };

  const response = await ServiceServices.createServiceIntoDB(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Service created successfully!',
    data: response,
  });
});

const getServices = catchAsync(async (req, res) => {
  const response = await ServiceServices.getServicesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Services retrieved successfully!',
    meta: response.meta,
    data: response.data,
  });
});

const getService = catchAsync(async (req, res) => {
  const { id } = req.params;

  const response = await ServiceServices.getServiceFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service retrieved successfully!',
    data: response,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const thumbnails: {
    thumbnail?: string | null;
    thumbnailOptional1?: string | null;
    thumbnailOptional2?: string | null;
  } = {};

  if (files && files['thumbnail'] && files['thumbnail'][0]) {
    thumbnails.thumbnail = getSingleImageUrl(req, files['thumbnail'][0]);
  }

  if (files && files['thumbnailOptional1'] && files['thumbnailOptional1'][0]) {
    thumbnails.thumbnailOptional1 = getSingleImageUrl(
      req,
      files['thumbnailOptional1'][0],
    );
  }

  if (files && files['thumbnailOptional2'] && files['thumbnailOptional2'][0]) {
    thumbnails.thumbnailOptional2 = getSingleImageUrl(
      req,
      files['thumbnailOptional2'][0],
    );
  }

  // Parse serviceOfferKeyPoints if it's a string
  let serviceOfferKeyPoints;
  if (req.body.serviceOfferKeyPoints) {
    try {
      serviceOfferKeyPoints = Array.isArray(req.body.serviceOfferKeyPoints)
        ? req.body.serviceOfferKeyPoints
        : JSON.parse(req.body.serviceOfferKeyPoints);
    } catch {
      serviceOfferKeyPoints = [];
    }
  }

  const payload = {
    ...req.body,
    ...thumbnails,
    serviceOfferKeyPoints,
  };

  const response = await ServiceServices.updateServiceIntoDB(id, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service updated successfully!',
    data: response,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;

  const response = await ServiceServices.deleteServiceFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service deleted successfully!',
    data: response,
  });
});

export const ServiceControllers = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
};
