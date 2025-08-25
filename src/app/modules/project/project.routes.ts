import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import { ProjectControllers } from './project.controller';
import { ProjectValidation } from './project.validation';

const router = Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
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
 *                 description: Project title
 *                 example: "E-commerce Website"
 *               description:
 *                 type: string
 *                 description: Project description
 *                 example: "Modern e-commerce website with advanced features"
 *               businessStrategy:
 *                 type: string
 *                 description: Business strategy details
 *                 example: "Target young professionals"
 *               visionAndGoal:
 *                 type: string
 *                 description: Vision and goal details
 *                 example: "Become market leader"
 *               operationalAndProcessOptimization:
 *                 type: string
 *                 description: Operational optimization details
 *                 example: "Streamline processes"
 *               projectSolution:
 *                 type: string
 *                 description: Project solution details
 *                 example: "Custom web application"
 *               projectBusinessStrategy:
 *                 type: string
 *                 description: Project business strategy
 *                 example: "Strategic business approach"
 *               client:
 *                 type: string
 *                 description: Client name
 *                 example: "Tech Corp Ltd"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Project start date
 *                 example: "2024-01-15"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Project end date
 *                 example: "2024-06-30"
 *               categoryId:
 *                 type: string
 *                 description: Category ID
 *                 example: "64f5c8b2e4b0f2a3c4d5e6f7"
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Main project image
 *               thumbnailOptional1:
 *                 type: string
 *                 format: binary
 *                 description: Additional project image 1
 *               thumbnailOptional2:
 *                 type: string
 *                 format: binary
 *                 description: Additional project image 2
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  auth([featureNames.projects]),
  imageUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'thumbnailOptional1', maxCount: 1 },
    { name: 'thumbnailOptional2', maxCount: 1 },
  ]),
  uploadImages,
  validation(ProjectValidation.create),
  ProjectControllers.createProject,
);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects with pagination and filtering
 *     tags: [Projects]
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
 *         description: Search term to filter by title, description, or client
 *         example: "website"
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for advanced filtering
 *         example: '{"categoryId": "64f5c8b2e4b0f2a3c4d5e6f7"}'
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: JSON string for sorting
 *         example: '{"createdAt": "desc"}'
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectsListResponse'
 */
router.get('/', ProjectControllers.getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *         example: "64f5c8b2e4b0f2a3c4d5e6f7"
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectResponse'
 *       404:
 *         description: Project not found
 */
router.get('/:id', ProjectControllers.getProject);

/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
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
 *                 description: Project title
 *                 example: "Updated E-commerce Website"
 *               description:
 *                 type: string
 *                 description: Project description
 *                 example: "Updated modern e-commerce website"
 *               businessStrategy:
 *                 type: string
 *                 description: Business strategy details
 *                 example: "Updated strategy"
 *               visionAndGoal:
 *                 type: string
 *                 description: Vision and goal details
 *                 example: "Updated vision"
 *               operationalAndProcessOptimization:
 *                 type: string
 *                 description: Operational optimization details
 *                 example: "Updated optimization"
 *               projectSolution:
 *                 type: string
 *                 description: Project solution details
 *                 example: "Updated solution"
 *               projectBusinessStrategy:
 *                 type: string
 *                 description: Project business strategy
 *                 example: "Updated business strategy"
 *               client:
 *                 type: string
 *                 description: Client name
 *                 example: "Updated Tech Corp Ltd"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Project start date
 *                 example: "2024-02-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Project end date
 *                 example: "2024-07-31"
 *               categoryId:
 *                 type: string
 *                 description: Category ID
 *                 example: "64f5c8b2e4b0f2a3c4d5e6f7"
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Main project image
 *               thumbnailOptional1:
 *                 type: string
 *                 format: binary
 *                 description: Additional project image 1
 *               thumbnailOptional2:
 *                 type: string
 *                 format: binary
 *                 description: Additional project image 2
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.put(
  '/:id',
  auth([featureNames.projects]),
  imageUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'thumbnailOptional1', maxCount: 1 },
    { name: 'thumbnailOptional2', maxCount: 1 },
  ]),
  uploadImages,
  validation(ProjectValidation.update),
  ProjectControllers.updateProject,
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *         example: "64f5c8b2e4b0f2a3c4d5e6f7"
 *     responses:
 *       200:
 *         description: Project deleted successfully
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
 *                   example: "Project deleted successfully!"
 *                 data:
 *                   type: null
 *                   example: null
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.delete(
  '/:id',
  auth([featureNames.projects]),
  ProjectControllers.deleteProject,
);

export const ProjectRoutes = router;
