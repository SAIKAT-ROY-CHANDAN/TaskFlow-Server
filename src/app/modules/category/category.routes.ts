import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { CategoryValidation } from './category.validation';
import { CategoryController } from './category.controller';

const router = Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new category (requires authentication and categories permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *                 example: "Technology"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Category created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Technology"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  auth([featureNames.categories]),
  validation(CategoryValidation.categoryValidationSchema),
  CategoryController.createCategory,
);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     description: Retrieve a list of all categories (requires authentication and categories permission)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Categories retrieved successfully"
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   name: "Technology"
 *                   createdAt: "2025-08-12T10:30:00.000Z"
 *                   updatedAt: "2025-08-12T10:30:00.000Z"
 *                 - id: "123e4567-e89b-12d3-a456-426614174001"
 *                   name: "Design"
 *                   createdAt: "2025-08-12T10:31:00.000Z"
 *                   updatedAt: "2025-08-12T10:31:00.000Z"
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/',
  CategoryController.getCategories,
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get a category by ID
 *     description: Retrieve a specific category by its ID (requires authentication and categories permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Category retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Technology"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/:id',
  auth([featureNames.categories]),
  CategoryController.getCategory,
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update a category
 *     description: Update an existing category by its ID (requires authentication and categories permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated category name
 *                 example: "Updated Technology"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Category updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Updated Technology"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T11:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
  '/:id',
  auth([featureNames.categories]),
  validation(CategoryValidation.categoryValidationSchema),
  CategoryController.updateCategory,
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     description: Delete an existing category by its ID (requires authentication and categories permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Category deleted successfully"
 *               data: null
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict - Category is being used by other resources
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
  '/:id',
  auth([featureNames.categories]),
  CategoryController.deleteCategory,
);

export const CategoryRoutes = router;
