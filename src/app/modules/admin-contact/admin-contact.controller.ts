import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminContactServices } from './admin-contact.service';

const createAdminContact = catchAsync(async (req, res) => {
  const response = await AdminContactServices.createAdminContactIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin contact created successfully',
    data: response,
  });
});

const getAdminContacts = catchAsync(async (req, res) => {
  const { meta, data } = await AdminContactServices.getAdminContactsFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin contacts retrieved successfully',
    meta,
    data,
  });
});

const getAdminContact = catchAsync(async (req, res) => {
  const response = await AdminContactServices.getAdminContactFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin contact retrieved successfully',
    data: response,
  });
});

const updateAdminContact = catchAsync(async (req, res) => {
  const response = await AdminContactServices.updateAdminContactIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin contact updated successfully',
    data: response,
  });
});

const deleteAdminContact = catchAsync(async (req, res) => {
  const response = await AdminContactServices.deleteAdminContactFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin contact deleted successfully',
    data: response,
  });
});

const getActiveAdminContact = catchAsync(async (req, res) => {
  const response = await AdminContactServices.getActiveAdminContactFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Active admin contact retrieved successfully',
    data: response,
  });
});

export const AdminContactController = {
  createAdminContact,
  getAdminContacts,
  getAdminContact,
  updateAdminContact,
  deleteAdminContact,
  getActiveAdminContact,
};
