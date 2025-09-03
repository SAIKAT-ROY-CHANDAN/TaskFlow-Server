import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { TechonologyServices } from './techonology.service';

const createTechonology = catchAsync(async (req, res) => {
  const iconUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await TechonologyServices.createTechonologyIntoDB({
    ...req.body,
    icon: iconUrl,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Techonology created successfully',
    data: response,
  });
});

const getAllTechonology = catchAsync(async (req, res) => {
  const { meta, data } = await TechonologyServices.getTechonologyFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Techonologys retrieved successfully',
    meta,
    data,
  });
});

const getSingleTechonology = catchAsync(async (req, res) => {
  const response = await TechonologyServices.getSingleTechonologyFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Techonology retrieved successfully',
    data: response,
  });
});

const updateTechonology = catchAsync(async (req, res) => {
  const iconUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await TechonologyServices.updateTechonologyIntoDB(req.params.id, {
    ...req.body,
    icon: iconUrl,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Techonology updated successfully',
    data: response,
  });
});

const deleteTechonology = catchAsync(async (req, res) => {
  const response = await TechonologyServices.deleteTechonologyFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Techonology deleted successfully',
    data: response,
  });
});


export const TechonologyController = {
  createTechonology,
  getAllTechonology,
  getSingleTechonology,
  updateTechonology,
  deleteTechonology,
};
