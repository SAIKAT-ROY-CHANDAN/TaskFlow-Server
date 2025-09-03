import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import {
  createInvoiceIntoDB,
  getInvoicesFromDB,
  getInvoiceFromDB,
  updateInvoiceInDB,
  deleteInvoiceFromDB,
  updateInvoiceStatusInDB,
} from './invoice.service';

const createInvoice = catchAsync(async (req, res) => {
  const response = await createInvoiceIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Invoice created successfully',
    data: response,
  });
});

const getInvoices = catchAsync(async (req, res) => {
  const { data, meta } = await getInvoicesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Invoices retrieved successfully',
    meta,
    data,
  });
});

const getInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await getInvoiceFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Invoice retrieved successfully',
    data: response,
  });
});

const updateInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await updateInvoiceInDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Invoice updated successfully',
    data: response,
  });
});

const deleteInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await deleteInvoiceFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Invoice deleted successfully',
    data: response,
  });
});

const updateInvoiceStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const response = await updateInvoiceStatusInDB(id, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Invoice status updated successfully',
    data: response,
  });
});

export const InvoiceController = {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  updateInvoiceStatus,
};
