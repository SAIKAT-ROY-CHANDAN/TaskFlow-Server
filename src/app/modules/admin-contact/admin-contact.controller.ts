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
  const response = await AdminContactServices.getAdminContactsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin contacts retrieved successfully',
    data: response,
  });
});



const updateAdminContact = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
  };
  const response = await AdminContactServices.updateAdminContactIntoDB(payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin contact updated successfully',
    data: response,
  });
});




export const AdminContactController = {
  createAdminContact,
  getAdminContacts,
  updateAdminContact,
};
