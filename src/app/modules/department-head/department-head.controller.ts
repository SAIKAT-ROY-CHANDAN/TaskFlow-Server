import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { DepartmentHeadServices } from './department-head.service';

const createDepartmentHead = catchAsync(async (req, res) => {
  const profilePhotoUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await DepartmentHeadServices.createDepartmentHeadIntoDB({
    ...req.body,
    profilePhoto: profilePhotoUrl,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Department head created successfully',
    data: response,
  });
});

const getDepartmentHeads = catchAsync(async (req, res) => {
  const { meta, data } = await DepartmentHeadServices.getDepartmentHeadsFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Department heads retrieved successfully',
    meta,
    data,
  });
});

const getDepartmentHead = catchAsync(async (req, res) => {
  const response = await DepartmentHeadServices.getDepartmentHeadFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Department head retrieved successfully',
    data: response,
  });
});

const updateDepartmentHead = catchAsync(async (req, res) => {
  const profilePhotoUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await DepartmentHeadServices.updateDepartmentHeadIntoDB(
    req.params.id,
    {
      ...req.body,
      profilePhoto: profilePhotoUrl,
    },
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Department head updated successfully',
    data: response,
  });
});

const deleteDepartmentHead = catchAsync(async (req, res) => {
  const response = await DepartmentHeadServices.deleteDepartmentHeadFromDB(
    req.params.id,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Department head deleted successfully',
    data: response,
  });
});

const getDepartmentHeadsByRole = catchAsync(async (req, res) => {
  const response = await DepartmentHeadServices.getDepartmentHeadsByRoleFromDB(
    req.params.roleId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Department heads by role retrieved successfully',
    data: response,
  });
});

export const DepartmentHeadController = {
  createDepartmentHead,
  getDepartmentHeads,
  getDepartmentHead,
  updateDepartmentHead,
  deleteDepartmentHead,
  getDepartmentHeadsByRole,
};
