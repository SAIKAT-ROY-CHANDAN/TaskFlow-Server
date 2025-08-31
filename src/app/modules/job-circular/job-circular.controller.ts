import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { JobCircularServices } from './job-circular.service';

const createJobCircular = catchAsync(async (req, res) => {
  const response = await JobCircularServices.createJobCircularIntoDB({
    ...req.body,
    deadline: new Date(req.body.deadline).toISOString(),
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Job circular created successfully',
    data: response,
  });
});

const getJobCirculars = catchAsync(async (req, res) => {
  const { meta, data } = await JobCircularServices.getJobCircularsFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job circulars retrieved successfully',
    meta,
    data,
  });
});

const getJobCircular = catchAsync(async (req, res) => {
  const response = await JobCircularServices.getJobCircularFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job circular retrieved successfully',
    data: response,
  });
});

const updateJobCircular = catchAsync(async (req, res) => {
  const response = await JobCircularServices.updateJobCircularIntoDB(
    req.params.id,
    {
      ...req.body,
      ...(req.body.deadline && {
        deadline: new Date(req.body.deadline).toISOString(),
      }),
    },
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job circular updated successfully',
    data: response,
  });
});

const deleteJobCircular = catchAsync(async (req, res) => {
  const response = await JobCircularServices.deleteJobCircularFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job circular deleted successfully',
    data: response,
  });
});

export const JobCircularController = {
  createJobCircular,
  getJobCirculars,
  getJobCircular,
  updateJobCircular,
  deleteJobCircular,
};
