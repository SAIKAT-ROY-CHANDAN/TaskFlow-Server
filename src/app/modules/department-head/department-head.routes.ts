import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import validation from '../../middlewares/validation';
import { DepartmentHeadValidation } from './department-head.validation';
import { DepartmentHeadController } from './department-head.controller';

const router = Router();

/**
 * @swagger
 * /department-heads:
 *   post:
 *     tags:
 *       - Department Heads
 *     summary: Create a new department head
 *     description: Create a new department head with profile photo upload (requires authentication and department heads permission)
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
 *               - email
 *               - phone
 *               - designation
 *               - password
 *               - roleId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Department head name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Department head email
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 description: Department head phone number
 *                 example: "+1234567890"
 *               designation:
 *                 type: string
 *                 description: Department head designation
 *                 example: "Software Engineering Manager"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Department head password
 *                 example: "password123"
 *               roleId:
 *                 type: string
 *                 format: uuid
 *                 description: Role ID for the department head
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               linkedinUrl:
 *                 type: string
 *                 format: url
 *                 description: LinkedIn profile URL (optional)
 *                 example: "https://linkedin.com/in/johndoe"
 *               facebookUrl:
 *                 type: string
 *                 format: url
 *                 description: Facebook profile URL (optional)
 *                 example: "https://facebook.com/johndoe"
 *               instagramUrl:
 *                 type: string
 *                 format: url
 *                 description: Instagram profile URL (optional)
 *                 example: "https://instagram.com/johndoe"
 *               xUrl:
 *                 type: string
 *                 format: url
 *                 description: X (Twitter) profile URL (optional)
 *                 example: "https://x.com/johndoe"
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Profile photo file (optional)
 *     responses:
 *       201:
 *         description: Department head created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Department head created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 phone: "+1234567890"
 *                 designation: "Software Engineering Manager"
 *                 roleId: "123e4567-e89b-12d3-a456-426614174001"
 *                 profilePhoto: "https://example.com/profile.jpg"
 *                 linkedinUrl: "https://linkedin.com/in/johndoe"
 *                 role:
 *                   id: "123e4567-e89b-12d3-a456-426614174001"
 *                   name: "Manager"
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
  auth([featureNames.managements]),
  imageUpload.single('profilePhoto'),
  uploadImages,
  validation(DepartmentHeadValidation.create),
  DepartmentHeadController.createDepartmentHead,
);

/**
 * @swagger
 * /department-heads:
 *   get:
 *     tags:
 *       - Department Heads
 *     summary: Get all department heads
 *     description: Retrieve a list of all department heads (public endpoint - no authentication required)
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
 *         description: Number of department heads per page
 *         example: 10
 *       - in: query
 *         name: roleId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter department heads by role ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search department heads by name, email, or designation
 *         example: "john"
 *     responses:
 *       200:
 *         description: Department heads retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Department heads retrieved successfully"
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   phone: "+1234567890"
 *                   designation: "Software Engineering Manager"
 *                   roleId: "123e4567-e89b-12d3-a456-426614174001"
 *                   profilePhoto: "https://example.com/profile.jpg"
 *                   linkedinUrl: "https://linkedin.com/in/johndoe"
 *                   role:
 *                     id: "123e4567-e89b-12d3-a456-426614174001"
 *                     name: "Manager"
 *                   createdAt: "2025-08-12T10:30:00.000Z"
 *                   updatedAt: "2025-08-12T10:30:00.000Z"
 *               meta:
 *                 totalItems: 50
 *                 totalPages: 5
 *                 currentPage: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', DepartmentHeadController.getDepartmentHeads);

/**
 * @swagger
 * /department-heads/role/{roleId}:
 *   get:
 *     tags:
 *       - Department Heads
 *     summary: Get department heads by role
 *     description: Retrieve department heads filtered by role ID (public endpoint - no authentication required)
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Department heads by role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Department heads by role retrieved successfully"
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   phone: "+1234567890"
 *                   designation: "Software Engineering Manager"
 *                   roleId: "123e4567-e89b-12d3-a456-426614174001"
 *                   profilePhoto: "https://example.com/profile.jpg"
 *                   role:
 *                     id: "123e4567-e89b-12d3-a456-426614174001"
 *                     name: "Manager"
 *       404:
 *         description: No department heads found for this role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/role/:roleId', DepartmentHeadController.getDepartmentHeadsByRole);

/**
 * @swagger
 * /department-heads/{id}:
 *   get:
 *     tags:
 *       - Department Heads
 *     summary: Get a department head by ID
 *     description: Retrieve a specific department head by its ID (public endpoint - no authentication required)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Department Head ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Department head retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Department head retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 phone: "+1234567890"
 *                 designation: "Software Engineering Manager"
 *                 roleId: "123e4567-e89b-12d3-a456-426614174001"
 *                 profilePhoto: "https://example.com/profile.jpg"
 *                 linkedinUrl: "https://linkedin.com/in/johndoe"
 *                 facebookUrl: "https://facebook.com/johndoe"
 *                 instagramUrl: "https://instagram.com/johndoe"
 *                 xUrl: "https://x.com/johndoe"
 *                 role:
 *                   id: "123e4567-e89b-12d3-a456-426614174001"
 *                   name: "Manager"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 *       404:
 *         description: Department head not found
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
router.get('/:id', DepartmentHeadController.getDepartmentHead);

/**
 * @swagger
 * /department-heads/{id}:
 *   put:
 *     tags:
 *       - Department Heads
 *     summary: Update a department head
 *     description: Update an existing department head by its ID with optional profile photo upload (requires authentication and department heads permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Department Head ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated department head name
 *                 example: "John Smith"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Updated department head email
 *                 example: "john.smith@example.com"
 *               phone:
 *                 type: string
 *                 description: Updated department head phone number
 *                 example: "+1234567891"
 *               designation:
 *                 type: string
 *                 description: Updated department head designation
 *                 example: "Senior Software Engineering Manager"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Updated department head password
 *                 example: "newpassword123"
 *               roleId:
 *                 type: string
 *                 format: uuid
 *                 description: Updated role ID for the department head
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *               linkedinUrl:
 *                 type: string
 *                 format: url
 *                 description: Updated LinkedIn profile URL (optional)
 *                 example: "https://linkedin.com/in/johnsmith"
 *               facebookUrl:
 *                 type: string
 *                 format: url
 *                 description: Updated Facebook profile URL (optional)
 *                 example: "https://facebook.com/johnsmith"
 *               instagramUrl:
 *                 type: string
 *                 format: url
 *                 description: Updated Instagram profile URL (optional)
 *                 example: "https://instagram.com/johnsmith"
 *               xUrl:
 *                 type: string
 *                 format: url
 *                 description: Updated X (Twitter) profile URL (optional)
 *                 example: "https://x.com/johnsmith"
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Updated profile photo file (optional)
 *     responses:
 *       200:
 *         description: Department head updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Department head updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "John Smith"
 *                 email: "john.smith@example.com"
 *                 phone: "+1234567891"
 *                 designation: "Senior Software Engineering Manager"
 *                 roleId: "123e4567-e89b-12d3-a456-426614174002"
 *                 profilePhoto: "https://example.com/updated-profile.jpg"
 *                 linkedinUrl: "https://linkedin.com/in/johnsmith"
 *                 role:
 *                   id: "123e4567-e89b-12d3-a456-426614174002"
 *                   name: "Senior Manager"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T11:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Department head not found
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
  auth([featureNames.managements]),
  imageUpload.single('profilePhoto'),
  uploadImages,
  validation(DepartmentHeadValidation.update),
  DepartmentHeadController.updateDepartmentHead,
);

/**
 * @swagger
 * /department-heads/{id}:
 *   delete:
 *     tags:
 *       - Department Heads
 *     summary: Delete a department head
 *     description: Delete an existing department head by its ID (requires authentication and department heads permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Department Head ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Department head deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Department head deleted successfully"
 *               data: null
 *       404:
 *         description: Department head not found
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
  '/:id',
  auth([featureNames.managements]),
  DepartmentHeadController.deleteDepartmentHead,
);

export const DepartmentHeadRoutes = router;
