import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import { imageUpload, uploadImages } from '../../middlewares/multer';
import validation from '../../middlewares/validation';
import { TestimonialController } from './testimonial.controller';
import { TestimonialValidation } from './testimonial.validation';

const router = Router();


/**
 * @swagger
 * /testimonials:
 *   post:
 *     tags:
 *       - Testimonials
 *     summary: Create a new testimonial
 *     description: Create a new testimonial with optional profilePhoto image upload (requires authentication and testimonials permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - rating
 *             properties:
 *               name:
 *                 type: string
 *                 description: Person's name
 *                 example: "John Doe"
 *               description:
 *                 type: string
 *                 description: Testimonial content
 *                 example: "This product has completely transformed our workflow!"
 *               designation:
 *                 type: string
 *                 description: Person's designation (optional)
 *                 example: "Software Engineer"
 *               rating:
 *                 type: string
 *                 description: Rating from 1 to 5 (string in request, converted to number)
 *                 example: "5"
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Profile photo upload (optional)
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Testimonial created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "John Doe"
 *                 description: "This product has completely transformed our workflow!"
 *                 designation: "Software Engineer"
 *                 rating: 5
 *                 profilePhoto: "https://example.com/profilePhoto.jpg"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 */
router.post(
  '/',
  auth([featureNames.testimonials]),
  imageUpload.single('profilePhoto'),
  uploadImages,
  validation(TestimonialValidation.create),
  TestimonialController.createTestimonial,
);

/**
 * @swagger
 * /testimonials:
 *   get:
 *     tags:
 *       - Testimonials
 *     summary: Get all testimonials
 *     description: Retrieve a list of all testimonials (public endpoint - no authentication required)
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
 *         description: Number of testimonials per page
 *         example: 10
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search testimonials by name or description
 *         example: "great product"
 *     responses:
 *       200:
 *         description: Testimonials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Testimonials retrieved successfully"
 *               data:
 *                 testimonials:
 *                   - id: "123e4567-e89b-12d3-a456-426614174000"
 *                     name: "John Doe"
 *                     description: "This product has completely transformed our workflow!"
 *                     designation: "Software Engineer"
 *                     rating: 5
 *                     profilePhoto: "https://example.com/profilePhoto.jpg"
 *                     createdAt: "2025-08-12T10:30:00.000Z"
 *                     updatedAt: "2025-08-12T10:30:00.000Z"
 *                 meta:
 *                   total: 50
 *                   page: 1
 *                   limit: 10
 *                   totalPages: 5
 */
router.get('/', TestimonialController.getAllTestimonial);

/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     tags:
 *       - Testimonials
 *     summary: Get a testimonial by ID
 *     description: Retrieve a specific testimonial by its ID (public endpoint - no authentication required)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Testimonial ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Testimonial retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Testimonial retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "John Doe"
 *                 description: "This product has completely transformed our workflow!"
 *                 designation: "Software Engineer"
 *                 rating: 5
 *                 profilePhoto: "https://example.com/profilePhoto.jpg"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 */
router.get('/:id', TestimonialController.getSingleTestimonial);

/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     tags:
 *       - Testimonials
 *     summary: Update a testimonial
 *     description: Update an existing testimonial by its ID with optional profilePhoto image upload (requires authentication and testimonials permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Testimonial ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated person's name
 *                 example: "Jane Smith"
 *               description:
 *                 type: string
 *                 description: Updated testimonial content
 *                 example: "This service is outstanding and exceeded expectations!"
 *               designation:
 *                 type: string
 *                 description: Updated designation
 *                 example: "Product Manager"
 *               rating:
 *                 type: string
 *                 description: Updated rating (string in request, converted to number)
 *                 example: "4"
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Updated profile photo image file (optional)
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Testimonial updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Jane Smith"
 *                 description: "This service is outstanding and exceeded expectations!"
 *                 designation: "Product Manager"
 *                 rating: 4
 *                 profilePhoto: "https://example.com/updated-profilePhoto.jpg"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T11:30:00.000Z"
 */
router.put(
  '/:id',
  auth([featureNames.testimonials]),
  imageUpload.single('profilePhoto'),
  uploadImages,
  validation(TestimonialValidation.update),
  TestimonialController.updateTestimonial,
);
/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     tags:
 *       - Testimonials
 *     summary: Delete a testimonial
 *     description: Delete an existing testimonial by its ID (requires authentication and testimonials permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Testimonial ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Testimonial deleted successfully"
 *               data: null
 */
router.delete('/:id', auth([featureNames.testimonials]), TestimonialController.deleteTestimonial);

export const TestimonialRoutes = router;
