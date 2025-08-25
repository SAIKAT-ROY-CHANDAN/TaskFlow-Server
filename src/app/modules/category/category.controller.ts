import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const response = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category created successfully',
    data: response,
  });
});

const getCategories = catchAsync(async (req, res) => {
  const {data, meta} = await CategoryServices.getCategoriesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categories retrieved successfully',
    meta,
    data,
  });
});

const getCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await CategoryServices.getCategoryFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category retrieved successfully',
    data: response,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const response = await CategoryServices.updateCategoryInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully',
    data: response,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const response = await CategoryServices.deleteCategoryInDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category deleted successfully',
    data: response,
  });
});

export const CategoryController = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
