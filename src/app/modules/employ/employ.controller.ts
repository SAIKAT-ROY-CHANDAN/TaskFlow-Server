import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { EmployServices } from './employ.service';

const createEmploy = catchAsync(async (req, res) => {
  const profilePhotoUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await EmployServices.createEmployIntoDB({
    ...req.body,
    profilePhoto: profilePhotoUrl,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Employee created successfully',
    data: response,
  });
});

const getEmploys = catchAsync(async (req, res) => {
  const { meta, data } = await EmployServices.getEmploysFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Employees retrieved successfully',
    meta,
    data,
  });
});

const getEmploy = catchAsync(async (req, res) => {
  const response = await EmployServices.getEmployFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Employee retrieved successfully',
    data: response,
  });
});

const updateEmploy = catchAsync(async (req, res) => {
  const profilePhotoUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await EmployServices.updateEmployIntoDB(req.params.id, {
    ...req.body,
    profilePhoto: profilePhotoUrl,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Employee updated successfully',
    data: response,
  });
});

const deleteEmploy = catchAsync(async (req, res) => {
  const response = await EmployServices.deleteEmployFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Employee deleted successfully',
    data: response,
  });
});

export const EmployController = {
  createEmploy,
  getEmploys,
  getEmploy,
  updateEmploy,
  deleteEmploy,
};
