import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { BannerServices } from './banner.service';

const createBanner = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = {
    ...req.body,
    sideImage1: files?.sideImage1?.[0]
      ? getSingleImageUrl(req, files.sideImage1[0])
      : undefined,
    sideImage2: files?.sideImage2?.[0]
      ? getSingleImageUrl(req, files.sideImage2[0])
      : undefined,
    logo: files?.logo?.[0] ? getSingleImageUrl(req, files.logo[0]) : undefined,
  };
  const response = await BannerServices.createBannerIntoDB(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Banner created successfully!',
    data: response,
  });
});

const getBanners = catchAsync(async (req, res) => {
  const response = await BannerServices.getBannersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Banners retrieved successfully!',
    meta: response.meta,
    data: response.data,
  });
});

const getBanner = catchAsync(async (req, res) => {
  const response = await BannerServices.getBannerFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Banner retrieved successfully!',
    data: response,
  });
});

const updateBanner = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = {
    ...req.body,
    sideImage1: files?.sideImage1?.[0]
      ? getSingleImageUrl(req, files.sideImage1[0])
      : undefined,
    sideImage2: files?.sideImage2?.[0]
      ? getSingleImageUrl(req, files.sideImage2[0])
      : undefined,
    logo: files?.logo?.[0] ? getSingleImageUrl(req, files.logo[0]) : undefined,
  };
  const response = await BannerServices.updateBannerIntoDB(
    payload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Banner updated successfully!',
    data: response,
  });
});

const deleteBanner = catchAsync(async (req, res) => {
  await BannerServices.deleteBannerFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Banner deleted successfully!',
    data: null,
  });
});

export const BannerControllers = {
  createBanner,
  getBanners,
  getBanner,
  updateBanner,
  deleteBanner,
};
