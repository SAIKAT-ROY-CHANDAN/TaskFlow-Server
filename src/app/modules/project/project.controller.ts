import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { ProjectServices } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const thumbnails: {
    thumbnail?: string | null;
    thumbnailOptional1?: string | null;
    thumbnailOptional2?: string | null;
  } = {};

  if (files && files['thumbnail'] && files['thumbnail'][0]) {
    thumbnails.thumbnail = getSingleImageUrl(req, files['thumbnail'][0]);
  }

  if (files && files['thumbnailOptional1'] && files['thumbnailOptional1'][0]) {
    thumbnails.thumbnailOptional1 = getSingleImageUrl(
      req,
      files['thumbnailOptional1'][0],
    );
  }

  if (files && files['thumbnailOptional2'] && files['thumbnailOptional2'][0]) {
    thumbnails.thumbnailOptional2 = getSingleImageUrl(
      req,
      files['thumbnailOptional2'][0],
    );
  }

  const payload = {
    ...req.body,
    ...thumbnails,
  };

  const response = await ProjectServices.createProjectIntoDB(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project created successfully!',
    data: response,
  });
});

const getProjects = catchAsync(async (req, res) => {
  const response = await ProjectServices.getProjectsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Projects retrieved successfully!',
    meta: response.meta,
    data: response.data,
  });
});

const getProject = catchAsync(async (req, res) => {
  const response = await ProjectServices.getProjectFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project retrieved successfully!',
    data: response,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const thumbnails: {
    thumbnail?: string | null;
    thumbnailOptional1?: string | null;
    thumbnailOptional2?: string | null;
  } = {};

  if (files && files['thumbnail'] && files['thumbnail'][0]) {
    thumbnails.thumbnail = getSingleImageUrl(req, files['thumbnail'][0]);
  }

  if (files && files['thumbnailOptional1'] && files['thumbnailOptional1'][0]) {
    thumbnails.thumbnailOptional1 = getSingleImageUrl(
      req,
      files['thumbnailOptional1'][0],
    );
  }

  if (files && files['thumbnailOptional2'] && files['thumbnailOptional2'][0]) {
    thumbnails.thumbnailOptional2 = getSingleImageUrl(
      req,
      files['thumbnailOptional2'][0],
    );
  }

  const payload = {
    ...req.body,
    ...thumbnails,
  };

  const response = await ProjectServices.updateProjectIntoDB(
    req.params.id,
    payload,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project updated successfully!',
    data: response,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  await ProjectServices.deleteProjectFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project deleted successfully!',
    data: null,
  });
});

export const ProjectControllers = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
