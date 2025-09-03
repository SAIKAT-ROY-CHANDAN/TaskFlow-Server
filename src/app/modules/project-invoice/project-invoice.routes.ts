import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { ProjectInvoiceValidation } from './project-invoice.validation';
import { ProjectInvoiceController } from './project-invoice.controller';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectInvoice:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "E-commerce Website Development"
 *         message:
 *           type: string
 *           example: "Complete e-commerce solution with payment integration"
 *         clientId:
 *           type: string
 *           format: uuid
 *           example: "456e7890-f12a-34b5-c678-901234567890"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-01T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-01T10:30:00.000Z"
 *         client:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *               example: "ABC Corporation"
 *             email:
 *               type: string
 *               format: email
 *               example: "contact@abc-corp.com"
 *         Invoice:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               invoiceId:
 *                 type: string
 *                 example: "INV-2025-001"
 *               type:
 *                 type: string
 *                 enum: [NORMAL, UPGRADE, MAINTENANCE]
 *               status:
 *                 type: string
 *                 example: "DRAFT"
 *               total:
 *                 type: number
 *                 format: decimal
 *                 example: 5000.00
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         _count:
 *           type: object
 *           properties:
 *             Invoice:
 *               type: number
 *               example: 3
 *
 *     CreateProjectInvoiceRequest:
 *       type: object
 *       required:
 *         - name
 *         - clientId
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the project
 *           example: "E-commerce Website Development"
 *         message:
 *           type: string
 *           description: Optional project description or message
 *           example: "Complete e-commerce solution with payment integration"
 *         clientId:
 *           type: string
 *           format: uuid
 *           description: ID of the client this project belongs to
 *           example: "456e7890-f12a-34b5-c678-901234567890"
 *
 *     UpdateProjectInvoiceRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the project
 *           example: "E-commerce Website Development Updated"
 *         message:
 *           type: string
 *           description: Optional project description or message
 *           example: "Updated project requirements"
 *         clientId:
 *           type: string
 *           format: uuid
 *           description: ID of the client this project belongs to
 *           example: "456e7890-f12a-34b5-c678-901234567890"
 *
 *     ProjectInvoiceResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         statusCode:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: "Project invoice retrieved successfully"
 *         data:
 *           $ref: '#/components/schemas/ProjectInvoice'
 *
 *     ProjectInvoicesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         statusCode:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: "Project invoices retrieved successfully"
 *         meta:
 *           type: object
 *           properties:
 *             totalItems:
 *               type: number
 *               example: 25
 *             totalPages:
 *               type: number
 *               example: 3
 *             currentPage:
 *               type: number
 *               example: 1
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProjectInvoice'
 */

/**
 * @swagger
 * /project-invoices:
 *   post:
 *     tags:
 *       - Project Invoices
 *     summary: Create a new project invoice
 *     description: Create a new project invoice associated with a client (requires authentication and projects permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProjectInvoiceRequest'
 *           example:
 *             name: "E-commerce Website Development"
 *             message: "Complete e-commerce solution with payment integration"
 *             clientId: "456e7890-f12a-34b5-c678-901234567890"
 *     responses:
 *       201:
 *         description: Project invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectInvoiceResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Project invoice created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "E-commerce Website Development"
 *                 message: "Complete e-commerce solution with payment integration"
 *                 clientId: "456e7890-f12a-34b5-c678-901234567890"
 *                 createdAt: "2025-09-01T10:30:00.000Z"
 *                 updatedAt: "2025-09-01T10:30:00.000Z"
 *                 client:
 *                   id: "456e7890-f12a-34b5-c678-901234567890"
 *                   name: "ABC Corporation"
 *                   email: "contact@abc-corp.com"
 *       400:
 *         description: Bad request - Invalid input data or duplicate name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Project name already exists"
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Insufficient permissions (projects permission required)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  '/',
  auth([featureNames.projects]),
  validation(ProjectInvoiceValidation.createProjectInvoiceValidationSchema),
  ProjectInvoiceController.createProjectInvoice,
);

/**
 * @swagger
 * /project-invoices:
 *   get:
 *     tags:
 *       - Project Invoices
 *     summary: Get all project invoices
 *     description: Retrieve a list of all project invoices with pagination, filtering, and search capabilities (requires authentication and projects permission)
 *     security:
 *       - bearerAuth: []
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
 *         description: Number of items per page
 *         example: 10
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term to filter by name or message
 *         example: "Website"
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for advanced filtering
 *         example: '{"clientId": "456e7890-f12a-34b5-c678-901234567890"}'
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: JSON string for sorting
 *         example: '{"createdAt": "desc"}'
 *     responses:
 *       200:
 *         description: Project invoices retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectInvoicesResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Project invoices retrieved successfully"
 *               meta:
 *                 totalItems: 25
 *                 totalPages: 3
 *                 currentPage: 1
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   name: "E-commerce Website Development"
 *                   message: "Complete e-commerce solution"
 *                   clientId: "456e7890-f12a-34b5-c678-901234567890"
 *                   createdAt: "2025-09-01T10:30:00.000Z"
 *                   updatedAt: "2025-09-01T10:30:00.000Z"
 *                   client:
 *                     id: "456e7890-f12a-34b5-c678-901234567890"
 *                     name: "ABC Corporation"
 *                     email: "contact@abc-corp.com"
 *                   _count:
 *                     Invoice: 3
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  '/',
  auth([featureNames.projects]),
  ProjectInvoiceController.getProjectInvoices,
);

/**
 * @swagger
 * /project-invoices/{id}:
 *   get:
 *     tags:
 *       - Project Invoices
 *     summary: Get a project invoice by ID
 *     description: Retrieve a specific project invoice by its ID with detailed information including client and invoices (requires authentication and projects permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Project invoice ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Project invoice retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectInvoiceResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Project invoice retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "E-commerce Website Development"
 *                 message: "Complete e-commerce solution with payment integration"
 *                 clientId: "456e7890-f12a-34b5-c678-901234567890"
 *                 createdAt: "2025-09-01T10:30:00.000Z"
 *                 updatedAt: "2025-09-01T10:30:00.000Z"
 *                 client:
 *                   id: "456e7890-f12a-34b5-c678-901234567890"
 *                   name: "ABC Corporation"
 *                   email: "contact@abc-corp.com"
 *                   phone: "+1234567890"
 *                   address: "123 Business Street, City, State 12345"
 *                 Invoice:
 *                   - id: "789e0123-a45b-67c8-d901-234567890123"
 *                     invoiceId: "INV-2025-001"
 *                     type: "NORMAL"
 *                     status: "DRAFT"
 *                     total: 5000.00
 *                     createdAt: "2025-09-01T10:30:00.000Z"
 *                 _count:
 *                   Invoice: 3
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Project invoice not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Project invoice not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  '/:id',
  auth([featureNames.projects]),
  ProjectInvoiceController.getProjectInvoice,
);

/**
 * @swagger
 * /project-invoices/{id}:
 *   put:
 *     tags:
 *       - Project Invoices
 *     summary: Update a project invoice
 *     description: Update an existing project invoice by its ID (requires authentication and projects permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Project invoice ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProjectInvoiceRequest'
 *           example:
 *             name: "E-commerce Website Development Updated"
 *             message: "Updated project requirements and scope"
 *     responses:
 *       200:
 *         description: Project invoice updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectInvoiceResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Project invoice updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "E-commerce Website Development Updated"
 *                 message: "Updated project requirements and scope"
 *                 clientId: "456e7890-f12a-34b5-c678-901234567890"
 *                 createdAt: "2025-09-01T10:30:00.000Z"
 *                 updatedAt: "2025-09-01T11:30:00.000Z"
 *                 client:
 *                   id: "456e7890-f12a-34b5-c678-901234567890"
 *                   name: "ABC Corporation"
 *                   email: "contact@abc-corp.com"
 *       400:
 *         description: Bad request - Invalid input data or duplicate name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Project invoice not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
  '/:id',
  auth([featureNames.projects]),
  validation(ProjectInvoiceValidation.updateProjectInvoiceValidationSchema),
  ProjectInvoiceController.updateProjectInvoice,
);

/**
 * @swagger
 * /project-invoices/{id}:
 *   delete:
 *     tags:
 *       - Project Invoices
 *     summary: Delete a project invoice
 *     description: Delete an existing project invoice by its ID. This will also cascade delete all related invoices (requires authentication and projects permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Project invoice ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Project invoice deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Project invoice deleted successfully"
 *                 data:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Project invoice not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete(
  '/:id',
  auth([featureNames.projects]),
  ProjectInvoiceController.deleteProjectInvoice,
);

export const ProjectInvoiceRoutes = router;
