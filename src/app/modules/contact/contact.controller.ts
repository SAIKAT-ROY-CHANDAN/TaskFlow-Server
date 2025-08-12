import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactServices } from './contact.service';

const createContact = catchAsync(async (req, res) => {
  const response = await ContactServices.createContactIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Contact message sent successfully',
    data: response,
  });
});

const getContacts = catchAsync(async (req, res) => {
  const { meta, data } = await ContactServices.getContactsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contacts retrieved successfully',
    meta,
    data,
  });
});

const getContact = catchAsync(async (req, res) => {
  const response = await ContactServices.getContactFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact retrieved successfully',
    data: response,
  });
});

const updateContact = catchAsync(async (req, res) => {
  const response = await ContactServices.updateContactIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact updated successfully',
    data: response,
  });
});

const deleteContact = catchAsync(async (req, res) => {
  const response = await ContactServices.deleteContactFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact deleted successfully',
    data: response,
  });
});

const markContactAsOpened = catchAsync(async (req, res) => {
  const response = await ContactServices.markContactAsOpenedIntoDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact marked as opened',
    data: response,
  });
});

export const ContactController = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  markContactAsOpened,
};
