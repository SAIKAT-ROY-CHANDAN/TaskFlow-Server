import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectInvoiceServices } from './project-invoice.service';

const createProjectInvoice = catchAsync(async (req, res) => {
  const response = await ProjectInvoiceServices.createProjectInvoiceIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project invoice created successfully',
    data: response,
  });
});

const getProjectInvoices = catchAsync(async (req, res) => {
  const { data, meta } = await ProjectInvoiceServices.getProjectInvoicesFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project invoices retrieved successfully',
    meta,
    data,
  });
});

const getProjectInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await ProjectInvoiceServices.getProjectInvoiceFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project invoice retrieved successfully',
    data: response,
  });
});

const updateProjectInvoice = catchAsync(async (req, res) => {
  const response = await ProjectInvoiceServices.updateProjectInvoiceInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project invoice updated successfully',
    data: response,
  });
});

const deleteProjectInvoice = catchAsync(async (req, res) => {
  const response = await ProjectInvoiceServices.deleteProjectInvoiceFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project invoice deleted successfully',
    data: response,
  });
});

export const ProjectInvoiceController = {
  createProjectInvoice,
  getProjectInvoices,
  getProjectInvoice,
  updateProjectInvoice,
  deleteProjectInvoice,
};
