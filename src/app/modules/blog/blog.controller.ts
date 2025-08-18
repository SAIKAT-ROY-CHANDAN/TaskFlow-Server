import catchAsync from '../../utils/catchAsync';
import { getSingleImageUrl } from '../../utils/getImageUrl';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const thumbnailUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await BlogServices.createBlogIntoDB({
    ...req.body,
    tags: JSON.parse(req.body.tags || '[]'),
    thumbnail: thumbnailUrl,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: response,
  });
});

const getBlogs = catchAsync(async (req, res) => {
  const { meta, data } = await BlogServices.getBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs retrieved successfully',
    meta,
    data,
  });
});

const getBlog = catchAsync(async (req, res) => {
  const response = await BlogServices.getBlogFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog retrieved successfully',
    data: response,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const thumbnailUrl = req.file ? getSingleImageUrl(req, req.file) : null;

  const response = await BlogServices.updateBlogIntoDB(req.params.id, {
    ...req.body,
    thumbnail: thumbnailUrl,
    tags: JSON.parse(req.body.tags || '[]'),
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: response,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const response = await BlogServices.deleteBlogFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: response,
  });
});

const getTags = catchAsync(async (req, res) => {
  const response = await BlogServices.getTagsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tags retrieved successfully',
    data: response,
  });
});

export const BlogController = {
  createBlog,
  getBlogs,
  getBlog,
  getTags,
  updateBlog,
  deleteBlog,
};
