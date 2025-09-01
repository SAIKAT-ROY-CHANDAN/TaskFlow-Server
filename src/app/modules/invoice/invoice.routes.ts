import { Router } from 'express';
import { InvoiceController } from './invoice.controller';
import validation from '../../middlewares/validation';
import { InvoiceValidation } from './invoice.validation';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     InvoiceItem:
 *       type: object
 *       required:
 *         - title
 *         - total
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the invoice item
 *           example: "Website Development"
 *         total:
 *           type: number
 *           minimum: 0
 *           description: Total amount for this item
 *           example: 1500.00
 *
 *     CreateInvoiceRequest:
 *       type: object
 *       required:
 *         - type
 *         - clientId
 *         - projectId
 *         - issueDate
 *         - dueDate
 *         - bankName
 *         - accountName
 *         - accountNumber
 *         - paymentMethod
 *         - items
 *       properties:
 *         type:
 *           type: string
 *           enum: [NORMAL, UPGRADE, MAINTENANCE]
 *           description: Type of invoice
 *           example: "NORMAL"
 *         clientId:
 *           type: string
 *           format: uuid
 *           description: UUID of the client
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         projectId:
 *           type: string
 *           format: uuid
 *           description: UUID of the project
 *           example: "123e4567-e89b-12d3-a456-426614174001"
 *         issueDate:
 *           type: string
 *           format: date-time
 *           description: Date when invoice was issued
 *           example: "2025-01-15T00:00:00.000Z"
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: Date when payment is due
 *           example: "2025-02-15T00:00:00.000Z"
 *         subtotal:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           description: Subtotal amount before tax and discount
 *           example: 2000.00
 *         tax:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           description: Tax amount
 *           example: 200.00
 *         discount:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           description: Discount amount
 *           example: 100.00
 *         total:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           description: Total amount after tax and discount
 *           example: 2100.00
 *         amountPaid:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           description: Amount already paid
 *           example: 1000.00
 *         balanceDue:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           description: Remaining balance due
 *           example: 1100.00
 *         notes:
 *           type: string
 *           description: Additional notes for the invoice
 *           example: "Payment terms: Net 30 days"
 *         bankName:
 *           type: string
 *           description: Name of the bank for payment
 *           example: "ABC Bank"
 *         accountName:
 *           type: string
 *           description: Name on the bank account
 *           example: "MN Tech Digital"
 *         accountNumber:
 *           type: string
 *           description: Bank account number
 *           example: "1234567890"
 *         branch:
 *           type: string
 *           description: Bank branch (optional)
 *           example: "Main Branch"
 *         paymentMethod:
 *           type: string
 *           enum: [BANK_TRANSFER, BKASH, NAGAD, CASH, CARD]
 *           description: Preferred payment method
 *           example: "BANK_TRANSFER"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InvoiceItem'
 *           minItems: 1
 *           description: List of invoice items
 *
 *     InvoiceResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the invoice
 *         invoiceId:
 *           type: string
 *           description: Human-readable invoice ID
 *           example: "INV-2025-001"
 *         type:
 *           type: string
 *           enum: [NORMAL, UPGRADE, MAINTENANCE]
 *         status:
 *           type: string
 *           description: Current status of the invoice
 *           example: "DRAFT"
 *         issueDate:
 *           type: string
 *           format: date-time
 *         dueDate:
 *           type: string
 *           format: date-time
 *         subtotal:
 *           type: number
 *         tax:
 *           type: number
 *         discount:
 *           type: number
 *         total:
 *           type: number
 *         amountPaid:
 *           type: number
 *         balanceDue:
 *           type: number
 *         notes:
 *           type: string
 *         client:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *         project:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *             description:
 *               type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InvoiceItem'
 *         BankInfo:
 *           type: object
 *           properties:
 *             bankName:
 *               type: string
 *             accountName:
 *               type: string
 *             accountNumber:
 *               type: string
 *             branch:
 *               type: string
 *             paymentMethod:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *         meta:
 *           type: object
 *           properties:
 *             page:
 *               type: number
 *             limit:
 *               type: number
 *             total:
 *               type: number
 *             totalPages:
 *               type: number
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Validation Error"
 *         errorDetails:
 *           type: object
 *         stack:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/invoices:
 *   post:
 *     summary: Create a new invoice
 *     description: Creates a new invoice with client, project, payment info, and items. Supports Prisma transactions for data consistency.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInvoiceRequest'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/InvoiceResponse'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.post(
  '/',
  auth([featureNames.invoice]),
  validation(InvoiceValidation.create),
  InvoiceController.createInvoice,
);

/**
 * @swagger
 * /api/v1/invoices:
 *   get:
 *     summary: Get all invoices with filtering and pagination
 *     description: Retrieve a paginated list of invoices with optional filtering by status, type, client, project, and date range.
 *     tags: [Invoices]
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
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for invoice ID, client name, or project title
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, SENT, PAID, OVERDUE, CANCELLED]
 *         description: Filter by invoice status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [NORMAL, UPGRADE, MAINTENANCE]
 *         description: Filter by invoice type
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by client ID
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by project ID
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *           enum: [BANK_TRANSFER, BKASH, NAGAD, CASH, CARD]
 *         description: Filter by payment method
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter invoices created after this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter invoices created before this date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, dueDate, total, status]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/InvoiceResponse'
 *                     meta:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: number
 *                         limit:
 *                           type: number
 *                         total:
 *                           type: number
 *                         totalPages:
 *                           type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', auth([featureNames.invoice]), InvoiceController.getInvoices);

/**
 * @swagger
 * /api/v1/invoices/{id}:
 *   get:
 *     summary: Get a specific invoice by ID
 *     description: Retrieve detailed information about a specific invoice including client, project, items, and bank information.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the invoice
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/InvoiceResponse'
 *       404:
 *         description: Invoice not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/:id', auth([featureNames.invoice]), InvoiceController.getInvoice);

/**
 * @swagger
 * /api/v1/invoices/{id}:
 *   put:
 *     summary: Update an existing invoice
 *     description: Update invoice details including amounts, dates, items, and bank information. Uses Prisma transactions for consistency.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the invoice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [NORMAL, UPGRADE, MAINTENANCE]
 *               status:
 *                 type: string
 *                 enum: [DRAFT, SENT, PAID, OVERDUE, CANCELLED]
 *               issueDate:
 *                 type: string
 *                 format: date-time
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               subtotal:
 *                 type: number
 *                 minimum: 0
 *               tax:
 *                 type: number
 *                 minimum: 0
 *               discount:
 *                 type: number
 *                 minimum: 0
 *               total:
 *                 type: number
 *                 minimum: 0
 *               amountPaid:
 *                 type: number
 *                 minimum: 0
 *               balanceDue:
 *                 type: number
 *                 minimum: 0
 *               notes:
 *                 type: string
 *               bankName:
 *                 type: string
 *               accountName:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               branch:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [BANK_TRANSFER, BKASH, NAGAD, CASH, CARD]
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/InvoiceItem'
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/InvoiceResponse'
 *       400:
 *         description: Bad request - validation error
 *       404:
 *         description: Invoice not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:id',
  auth([featureNames.invoice]),
  InvoiceController.updateInvoice,
);

/**
 * @swagger
 * /api/v1/invoices/{id}/status:
 *   patch:
 *     summary: Update invoice status
 *     description: Update only the status of an invoice (e.g., from DRAFT to SENT, SENT to PAID, etc.)
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the invoice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [DRAFT, SENT, PAID, OVERDUE, CANCELLED]
 *                 description: New status for the invoice
 *                 example: "SENT"
 *     responses:
 *       200:
 *         description: Invoice status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/InvoiceResponse'
 *       400:
 *         description: Bad request - invalid status
 *       404:
 *         description: Invoice not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.patch(
  '/:id/status',
  auth([featureNames.invoice]),
  InvoiceController.updateInvoiceStatus,
);

/**
 * @swagger
 * /api/v1/invoices/{id}:
 *   delete:
 *     summary: Delete an invoice
 *     description: Permanently delete an invoice and all associated items and bank information. Uses Prisma transactions for data consistency.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the invoice
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
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
 *                           description: ID of the deleted invoice
 *       404:
 *         description: Invoice not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  auth([featureNames.invoice]),
  InvoiceController.deleteInvoice,
);

export const InvoiceRoutes = router;
