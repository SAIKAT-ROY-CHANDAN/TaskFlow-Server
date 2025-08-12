import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubscriberServices } from './subscriber.service';

const createSubscriber = catchAsync(async (req, res) => {
  const response = await SubscriberServices.createSubscriberIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Successfully subscribed to newsletter',
    data: response,
  });
});

const getSubscribers = catchAsync(async (req, res) => {
  const { meta, data } = await SubscriberServices.getSubscribersFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscribers retrieved successfully',
    meta,
    data,
  });
});

const getSubscriber = catchAsync(async (req, res) => {
  const response = await SubscriberServices.getSubscriberFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscriber retrieved successfully',
    data: response,
  });
});

const updateSubscriber = catchAsync(async (req, res) => {
  const response = await SubscriberServices.updateSubscriberIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscriber updated successfully',
    data: response,
  });
});

const deleteSubscriber = catchAsync(async (req, res) => {
  const response = await SubscriberServices.deleteSubscriberFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscriber deleted successfully',
    data: response,
  });
});

const unsubscribeByEmail = catchAsync(async (req, res) => {
  const response = await SubscriberServices.unsubscribeByEmailFromDB(
    req.body.email,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully unsubscribed from newsletter',
    data: response,
  });
});

export const SubscriberController = {
  createSubscriber,
  getSubscribers,
  getSubscriber,
  updateSubscriber,
  deleteSubscriber,
  unsubscribeByEmail,
};
