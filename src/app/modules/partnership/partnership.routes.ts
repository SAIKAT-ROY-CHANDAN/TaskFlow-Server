import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import validation from '../../middlewares/validation';
import { PartnershipValidation } from './partnership.validation';
import { PartnershipController } from './partnership.controller';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Partnership:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the partnership
 *         brandName:
 *           type: string
 *           description: The partnership brand name
 *         url:
 *           type: string
 *           description: The partnership website URL
 *         logo:
 *           type: string
 *           description: The partnership logo image URL
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the partnership was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the partnership was last updated
 */

/**
 * @swagger
 * tags:
 *   name: Partnerships
 *   description: Partnership management API
 */

/**
 * @swagger
 * /api/v1/partnerships:
 *   post:
 *     summary: Create a new partnership
 *     tags: [Partnerships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 description: Partnership brand name
 *                 example: "Tech Solutions Inc"
 *               url:
 *                 type: string
 *                 description: Partnership website URL
 *                 example: "https://techsolutions.com"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Partnership logo image file (optional)
 *     responses:
 *       201:
 *         description: Partnership created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Partnership'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  auth([featureNames.clients]),
  imageUpload.single('logo'),
  uploadImages,
  validation(PartnershipValidation.partnershipValidation),
  PartnershipController.createPartnership,
);

/**
 * @swagger
 * /api/v1/partnerships:
 *   get:
 *     summary: Get all partnerships
 *     tags: [Partnerships]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term
 *     responses:
 *       200:
 *         description: List of partnerships
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Partnership'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: number
 *                     limit:
 *                       type: number
 *                     total:
 *                       type: number
 */
router.get('/', PartnershipController.getPartnerships);

/**
 * @swagger
 * /api/v1/partnerships/{id}:
 *   get:
 *     summary: Get a partnership by ID
 *     tags: [Partnerships]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Partnership ID
 *     responses:
 *       200:
 *         description: Partnership details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Partnership'
 *       404:
 *         description: Partnership not found
 */
router.get('/:id', PartnershipController.getPartnership);

/**
 * @swagger
 * /api/v1/partnerships/{id}:
 *   put:
 *     summary: Update a partnership
 *     tags: [Partnerships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Partnership ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 description: Updated partnership brand name
 *                 example: "Updated Tech Solutions Inc"
 *               url:
 *                 type: string
 *                 description: Updated partnership website URL
 *                 example: "https://updated-techsolutions.com"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Updated partnership logo image file (optional)
 *     responses:
 *       200:
 *         description: Partnership updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Partnership'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Partnership not found
 */
router.put(
  '/:id',
  auth([featureNames.clients]),
  imageUpload.single('logo'),
  uploadImages,
  validation(PartnershipValidation.partnershipValidation),
  PartnershipController.updatePartnership,
);

/**
 * @swagger
 * /api/v1/partnerships/{id}:
 *   delete:
 *     summary: Delete a partnership
 *     tags: [Partnerships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Partnership ID
 *     responses:
 *       200:
 *         description: Partnership deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Partnership not found
 */
router.delete(
  '/:id',
  auth([featureNames.clients]),
  PartnershipController.deletePartnership,
);

export const PartnershipRoutes = router;
