import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import { BannerControllers } from './banner.controller';
import { BannerValidation } from './banner.validation';

const router = Router();

/**
 * @swagger
 * /api/banners:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subTitle
 *             properties:
 *               title:
 *                 type: string
 *                 description: Banner title
 *                 example: "Welcome to Our Company"
 *               subTitle:
 *                 type: string
 *                 description: Banner subtitle
 *                 example: "We provide amazing services"
 *               description:
 *                 type: string
 *                 description: Banner description
 *                 example: "Detailed description of our services and offerings"
 *               sideImage1:
 *                 type: string
 *                 format: binary
 *                 description: First side image
 *               sideImage2:
 *                 type: string
 *                 format: binary
 *                 description: Second side image
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Company logo
 *     responses:
 *       201:
 *         description: Banner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  auth([featureNames.otherPageSetup]),
  imageUpload.fields([
    { name: 'sideImage1', maxCount: 1 },
    { name: 'sideImage2', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    {name: "logo2", maxCount: 1},
  ]),
  uploadImages,
  validation(BannerValidation.create),
  BannerControllers.createBanner,
);

/**
 * @swagger
 * /api/banners:
 *   get:
 *     summary: Get all banners with pagination and filtering
 *     tags: [Banners]
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
 *         description: Search term to filter by title, subTitle, or description
 *         example: "welcome"
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for advanced filtering
 *         example: '{}'
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: JSON string for sorting
 *         example: '{"createdAt": "desc"}'
 *     responses:
 *       200:
 *         description: Banners retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannersListResponse'
 */
router.get('/', BannerControllers.getBanners);

/**
 * @swagger
 * /api/banners/{id}:
 *   get:
 *     summary: Get a banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *         example: "64f5c8b2e4b0f2a3c4d5e6f7"
 *     responses:
 *       200:
 *         description: Banner retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerResponse'
 *       404:
 *         description: Banner not found
 */
router.get('/details', BannerControllers.getBanner);

/**
 * @swagger
 * /api/banners/{id}:
 *   patch:
 *     summary: Update a banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *         example: "64f5c8b2e4b0f2a3c4d5e6f7"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Banner title
 *                 example: "Updated Welcome Message"
 *               subTitle:
 *                 type: string
 *                 description: Banner subtitle
 *                 example: "Updated subtitle"
 *               description:
 *                 type: string
 *                 description: Banner description
 *                 example: "Updated description"
 *               sideImage1:
 *                 type: string
 *                 format: binary
 *                 description: First side image
 *               sideImage2:
 *                 type: string
 *                 format: binary
 *                 description: Second side image
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Company logo
 *     responses:
 *       200:
 *         description: Banner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Banner not found
 */
router.put(
  '/',
  auth([featureNames.otherPageSetup]),
  imageUpload.fields([
    { name: 'sideImage1', maxCount: 1 },
    { name: 'sideImage2', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    {name: "logo2", maxCount: 1},
  ]),
  uploadImages,
  validation(BannerValidation.update),
  BannerControllers.updateBanner,
);

/**
 * @swagger
 * /api/banners/{id}:
 *   delete:
 *     summary: Delete a banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *         example: "64f5c8b2e4b0f2a3c4d5e6f7"
 *     responses:
 *       200:
 *         description: Banner deleted successfully
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
 *                   example: "Banner deleted successfully!"
 *                 data:
 *                   type: null
 *                   example: null
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Banner not found
 */
router.delete(
  '/:id',
  auth([featureNames.otherPageSetup]),
  BannerControllers.deleteBanner,
);

export default router;
