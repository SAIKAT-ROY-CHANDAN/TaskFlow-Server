import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { ServiceControllers } from './service.controller';
import { ServiceValidation } from './service.validation';
import { imageUpload, uploadImages } from '../../middlewares/multer';

const router = Router();

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
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
 *               - description
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Service title
 *                 example: "Web Development"
 *               description:
 *                 type: string
 *                 description: Service description
 *                 example: "Professional web development services"
 *               serviceOffer:
 *                 type: string
 *                 description: Service offer details
 *                 example: "Complete web solutions"
 *               serviceSolution:
 *                 type: string
 *                 description: Service solution details
 *                 example: "Custom web applications"
 *               serviceOptimization:
 *                 type: string
 *                 description: Service optimization details
 *                 example: "Performance optimization"
 *               categoryId:
 *                 type: string
 *                 description: Category ID
 *                 example: "uuid"
 *               serviceOfferKeyPoints:
 *                 type: array
 *                 description: Array of service offer key points
 *                 items:
 *                   type: object
 *                   properties:
 *                     point:
 *                       type: string
 *                       example: "Responsive design"
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Service thumbnail image
 *               thumbnailOptional1:
 *                 type: string
 *                 format: binary
 *                 description: Optional thumbnail 1
 *               thumbnailOptional2:
 *                 type: string
 *                 format: binary
 *                 description: Optional thumbnail 2
 *     responses:
 *       201:
 *         description: Service created successfully
 */
router.post(
  '/',
  auth([featureNames.services]),
  imageUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'thumbnailOptional1', maxCount: 1 },
    { name: 'thumbnailOptional2', maxCount: 1 },
  ]),
  uploadImages,
  validation(ServiceValidation.create),
  ServiceControllers.createService,
);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term for services
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of services per page
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON filter object
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: JSON order by object
 *     responses:
 *       200:
 *         description: Services retrieved successfully
 */
router.get('/', ServiceControllers.getServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *       404:
 *         description: Service not found
 */
router.get('/:id', ServiceControllers.getService);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Service title
 *               description:
 *                 type: string
 *                 description: Service description
 *               serviceOffer:
 *                 type: string
 *                 description: Service offer details
 *               serviceSolution:
 *                 type: string
 *                 description: Service solution details
 *               serviceOptimization:
 *                 type: string
 *                 description: Service optimization details
 *               categoryId:
 *                 type: string
 *                 description: Category ID
 *               serviceOfferKeyPoints:
 *                 type: array
 *                 description: Array of service offer key points
 *                 items:
 *                   type: object
 *                   properties:
 *                     point:
 *                       type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Service thumbnail image
 *               thumbnailOptional1:
 *                 type: string
 *                 format: binary
 *                 description: Optional thumbnail 1
 *               thumbnailOptional2:
 *                 type: string
 *                 format: binary
 *                 description: Optional thumbnail 2
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 */
router.put(
  '/:id',
  auth([featureNames.services]),
  imageUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'thumbnailOptional1', maxCount: 1 },
    { name: 'thumbnailOptional2', maxCount: 1 },
  ]),
  uploadImages,
  validation(ServiceValidation.update),
  ServiceControllers.updateService,
);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 */
router.delete(
  '/:id',
  auth([featureNames.services]),
  ServiceControllers.deleteService,
);

export const ServiceRoutes = router;
