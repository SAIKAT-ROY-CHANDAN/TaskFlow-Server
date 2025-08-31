import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { AboutHOmeServices } from './about-home.service';

const createAboutHome = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = {
    ...req.body,
    numberOfProjects: req.body.numberOfProjects
      ? parseInt(req.body.numberOfProjects, 10)
      : null,
    numberOfClients: req.body.numberOfClients
      ? parseInt(req.body.numberOfClients, 10)
      : null,
    sideImage1: files?.sideImage1?.[0]
      ? getSingleImageUrl(req, files.sideImage1[0])
      : undefined,
    sideImage2: files?.sideImage2?.[0]
      ? getSingleImageUrl(req, files.sideImage2[0])
      : undefined,
    keyPoints: req.body.keyPoints ? JSON.parse(req.body.keyPoints) : [] 
  };

  const response = await AboutHOmeServices.createAboutHomeIntoDB(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'About home created successfully!',
    data: response,
  });
});

const getAboutHome = catchAsync(async (req, res) => {
  const response = await AboutHOmeServices.getAboutHOmeFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'AboutUsHome retrieved successfully',
    data: response,
  });
});


const updateAboutHome = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const payload = {
    ...req.body,
    numberOfProjects: req.body.numberOfProjects
      ? parseInt(req.body.numberOfProjects, 10)
      : null,
    numberOfClients: req.body.numberOfClients
      ? parseInt(req.body.numberOfClients, 10)
      : null,
    sideImage1: files?.sideImage1?.[0]
      ? getSingleImageUrl(req, files.sideImage1[0])
      : undefined,
    sideImage2: files?.sideImage2?.[0]
      ? getSingleImageUrl(req, files.sideImage2[0])
      : undefined,
    keyPoints: req.body.keyPoints ? JSON.parse(req.body.keyPoints) : [] 
  };

  const response = await AboutHOmeServices.updateAboutHomeIntoDB(
    payload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'About lhome updated successfully!',
    data: response,
  });
});



export const AboutHomeControllers = {
  createAboutHome,
  getAboutHome,
  updateAboutHome,
};
