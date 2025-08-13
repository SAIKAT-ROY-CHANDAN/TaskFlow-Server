import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { SubscriberValidation } from './subscriber.validation';
import { SubscriberController } from './subscriber.controller';

const router = Router();

/**
 * @swagger
 * /subscribers:
 *   post:
 *     tags:
 *       - Subscribers
 *     summary: Subscribe to newsletter
 *     description: Add a new email address to the newsletter subscription list (public endpoint - no authentication required)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to subscribe
 *                 example: "user@example.com"
 *     responses:
 *       201:
 *         description: Successfully subscribed to newsletter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Successfully subscribed to newsletter"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 email: "user@example.com"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict - Email is already subscribed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  validation(SubscriberValidation.create),
  SubscriberController.createSubscriber,
);

/**
 * @swagger
 * /subscribers:
 *   get:
 *     tags:
 *       - Subscribers
 *     summary: Get all subscribers
 *     description: Retrieve a list of all newsletter subscribers (requires authentication and subscribers permission)
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
 *         description: Number of subscribers per page
 *         example: 10
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search subscribers by email
 *         example: "user@example.com"
 *     responses:
 *       200:
 *         description: Subscribers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
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
  auth([featureNames.subscribers]),
  SubscriberController.getSubscribers,
);

/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     tags:
 *       - Subscribers
 *     summary: Get a subscriber by ID
 *     description: Retrieve a specific subscriber by their ID (requires authentication and subscribers permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Subscriber ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Subscriber retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Subscriber not found
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
  auth([featureNames.subscribers]),
  SubscriberController.getSubscriber,
);

/**
 * @swagger
 * /subscribers/{id}:
 *   put:
 *     tags:
 *       - Subscribers
 *     summary: Update a subscriber
 *     description: Update an existing subscriber's email by their ID (requires authentication and subscribers permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Subscriber ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Updated email address
 *                 example: "newemail@example.com"
 *     responses:
 *       200:
 *         description: Subscriber updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request - Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Subscriber not found
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
  auth([featureNames.subscribers]),
  validation(SubscriberValidation.update),
  SubscriberController.updateSubscriber,
);

/**
 * @swagger
 * /subscribers/{id}:
 *   delete:
 *     tags:
 *       - Subscribers
 *     summary: Delete a subscriber
 *     description: Delete an existing subscriber by their ID (requires authentication and subscribers permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Subscriber ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Subscriber deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Subscriber not found
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
router.delete(
  '/:id',
  auth([featureNames.subscribers]),
  SubscriberController.deleteSubscriber,
);

/**
 * @swagger
 * /subscribers/unsubscribe:
 *   post:
 *     tags:
 *       - Subscribers
 *     summary: Unsubscribe from newsletter
 *     description: Remove an email address from the newsletter subscription list (public endpoint - no authentication required)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to unsubscribe
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Successfully unsubscribed from newsletter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request - Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Email not found in subscription list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/unsubscribe',
  validation(SubscriberValidation.create),
  SubscriberController.unsubscribeByEmail,
);

export const SubscriberRoutes = router;
