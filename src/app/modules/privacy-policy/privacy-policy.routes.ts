import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import { PrivacyPolicyController } from './privacy-policy.controller';
import validation from '../../middlewares/validation';
import { PrivacyPolicyValidation } from './privacy-policy.validation';

const router = Router();

/**
 * @swagger
 * /faqs:
 *   post:
 *     tags:
 *       - FAQs
 *     summary: Create a new FAQ
 *     description: Create a new FAQ (requires authentication and faqs permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 description: The FAQ question
 *                 example: "What is Prisma?"
 *               answer:
 *                 type: string
 *                 description: The FAQ answer
 *                 example: "Prisma is a modern ORM for Node.js and TypeScript."
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "FAQ created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 question: "What is Prisma?"
 *                 answer: "Prisma is a modern ORM for Node.js and TypeScript."
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 */
router.post(
  '/',
  auth([featureNames.otherPageSetup]),
  validation(PrivacyPolicyValidation.create),
  PrivacyPolicyController.createPrivacyPolicy,
);

/**
 * @swagger
 * /faqs:
 *   get:
 *     tags:
 *       - FAQs
 *     summary: Get all FAQs
 *     description: Retrieve a list of all FAQs (public endpoint - no authentication required)
 *     responses:
 *       200:
 *         description: FAQs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "FAQs retrieved successfully"
 *               data:
 *                 faqs:
 *                   - id: "123e4567-e89b-12d3-a456-426614174000"
 *                     question: "What is Prisma?"
 *                     answer: "Prisma is a modern ORM for Node.js and TypeScript."
 *                     createdAt: "2025-08-12T10:30:00.000Z"
 *                     updatedAt: "2025-08-12T10:30:00.000Z"
 */
router.get('/', PrivacyPolicyController.getPrivacyPolicy);

/**
 * @swagger
 * /faqs/{id}:
 *   put:
 *     tags:
 *       - FAQs
 *     summary: Update a FAQ
 *     description: Update an existing FAQ by its ID (requires authentication and faqs permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: FAQ ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What is Prisma used for?"
 *               answer:
 *                 type: string
 *                 example: "Prisma is used for database access and migrations."
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 */
router.put(
  '/',
  auth([featureNames.otherPageSetup]),
  validation(PrivacyPolicyValidation.update),
  PrivacyPolicyController.updatePrivacyPolicy,
);

export const PrivacyPolicyRoutes = router;
