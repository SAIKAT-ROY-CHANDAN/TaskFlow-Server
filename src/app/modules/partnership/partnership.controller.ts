import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { PartnershipServices } from './partnership.service';

const createPartnership = catchAsync(async (req, res) => {
  const logoUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await PartnershipServices.createPartnershipIntoDB({
    ...req.body,
    logo: logoUrl,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Partnership created successfully',
    data: response,
  });
});

const getPartnerships = catchAsync(async (req, res) => {
  const { data, meta } = await PartnershipServices.getPartnershipsFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Partnerships retrieved successfully',
    data,
    meta,
  });
});

const getPartnership = catchAsync(async (req, res) => {
  const response = await PartnershipServices.getPartnershipFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Partnership retrieved successfully',
    data: response,
  });
});

const updatePartnership = catchAsync(async (req, res) => {
  const logoUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await PartnershipServices.updatePartnershipIntoDB(
    req.params.id,
    {
      ...req.body,
      logo: logoUrl,
    },
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Partnership updated successfully',
    data: response,
  });
});

const deletePartnership = catchAsync(async (req, res) => {
  const response = await PartnershipServices.deletePartnershipIntoDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Partnership deleted successfully',
    data: response,
  });
});

export const PartnershipController = {
  createPartnership,
  getPartnerships,
  getPartnership,
  updatePartnership,
  deletePartnership,
};
