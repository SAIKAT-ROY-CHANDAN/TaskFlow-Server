import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import validation from '../../middlewares/validation';
import { EmployValidation } from './employ.validation';
import { EmployController } from './employ.controller';

const router = Router();

/**
 * @swagger
 * /employs:
 *   post:
 *     tags:
 *       - Employs
 *     summary: Create a new employee
 *     description: Create a new employee with profile photo upload (requires authentication and managements permission)
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
 *             properties:
 *               name:
 *                 type: string
 *                 description: Employee name
 *                 example: "Jane Smith"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Employee email
 *                 example: "jane.smith@example.com"
 *               phone:
 *                 type: string
 *                 description: Employee phone number
 *                 example: "+1234567890"
 *               designation:
 *                 type: string
 *                 description: Employee designation
 *                 example: "Software Developer"
 *               linkedinUrl:
 *                 type: string
 *                 format: url
 *                 description: LinkedIn profile URL (optional)
 *                 example: "https://linkedin.com/in/janesmith"
 *               facebookUrl:
 *                 type: string
 *                 format: url
 *                 description: Facebook profile URL (optional)
 *                 example: "https://facebook.com/janesmith"
 *               instagramUrl:
 *                 type: string
 *                 format: url
 *                 description: Instagram profile URL (optional)
 *                 example: "https://instagram.com/janesmith"
 *               xUrl:
 *                 type: string
 *                 format: url
 *                 description: X (Twitter) profile URL (optional)
 *                 example: "https://x.com/janesmith"
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Profile photo file (optional)
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Employee created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Jane Smith"
 *                 email: "jane.smith@example.com"
 *                 phone: "+1234567890"
 *                 designation: "Software Developer"
 *                 profilePhoto: "https://example.com/profile.jpg"
 *                 linkedinUrl: "https://linkedin.com/in/janesmith"
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
  validation(EmployValidation.create),
  EmployController.createEmploy,
);

/**
 * @swagger
 * /employs:
 *   get:
 *     tags:
 *       - Employs
 *     summary: Get all employees
 *     description: Retrieve a list of all employees (public endpoint - no authentication required)
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
 *         description: Number of employees per page
 *         example: 10
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search employees by name, email, or designation
 *         example: "jane"
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Employees retrieved successfully"
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   name: "Jane Smith"
 *                   email: "jane.smith@example.com"
 *                   phone: "+1234567890"
 *                   designation: "Software Developer"
 *                   profilePhoto: "https://example.com/profile.jpg"
 *                   linkedinUrl: "https://linkedin.com/in/janesmith"
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
router.get('/', EmployController.getEmploys);

/**
 * @swagger
 * /employs/{id}:
 *   get:
 *     tags:
 *       - Employs
 *     summary: Get an employee by ID
 *     description: Retrieve a specific employee by its ID (public endpoint - no authentication required)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Employee ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Employee retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Jane Smith"
 *                 email: "jane.smith@example.com"
 *                 phone: "+1234567890"
 *                 designation: "Software Developer"
 *                 profilePhoto: "https://example.com/profile.jpg"
 *                 linkedinUrl: "https://linkedin.com/in/janesmith"
 *                 facebookUrl: "https://facebook.com/janesmith"
 *                 instagramUrl: "https://instagram.com/janesmith"
 *                 xUrl: "https://x.com/janesmith"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 *       404:
 *         description: Employee not found
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
router.get('/:id', EmployController.getEmploy);

/**
 * @swagger
 * /employs/{id}:
 *   put:
 *     tags:
 *       - Employs
 *     summary: Update an employee
 *     description: Update an existing employee by its ID with optional profile photo upload (requires authentication and managements permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Employee ID
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
 *                 description: Updated employee name
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Updated employee email
 *                 example: "jane.doe@example.com"
 *               phone:
 *                 type: string
 *                 description: Updated employee phone number
 *                 example: "+1234567891"
 *               designation:
 *                 type: string
 *                 description: Updated employee designation
 *                 example: "Senior Software Developer"
 *               linkedinUrl:
 *                 type: string
 *                 format: url
 *                 description: Updated LinkedIn profile URL (optional)
 *                 example: "https://linkedin.com/in/janedoe"
 *               facebookUrl:
 *                 type: string
 *                 format: url
 *                 description: Updated Facebook profile URL (optional)
 *                 example: "https://facebook.com/janedoe"
 *               instagramUrl:
 *                 type: string
 *                 format: url
 *                 description: Updated Instagram profile URL (optional)
 *                 example: "https://instagram.com/janedoe"
 *               xUrl:
 *                 type: string
 *                 format: url
 *                 description: Updated X (Twitter) profile URL (optional)
 *                 example: "https://x.com/janedoe"
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Updated profile photo file (optional)
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Employee updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Jane Doe"
 *                 email: "jane.doe@example.com"
 *                 phone: "+1234567891"
 *                 designation: "Senior Software Developer"
 *                 profilePhoto: "https://example.com/updated-profile.jpg"
 *                 linkedinUrl: "https://linkedin.com/in/janedoe"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T11:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Employee not found
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
  validation(EmployValidation.update),
  EmployController.updateEmploy,
);

/**
 * @swagger
 * /employs/{id}:
 *   delete:
 *     tags:
 *       - Employs
 *     summary: Delete an employee
 *     description: Delete an existing employee by its ID (requires authentication and managements permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Employee ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Employee deleted successfully"
 *               data: null
 *       404:
 *         description: Employee not found
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
  EmployController.deleteEmploy,
);

export const EmployRoutes = router;
