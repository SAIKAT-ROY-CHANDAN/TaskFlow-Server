import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { ClientValidation } from './client.validation';
import { ClientController } from './client.controller';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "ABC Corporation"
 *         email:
 *           type: string
 *           format: email
 *           example: "contact@abc-corp.com"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         address:
 *           type: string
 *           example: "123 Business Street, City, State 12345"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-01T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-01T10:30:00.000Z"
 *         projectInvoices:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               name:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         invoices:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               invoiceId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [NORMAL, UPGRADE, MAINTENANCE]
 *               status:
 *                 type: string
 *               total:
 *                 type: number
 *                 format: decimal
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         _count:
 *           type: object
 *           properties:
 *             projectInvoices:
 *               type: number
 *             invoices:
 *               type: number
 *
 *     CreateClientRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - address
 *       properties:
 *         name:
 *           type: string
 *           description: Client company or individual name
 *           example: "ABC Corporation"
 *         email:
 *           type: string
 *           format: email
 *           description: Client email address
 *           example: "contact@abc-corp.com"
 *         phone:
 *           type: string
 *           description: Client phone number
 *           example: "+1234567890"
 *         address:
 *           type: string
 *           description: Client business address
 *           example: "123 Business Street, City, State 12345"
 *
 *     UpdateClientRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Client company or individual name
 *           example: "ABC Corporation Updated"
 *         email:
 *           type: string
 *           format: email
 *           description: Client email address
 *           example: "new-contact@abc-corp.com"
 *         phone:
 *           type: string
 *           description: Client phone number
 *           example: "+1234567891"
 *         address:
 *           type: string
 *           description: Client business address
 *           example: "456 New Business Street, City, State 12345"
 *
 *     ClientResponse:
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
 *           example: "Client retrieved successfully"
 *         data:
 *           $ref: '#/components/schemas/Client'
 *
 *     ClientsResponse:
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
 *           example: "Clients retrieved successfully"
 *         meta:
 *           type: object
 *           properties:
 *             totalItems:
 *               type: number
 *               example: 50
 *             totalPages:
 *               type: number
 *               example: 5
 *             currentPage:
 *               type: number
 *               example: 1
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Client'
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Create a new client
 *     description: Create a new client with company/individual information (requires authentication and clients permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientRequest'
 *           example:
 *             name: "ABC Corporation"
 *             email: "contact@abc-corp.com"
 *             phone: "+1234567890"
 *             address: "123 Business Street, City, State 12345"
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Client created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "ABC Corporation"
 *                 email: "contact@abc-corp.com"
 *                 phone: "+1234567890"
 *                 address: "123 Business Street, City, State 12345"
 *                 createdAt: "2025-09-01T10:30:00.000Z"
 *                 updatedAt: "2025-09-01T10:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data or duplicate email/phone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Email already exists"
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Insufficient permissions (clients permission required)
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
  auth([featureNames.invoice]),
  validation(ClientValidation.clientValidationSchema),
  ClientController.createClient,
);

/**
 * @swagger
 * /clients:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Get all clients
 *     description: Retrieve a list of all clients with pagination, filtering, and search capabilities (requires authentication and clients permission)
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
 *         description: Search term to filter by name, email, phone, or address
 *         example: "ABC"
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for advanced filtering
 *         example: '{"name": "ABC Corporation"}'
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: JSON string for sorting
 *         example: '{"createdAt": "desc"}'
 *     responses:
 *       200:
 *         description: Clients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientsResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Clients retrieved successfully"
 *               meta:
 *                 totalItems: 50
 *                 totalPages: 5
 *                 currentPage: 1
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   name: "ABC Corporation"
 *                   email: "contact@abc-corp.com"
 *                   phone: "+1234567890"
 *                   address: "123 Business Street, City, State 12345"
 *                   createdAt: "2025-09-01T10:30:00.000Z"
 *                   updatedAt: "2025-09-01T10:30:00.000Z"
 *                   _count:
 *                     projectInvoices: 5
 *                     invoices: 12
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
router.get('/', auth([featureNames.invoice]), ClientController.getClients);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Get a client by ID
 *     description: Retrieve a specific client by its ID with detailed information including projects and invoices (requires authentication and clients permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Client ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Client retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Client retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "ABC Corporation"
 *                 email: "contact@abc-corp.com"
 *                 phone: "+1234567890"
 *                 address: "123 Business Street, City, State 12345"
 *                 createdAt: "2025-09-01T10:30:00.000Z"
 *                 updatedAt: "2025-09-01T10:30:00.000Z"
 *                 projectInvoices:
 *                   - id: "456e7890-f12a-34b5-c678-901234567890"
 *                     name: "E-commerce Website"
 *                     createdAt: "2025-09-01T10:30:00.000Z"
 *                 invoices:
 *                   - id: "789e0123-a45b-67c8-d901-234567890123"
 *                     invoiceId: "INV-2025-001"
 *                     type: "NORMAL"
 *                     status: "DRAFT"
 *                     total: 5000.00
 *                     createdAt: "2025-09-01T10:30:00.000Z"
 *                 _count:
 *                   projectInvoices: 5
 *                   invoices: 12
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
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Client not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', auth([featureNames.invoice]), ClientController.getClient);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     tags:
 *       - Clients
 *     summary: Update a client
 *     description: Update an existing client by its ID (requires authentication and clients permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Client ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClientRequest'
 *           example:
 *             name: "ABC Corporation Updated"
 *             email: "new-contact@abc-corp.com"
 *             phone: "+1234567891"
 *             address: "456 New Business Street, City, State 12345"
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Client updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "ABC Corporation Updated"
 *                 email: "new-contact@abc-corp.com"
 *                 phone: "+1234567891"
 *                 address: "456 New Business Street, City, State 12345"
 *                 createdAt: "2025-09-01T10:30:00.000Z"
 *                 updatedAt: "2025-09-01T11:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data or duplicate email/phone
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
router.put(
  '/:id',
  auth([featureNames.invoice]),
  validation(ClientValidation.updateClientValidationSchema),
  ClientController.updateClient,
);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     tags:
 *       - Clients
 *     summary: Delete a client
 *     description: Delete an existing client by its ID. This will also cascade delete related project invoices and invoices (requires authentication and clients permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Client ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Client deleted successfully
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
 *                   example: "Client deleted successfully"
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
router.delete(
  '/:id',
  auth([featureNames.invoice]),
  ClientController.deleteClient,
);

export const ClientRoutes = router;
