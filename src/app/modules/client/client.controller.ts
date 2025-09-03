import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClientServices } from './client.service';

const createClient = catchAsync(async (req, res) => {
  const response = await ClientServices.createClientIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Client created successfully',
    data: response,
  });
});

const getClients = catchAsync(async (req, res) => {
  const { data, meta } = await ClientServices.getClientsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Clients retrieved successfully',
    meta,
    data,
  });
});

const getClient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await ClientServices.getClientFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Client retrieved successfully',
    data: response,
  });
});

const updateClient = catchAsync(async (req, res) => {
  const response = await ClientServices.updateClientInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Client updated successfully',
    data: response,
  });
});

const deleteClient = catchAsync(async (req, res) => {
  const response = await ClientServices.deleteClientFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Client deleted successfully',
    data: response,
  });
});


export const ClientController = {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
};
