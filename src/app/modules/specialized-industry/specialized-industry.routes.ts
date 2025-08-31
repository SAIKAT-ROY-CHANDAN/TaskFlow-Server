import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import validation from '../../middlewares/validation';
import { SpecializedIndustryValidation } from './specialized-industry.validation';
import { SpecializedIndustryController } from './specialized-industry.controller';

const router = Router();

/**
 * @swagger
 * /specialized-industries:
 *   post:
 *     tags:
 *       - Specialized Industries
 *     summary: Create a new specialized industry
 *     description: Create a new specialized industry with icon image upload (requires authentication and specialized industry permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Specialized industry name
 *                 example: "Healthcare Technology"
 *               description:
 *                 type: string
 *                 description: Detailed description of the specialized industry
 *                 example: "Advanced healthcare solutions and medical technology systems"
 *               icon:
 *                 type: string
 *                 format: binary
 *                 description: Icon image file (optional)
 *     responses:
 *       201:
 *         description: Specialized industry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Specialized industry created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Healthcare Technology"
 *                 description: "Advanced healthcare solutions and medical technology systems"
 *                 icon: "https://example.com/icon.jpg"
 *                 createdAt: "2025-08-31T10:30:00.000Z"
 *                 updatedAt: "2025-08-31T10:30:00.000Z"
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
  auth([featureNames.specializedIndustry]),
  imageUpload.single('icon'),
  uploadImages,
  validation(SpecializedIndustryValidation.create),
  SpecializedIndustryController.createSpecializedIndustry,
);

/**
 * @swagger
 * /specialized-industries:
 *   get:
 *     tags:
 *       - Specialized Industries
 *     summary: Get all specialized industries
 *     description: Retrieve a list of all specialized industries (public endpoint - no authentication required)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of specialized industries per page
 *         example: 10
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search specialized industries by name
 *         example: "healthcare"
 *     responses:
 *       200:
 *         description: Specialized industries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Specialized industries retrieved successfully"
 *               meta:
 *                 totalItems: 25
 *                 totalPages: 3
 *                 currentPage: 1
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   name: "Healthcare Technology"
 *                   description: "Advanced healthcare solutions and medical technology systems"
 *                   icon: "https://example.com/icon.jpg"
 *                   createdAt: "2025-08-31T10:30:00.000Z"
 *                   updatedAt: "2025-08-31T10:30:00.000Z"
 *                 - id: "123e4567-e89b-12d3-a456-426614174001"
 *                   name: "Financial Services"
 *                   description: "Banking and financial technology solutions"
 *                   icon: "https://example.com/icon2.jpg"
 *                   createdAt: "2025-08-31T10:35:00.000Z"
 *                   updatedAt: "2025-08-31T10:35:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', SpecializedIndustryController.getSpecializedIndustries);

/**
 * @swagger
 * /specialized-industries/{id}:
 *   get:
 *     tags:
 *       - Specialized Industries
 *     summary: Get specialized industry by ID
 *     description: Retrieve a single specialized industry by its ID (public endpoint - no authentication required)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Specialized industry ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Specialized industry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Specialized industry retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Healthcare Technology"
 *                 description: "Advanced healthcare solutions and medical technology systems"
 *                 icon: "https://example.com/icon.jpg"
 *                 createdAt: "2025-08-31T10:30:00.000Z"
 *                 updatedAt: "2025-08-31T10:30:00.000Z"
 *       404:
 *         description: Specialized industry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', SpecializedIndustryController.getSpecializedIndustry);

/**
 * @swagger
 * /specialized-industries/{id}:
 *   put:
 *     tags:
 *       - Specialized Industries
 *     summary: Update specialized industry by ID
 *     description: Update an existing specialized industry with optional icon image upload (requires authentication and specialized industry permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Specialized industry ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated specialized industry name
 *                 example: "Updated Healthcare Technology"
 *               description:
 *                 type: string
 *                 description: Updated detailed description
 *                 example: "Updated advanced healthcare solutions and medical technology systems"
 *               icon:
 *                 type: string
 *                 format: binary
 *                 description: Updated icon image file (optional)
 *     responses:
 *       200:
 *         description: Specialized industry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Specialized industry updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Updated Healthcare Technology"
 *                 description: "Updated advanced healthcare solutions and medical technology systems"
 *                 icon: "https://example.com/updated-icon.jpg"
 *                 createdAt: "2025-08-31T10:30:00.000Z"
 *                 updatedAt: "2025-08-31T11:30:00.000Z"
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
 *       404:
 *         description: Specialized industry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
  '/:id',
  auth([featureNames.specializedIndustry]),
  imageUpload.single('icon'),
  uploadImages,
  validation(SpecializedIndustryValidation.update),
  SpecializedIndustryController.updateSpecializedIndustry,
);

/**
 * @swagger
 * /specialized-industries/{id}:
 *   delete:
 *     tags:
 *       - Specialized Industries
 *     summary: Delete specialized industry by ID
 *     description: Delete an existing specialized industry (requires authentication and specialized industry permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Specialized industry ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Specialized industry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Specialized industry deleted successfully"
 *               data: {}
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
 *       404:
 *         description: Specialized industry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
  '/:id',
  auth([featureNames.specializedIndustry]),
  SpecializedIndustryController.deleteSpecializedIndustry,
);

export const SpecializedIndustryRoutes = router;
