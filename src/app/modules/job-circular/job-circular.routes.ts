import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { JobCircularValidation } from './job-circular.validation';
import { JobCircularController } from './job-circular.controller';

const router = Router();

/**
 * @swagger
 * /job-circulars:
 *   post:
 *     tags:
 *       - Job Circulars
 *     summary: Create a new job circular
 *     description: Create a new job circular (requires authentication and job management permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobTitle
 *               - jobType
 *               - whatYouWillDo
 *               - jobResponsibilities
 *               - experienceRequired
 *               - additionalRequirements
 *               - experience
 *               - workingHours
 *               - workingDays
 *               - salary
 *               - vacancy
 *               - deadline
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 description: Job title
 *                 example: "Senior Software Engineer"
 *               jobType:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, FREELANCE, TEMPORARY, VOLUNTEER, APPRENTICESHIP]
 *                 description: Type of job
 *                 example: "FULL_TIME"
 *               whatYouWillDo:
 *                 type: string
 *                 description: Description of what the candidate will do
 *                 example: "Develop and maintain web applications using modern technologies"
 *               jobResponsibilities:
 *                 type: string
 *                 description: Job responsibilities
 *                 example: "Write clean code, collaborate with team, participate in code reviews"
 *               experienceRequired:
 *                 type: string
 *                 description: Experience requirements
 *                 example: "3+ years of experience in software development"
 *               additionalRequirements:
 *                 type: string
 *                 description: Additional requirements
 *                 example: "Bachelor's degree in Computer Science or related field"
 *               experience:
 *                 type: integer
 *                 minimum: 0
 *                 description: Years of experience required
 *                 example: 3
 *               workingHours:
 *                 type: integer
 *                 minimum: 1
 *                 description: Working hours per day
 *                 example: 8
 *               workingDays:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 7
 *                 description: Working days per week
 *                 example: 5
 *               salary:
 *                 type: string
 *                 description: Salary range
 *                 example: "$50,000 - $70,000"
 *               vacancy:
 *                 type: integer
 *                 minimum: 1
 *                 description: Number of vacancies
 *                 example: 2
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: Application deadline
 *                 example: "2025-12-31T23:59:59.000Z"
 *     responses:
 *       201:
 *         description: Job circular created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Job circular created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 jobTitle: "Senior Software Engineer"
 *                 jobType: "FULL_TIME"
 *                 whatYouWillDo: "Develop and maintain web applications"
 *                 experience: 3
 *                 salary: "$50,000 - $70,000"
 *                 vacancy: 2
 *                 deadline: "2025-12-31T23:59:59.000Z"
 *                 createdAt: "2025-08-25T10:30:00.000Z"
 *                 updatedAt: "2025-08-25T10:30:00.000Z"
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
  auth([featureNames.jobManagement]),
  validation(JobCircularValidation.create),
  JobCircularController.createJobCircular,
);

/**
 * @swagger
 * /job-circulars:
 *   get:
 *     tags:
 *       - Job Circulars
 *     summary: Get all job circulars
 *     description: Retrieve a list of all job circulars (public endpoint - no authentication required)
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
 *         description: Number of job circulars per page
 *         example: 10
 *       - in: query
 *         name: jobType
 *         schema:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, FREELANCE, TEMPORARY, VOLUNTEER, APPRENTICESHIP]
 *         description: Filter job circulars by job type
 *         example: "FULL_TIME"
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search job circulars by job title, type, or salary
 *         example: "software engineer"
 *     responses:
 *       200:
 *         description: Job circulars retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Job circulars retrieved successfully"
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   jobTitle: "Senior Software Engineer"
 *                   jobType: "FULL_TIME"
 *                   experience: 3
 *                   salary: "$50,000 - $70,000"
 *                   vacancy: 2
 *                   deadline: "2025-12-31T23:59:59.000Z"
 *                   createdAt: "2025-08-25T10:30:00.000Z"
 *               meta:
 *                 totalItems: 50
 *                 totalPages: 5
 *                 currentPage: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', JobCircularController.getJobCirculars);

/**
 * @swagger
 * /job-circulars/{id}:
 *   get:
 *     tags:
 *       - Job Circulars
 *     summary: Get a job circular by ID
 *     description: Retrieve a specific job circular by its ID (public endpoint - no authentication required)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job Circular ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Job circular retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Job circular retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 jobTitle: "Senior Software Engineer"
 *                 jobType: "FULL_TIME"
 *                 whatYouWillDo: "Develop and maintain web applications using modern technologies"
 *                 jobResponsibilities: "Write clean code, collaborate with team, participate in code reviews"
 *                 experienceRequired: "3+ years of experience in software development"
 *                 additionalRequirements: "Bachelor's degree in Computer Science or related field"
 *                 experience: 3
 *                 workingHours: 8
 *                 workingDays: 5
 *                 salary: "$50,000 - $70,000"
 *                 vacancy: 2
 *                 deadline: "2025-12-31T23:59:59.000Z"
 *                 createdAt: "2025-08-25T10:30:00.000Z"
 *                 updatedAt: "2025-08-25T10:30:00.000Z"
 *       404:
 *         description: Job circular not found
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
router.get('/:id', JobCircularController.getJobCircular);

/**
 * @swagger
 * /job-circulars/{id}:
 *   put:
 *     tags:
 *       - Job Circulars
 *     summary: Update a job circular
 *     description: Update an existing job circular by its ID (requires authentication and job management permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job Circular ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 description: Updated job title
 *                 example: "Lead Software Engineer"
 *               jobType:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, FREELANCE, TEMPORARY, VOLUNTEER, APPRENTICESHIP]
 *                 description: Updated job type
 *                 example: "FULL_TIME"
 *               whatYouWillDo:
 *                 type: string
 *                 description: Updated description of what the candidate will do
 *                 example: "Lead development team and architect solutions"
 *               jobResponsibilities:
 *                 type: string
 *                 description: Updated job responsibilities
 *                 example: "Lead team, mentor developers, design architecture"
 *               experienceRequired:
 *                 type: string
 *                 description: Updated experience requirements
 *                 example: "5+ years of experience in software development"
 *               additionalRequirements:
 *                 type: string
 *                 description: Updated additional requirements
 *                 example: "Master's degree preferred, leadership experience required"
 *               experience:
 *                 type: integer
 *                 minimum: 0
 *                 description: Updated years of experience required
 *                 example: 5
 *               workingHours:
 *                 type: integer
 *                 minimum: 1
 *                 description: Updated working hours per day
 *                 example: 8
 *               workingDays:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 7
 *                 description: Updated working days per week
 *                 example: 5
 *               salary:
 *                 type: string
 *                 description: Updated salary range
 *                 example: "$70,000 - $90,000"
 *               vacancy:
 *                 type: integer
 *                 minimum: 1
 *                 description: Updated number of vacancies
 *                 example: 1
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: Updated application deadline
 *                 example: "2026-01-31T23:59:59.000Z"
 *     responses:
 *       200:
 *         description: Job circular updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Job circular updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 jobTitle: "Lead Software Engineer"
 *                 jobType: "FULL_TIME"
 *                 experience: 5
 *                 salary: "$70,000 - $90,000"
 *                 vacancy: 1
 *                 deadline: "2026-01-31T23:59:59.000Z"
 *                 createdAt: "2025-08-25T10:30:00.000Z"
 *                 updatedAt: "2025-08-25T11:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Job circular not found
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
  auth([featureNames.jobManagement]),
  validation(JobCircularValidation.update),
  JobCircularController.updateJobCircular,
);

/**
 * @swagger
 * /job-circulars/{id}:
 *   delete:
 *     tags:
 *       - Job Circulars
 *     summary: Delete a job circular
 *     description: Delete an existing job circular by its ID (requires authentication and job management permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job Circular ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Job circular deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Job circular deleted successfully"
 *               data: null
 *       404:
 *         description: Job circular not found
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
router.delete(
  '/:id',
  auth([featureNames.jobManagement]),
  JobCircularController.deleteJobCircular,
);

export const JobCircularRoutes = router;
