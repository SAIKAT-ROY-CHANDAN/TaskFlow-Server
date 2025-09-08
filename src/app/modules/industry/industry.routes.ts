import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { IndustryValidation } from './industry.validation';
import { IndustryController } from './industry.controller';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Industry:
 *       type: object
 *       required:
 *         - name
 *         - slogan
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the industry
 *         name:
 *           type: string
 *           description: Industry name
 *           example: "Healthcare Technology"
 *         slogan:
 *           type: string
 *           description: Industry slogan or tagline
 *           example: "Transforming Healthcare Through Innovation"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the industry was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the industry was last updated
 *         specializedIndustries:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SpecializedIndustry'
 *           description: List of specialized industries under this industry
 *
 *     SpecializedIndustry:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: "Telemedicine"
 *         icon:
 *           type: string
 *           description: Icon URL or path for the specialized industry
 *         description:
 *           type: string
 *           description: Detailed description of the specialized industry
 *         IndustryId:
 *           type: string
 *           format: uuid
 *           description: Reference to the parent industry
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateIndustryRequest:
 *       type: object
 *       required:
 *         - name
 *         - slogan
 *       properties:
 *         name:
 *           type: string
 *           description: Industry name
 *           example: "Financial Technology"
 *         slogan:
 *           type: string
 *           description: Industry slogan or tagline
 *           example: "Revolutionizing Financial Services"
 *
 *     UpdateIndustryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Industry name
 *           example: "Updated Industry Name"
 *         slogan:
 *           type: string
 *           description: Industry slogan or tagline
 *           example: "Updated Industry Slogan"
 */

/**
 * @swagger
 * /api/v1/industries:
 *   post:
 *     tags:
 *       - Industries
 *     summary: Create a new industry
 *     description: Create a new industry with name and slogan (requires authentication and industries permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIndustryRequest'
 *     responses:
 *       201:
 *         description: Industry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Industry'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Industry created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Financial Technology"
 *                 slogan: "Revolutionizing Financial Services"
 *                 createdAt: "2025-09-08T10:30:00.000Z"
 *                 updatedAt: "2025-09-08T10:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Validation Error"
 *               errorDetails:
 *                 issues:
 *                   - code: "invalid_type"
 *                     expected: "string"
 *                     received: "undefined"
 *                     path: ["name"]
 *                     message: "Industry name is required"
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  auth([featureNames.specializedIndustry]),
  validation(IndustryValidation.industryValidationSchema),
  IndustryController.createIndustry,
);

/**
 * @swagger
 * /api/v1/industries:
 *   get:
 *     tags:
 *       - Industries
 *     summary: Get all industries with pagination and filtering
 *     description: Retrieve a paginated list of industries with optional search and filtering capabilities
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term to filter industries by name or slogan
 *         example: "technology"
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for additional filtering options
 *         example: '{"name": "Healthcare"}'
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: JSON string for sorting options
 *         example: '{"name": "asc"}'
 *     responses:
 *       200:
 *         description: Industries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     meta:
 *                       type: object
 *                       properties:
 *                         totalItems:
 *                           type: number
 *                           description: Total number of industries
 *                         totalPages:
 *                           type: number
 *                           description: Total number of pages
 *                         currentPage:
 *                           type: number
 *                           description: Current page number
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Industry'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Industries retrieved successfully"
 *               meta:
 *                 totalItems: 25
 *                 totalPages: 3
 *                 currentPage: 1
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   name: "Healthcare Technology"
 *                   slogan: "Transforming Healthcare Through Innovation"
 *                   createdAt: "2025-09-08T10:30:00.000Z"
 *                   updatedAt: "2025-09-08T10:30:00.000Z"
 *                   specializedIndustries: []
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal server error
 */
router.get(
  '/',
  IndustryController.getIndustries,
);

/**
 * @swagger
 * /api/v1/industries/{id}:
 *   get:
 *     tags:
 *       - Industries
 *     summary: Get a specific industry by ID
 *     description: Retrieve detailed information about a specific industry including its specialized industries
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the industry
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Industry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Industry'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Industry retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Healthcare Technology"
 *                 slogan: "Transforming Healthcare Through Innovation"
 *                 createdAt: "2025-09-08T10:30:00.000Z"
 *                 updatedAt: "2025-09-08T10:30:00.000Z"
 *                 specializedIndustries:
 *                   - id: "456e7890-e89b-12d3-a456-426614174001"
 *                     name: "Telemedicine"
 *                     description: "Remote healthcare services delivery"
 *                     icon: "/icons/telemedicine.svg"
 *       404:
 *         description: Industry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Industry not found"
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal server error
 */
router.get(
  '/:id',
  IndustryController.getIndustry,
);

/**
 * @swagger
 * /api/v1/industries/{id}:
 *   put:
 *     tags:
 *       - Industries
 *     summary: Update an industry
 *     description: Update an existing industry's name and/or slogan (requires authentication and industries permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the industry to update
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateIndustryRequest'
 *     responses:
 *       200:
 *         description: Industry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Industry'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Industry updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Updated Healthcare Technology"
 *                 slogan: "Advanced Healthcare Innovation"
 *                 createdAt: "2025-09-08T10:30:00.000Z"
 *                 updatedAt: "2025-09-08T15:45:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Industry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:id',
  auth([featureNames.specializedIndustry]),
  validation(IndustryValidation.industryUpdateValidationSchema),
  IndustryController.updateIndustry,
);

/**
 * @swagger
 * /api/v1/industries/{id}:
 *   delete:
 *     tags:
 *       - Industries
 *     summary: Delete an industry
 *     description: Permanently delete an industry and all its associated specialized industries (requires authentication and industries permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the industry to delete
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Industry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the deleted industry
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Industry deleted successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Healthcare Technology"
 *                 slogan: "Transforming Healthcare Through Innovation"
 *       404:
 *         description: Industry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Industry not found"
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       409:
 *         description: Conflict - Cannot delete industry with associated specialized industries
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Cannot delete industry with existing specialized industries"
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  auth([featureNames.specializedIndustry]),
  IndustryController.deleteIndustry,
);

export const IndustryRoutes = router;
