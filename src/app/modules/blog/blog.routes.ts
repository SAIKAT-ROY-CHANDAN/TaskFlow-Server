import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import validation from '../../middlewares/validation';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';

const router = Router();

/**
 * @swagger
 * /blogs:
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Create a new blog
 *     description: Create a new blog with thumbnail image upload (requires authentication and blogs permission)
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
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *                 description: Blog title
 *                 example: "Understanding Modern Web Development"
 *               description:
 *                 type: string
 *                 description: Blog content description
 *                 example: "A comprehensive guide to modern web development practices and technologies"
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *                 description: Category ID for the blog
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image file (optional)
 *               tags:
 *                 type: array
 *                 description: Array of tags for the blog
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "JavaScript"
 *                 example:
 *                   - name: "JavaScript"
 *                   - name: "React"
 *                   - name: "Node.js"
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Blog created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 title: "Understanding Modern Web Development"
 *                 description: "A comprehensive guide to modern web development practices"
 *                 categoryId: "123e4567-e89b-12d3-a456-426614174001"
 *                 thumbnail: "https://example.com/thumbnail.jpg"
 *                 tags:
 *                   - id: "tag-1"
 *                     name: "JavaScript"
 *                   - id: "tag-2"
 *                     name: "React"
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
  auth([featureNames.blogs]),
  imageUpload.single('thumbnail'),
  uploadImages,
  validation(BlogValidation.create),
  BlogController.createBlog,
);

/**
 * @swagger
 * /blogs:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get all blogs
 *     description: Retrieve a list of all blogs (public endpoint - no authentication required)
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
 *         description: Number of blogs per page
 *         example: 10
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter blogs by category ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search blogs by title or description
 *         example: "web development"
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Blogs retrieved successfully"
 *               data:
 *                 blogs:
 *                   - id: "123e4567-e89b-12d3-a456-426614174000"
 *                     title: "Understanding Modern Web Development"
 *                     description: "A comprehensive guide to modern web development practices"
 *                     categoryId: "123e4567-e89b-12d3-a456-426614174001"
 *                     thumbnail: "https://example.com/thumbnail.jpg"
 *                     tags:
 *                       - id: "tag-1"
 *                         name: "JavaScript"
 *                       - id: "tag-2"
 *                         name: "React"
 *                     createdAt: "2025-08-12T10:30:00.000Z"
 *                     updatedAt: "2025-08-12T10:30:00.000Z"
 *                 meta:
 *                   total: 50
 *                   page: 1
 *                   limit: 10
 *                   totalPages: 5
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', BlogController.getBlogs);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get a blog by ID
 *     description: Retrieve a specific blog by its ID (public endpoint - no authentication required)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Blog ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Blog retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 title: "Understanding Modern Web Development"
 *                 description: "A comprehensive guide to modern web development practices and technologies used in the industry today"
 *                 categoryId: "123e4567-e89b-12d3-a456-426614174001"
 *                 thumbnail: "https://example.com/thumbnail.jpg"
 *                 tags:
 *                   - id: "tag-1"
 *                     name: "JavaScript"
 *                   - id: "tag-2"
 *                     name: "React"
 *                   - id: "tag-3"
 *                     name: "Node.js"
 *                 categories:
 *                   id: "123e4567-e89b-12d3-a456-426614174001"
 *                   name: "Technology"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 *       404:
 *         description: Blog not found
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
router.get('/:id', BlogController.getBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     tags:
 *       - Blogs
 *     summary: Update a blog
 *     description: Update an existing blog by its ID with optional thumbnail image upload (requires authentication and blogs permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Blog ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated blog title
 *                 example: "Advanced Modern Web Development"
 *               description:
 *                 type: string
 *                 description: Updated blog content description
 *                 example: "An advanced comprehensive guide to modern web development practices"
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *                 description: Updated category ID for the blog
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Updated thumbnail image file (optional)
 *               tags:
 *                 type: array
 *                 description: Updated array of tags for the blog
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "TypeScript"
 *                 example:
 *                   - name: "TypeScript"
 *                   - name: "Next.js"
 *                   - name: "GraphQL"
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Blog updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 title: "Advanced Modern Web Development"
 *                 description: "An advanced comprehensive guide to modern web development practices"
 *                 categoryId: "123e4567-e89b-12d3-a456-426614174002"
 *                 thumbnail: "https://example.com/updated-thumbnail.jpg"
 *                 tags:
 *                   - id: "tag-1"
 *                     name: "TypeScript"
 *                   - id: "tag-2"
 *                     name: "Next.js"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T11:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Blog not found
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
  auth([featureNames.blogs]),
  imageUpload.single('thumbnail'),
  uploadImages,
  validation(BlogValidation.update),
  BlogController.updateBlog,
);

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     tags:
 *       - Blogs
 *     summary: Delete a blog
 *     description: Delete an existing blog by its ID (requires authentication and blogs permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Blog ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Blog deleted successfully"
 *               data: null
 *       404:
 *         description: Blog not found
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
router.delete('/:id', auth([featureNames.blogs]), BlogController.deleteBlog);

export const BlogRoutes = router;
