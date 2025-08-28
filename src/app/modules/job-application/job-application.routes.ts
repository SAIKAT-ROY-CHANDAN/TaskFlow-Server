import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import {
  fileUpload,
  imageUpload,
  uploadImages,
} from '../../middlewares/multer';
import validation from '../../middlewares/validation';
import { JobApplicationValidation } from './job-application.validation';
import { JobApplicationController } from './job-application.controller';

const router = Router();

/**
 * @swagger
 * /job-applications:
 *   post:
 *     tags:
 *       - Job Applications
 *     summary: Create a new job application
 *     description: Submit a new job application with resume upload (public endpoint - no authentication required)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phoneNumber
 *               - address
 *               - gender
 *               - highestEducation
 *               - schoolName
 *               - expectedSalary
 *               - facebookProfile
 *               - jobCircularId
 *               - resume
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the applicant
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the applicant
 *                 example: "john.doe@example.com"
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the applicant
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 description: Address of the applicant
 *                 example: "123 Main St, City, Country"
 *               gender:
 *                 type: string
 *                 description: Gender of the applicant
 *                 example: "Male"
 *               highestEducation:
 *                 type: string
 *                 description: Highest education level
 *                 example: "Bachelor's Degree"
 *               schoolName:
 *                 type: string
 *                 description: Name of the school/university
 *                 example: "University of Example"
 *               expectedSalary:
 *                 type: string
 *                 description: Expected salary
 *                 example: "$50,000"
 *               previousCompany:
 *                 type: string
 *                 description: Previous company (optional)
 *                 example: "Example Corp"
 *               previousPosition:
 *                 type: string
 *                 description: Previous position (optional)
 *                 example: "Software Developer"
 *               coverLetter:
 *                 type: string
 *                 description: Cover letter (optional)
 *                 example: "I am interested in this position because..."
 *               facebookProfile:
 *                 type: string
 *                 description: Facebook profile URL
 *                 example: "https://facebook.com/johndoe"
 *               linkedinProfile:
 *                 type: string
 *                 format: url
 *                 description: LinkedIn profile URL (optional)
 *                 example: "https://linkedin.com/in/johndoe"
 *               githubProfile:
 *                 type: string
 *                 format: url
 *                 description: GitHub profile URL (optional)
 *                 example: "https://github.com/johndoe"
 *               portfolio:
 *                 type: string
 *                 format: url
 *                 description: Portfolio URL (optional)
 *                 example: "https://johndoe.portfolio.com"
 *               jobCircularId:
 *                 type: string
 *                 format: uuid
 *                 description: Job circular ID
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Resume file (PDF or DOC)
 *     responses:
 *       201:
 *         description: Job application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Job application submitted successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 fullName: "John Doe"
 *                 email: "john.doe@example.com"
 *                 phoneNumber: "+1234567890"
 *                 address: "123 Main St, City, Country"
 *                 gender: "Male"
 *                 highestEducation: "Bachelor's Degree"
 *                 schoolName: "University of Example"
 *                 expectedSalary: "$50,000"
 *                 resume: "https://example.com/resume.pdf"
 *                 jobCircularId: "123e4567-e89b-12d3-a456-426614174000"
 *                 jobCircular:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   jobTitle: "Software Developer"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  fileUpload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 },
  ]),
  validation(JobApplicationValidation.create),
  JobApplicationController.createJobApplication,
);

/**
 * @swagger
 * /job-applications:
 *   get:
 *     tags:
 *       - Job Applications
 *     summary: Get all job applications
 *     description: Retrieve a list of all job applications (requires authentication and job management permission)
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
 *         description: Number of job applications per page
 *         example: 10
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search job applications by name, email, or phone
 *         example: "john"
 *     responses:
 *       200:
 *         description: Job applications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Job applications retrieved successfully"
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   fullName: "John Doe"
 *                   email: "john.doe@example.com"
 *                   phoneNumber: "+1234567890"
 *                   address: "123 Main St, City, Country"
 *                   gender: "Male"
 *                   highestEducation: "Bachelor's Degree"
 *                   schoolName: "University of Example"
 *                   expectedSalary: "$50,000"
 *                   resume: "https://example.com/resume.pdf"
 *                   jobCircular:
 *                     id: "123e4567-e89b-12d3-a456-426614174000"
 *                     jobTitle: "Software Developer"
 *                   createdAt: "2025-08-12T10:30:00.000Z"
 *                   updatedAt: "2025-08-12T10:30:00.000Z"
 *               meta:
 *                 totalItems: 50
 *                 totalPages: 5
 *                 currentPage: 1
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
  auth([featureNames.jobManagement]),
  JobApplicationController.getJobApplications,
);

/**
 * @swagger
 * /job-applications/job-circular/{jobCircularId}:
 *   get:
 *     tags:
 *       - Job Applications
 *     summary: Get job applications by job circular
 *     description: Retrieve job applications for a specific job circular (requires authentication and job management permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobCircularId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job Circular ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
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
 *         description: Number of job applications per page
 *         example: 10
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search job applications by name, email, or phone
 *         example: "john"
 *     responses:
 *       200:
 *         description: Job applications by job circular retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Job applications by job circular retrieved successfully"
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   fullName: "John Doe"
 *                   email: "john.doe@example.com"
 *                   phoneNumber: "+1234567890"
 *                   jobCircular:
 *                     id: "123e4567-e89b-12d3-a456-426614174000"
 *                     jobTitle: "Software Developer"
 *               meta:
 *                 totalItems: 10
 *                 totalPages: 1
 *                 currentPage: 1
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 */
router.get(
  '/job-circular/:jobCircularId',
  auth([featureNames.jobManagement]),
  JobApplicationController.getJobApplicationsByJobCircular,
);

/**
 * @swagger
 * /job-applications/{id}:
 *   get:
 *     tags:
 *       - Job Applications
 *     summary: Get a job application by ID
 *     description: Retrieve a specific job application by its ID (requires authentication and job management permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job Application ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Job application retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Job application retrieved successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 fullName: "John Doe"
 *                 email: "john.doe@example.com"
 *                 phoneNumber: "+1234567890"
 *                 address: "123 Main St, City, Country"
 *                 gender: "Male"
 *                 highestEducation: "Bachelor's Degree"
 *                 schoolName: "University of Example"
 *                 expectedSalary: "$50,000"
 *                 previousCompany: "Example Corp"
 *                 previousPosition: "Software Developer"
 *                 resume: "https://example.com/resume.pdf"
 *                 coverLetter: "I am interested in this position because..."
 *                 facebookProfile: "https://facebook.com/johndoe"
 *                 linkedinProfile: "https://linkedin.com/in/johndoe"
 *                 githubProfile: "https://github.com/johndoe"
 *                 portfolio: "https://johndoe.portfolio.com"
 *                 jobCircular:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   jobTitle: "Software Developer"
 *                   jobType: "FULL_TIME"
 *                   experience: 2
 *                   salary: "$50,000 - $70,000"
 *                   deadline: "2025-09-30T23:59:59.000Z"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T10:30:00.000Z"
 *       404:
 *         description: Job application not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 */
router.get(
  '/:id',
  auth([featureNames.jobManagement]),
  JobApplicationController.getJobApplication,
);

/**
 * @swagger
 * /job-applications/{id}:
 *   put:
 *     tags:
 *       - Job Applications
 *     summary: Update a job application
 *     description: Update an existing job application by its ID with optional resume upload (requires authentication and job management permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job Application ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Updated full name
 *                 example: "John Smith"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Updated email address
 *                 example: "john.smith@example.com"
 *               phoneNumber:
 *                 type: string
 *                 description: Updated phone number
 *                 example: "+1234567891"
 *               address:
 *                 type: string
 *                 description: Updated address
 *                 example: "456 New St, City, Country"
 *               gender:
 *                 type: string
 *                 description: Updated gender
 *                 example: "Male"
 *               highestEducation:
 *                 type: string
 *                 description: Updated highest education
 *                 example: "Master's Degree"
 *               schoolName:
 *                 type: string
 *                 description: Updated school name
 *                 example: "University of Advanced Studies"
 *               expectedSalary:
 *                 type: string
 *                 description: Updated expected salary
 *                 example: "$60,000"
 *               previousCompany:
 *                 type: string
 *                 description: Updated previous company
 *                 example: "New Example Corp"
 *               previousPosition:
 *                 type: string
 *                 description: Updated previous position
 *                 example: "Senior Software Developer"
 *               coverLetter:
 *                 type: string
 *                 description: Updated cover letter
 *                 example: "I am very interested in this position because..."
 *               facebookProfile:
 *                 type: string
 *                 description: Updated Facebook profile
 *                 example: "https://facebook.com/johnsmith"
 *               linkedinProfile:
 *                 type: string
 *                 format: url
 *                 description: Updated LinkedIn profile
 *                 example: "https://linkedin.com/in/johnsmith"
 *               githubProfile:
 *                 type: string
 *                 format: url
 *                 description: Updated GitHub profile
 *                 example: "https://github.com/johnsmith"
 *               portfolio:
 *                 type: string
 *                 format: url
 *                 description: Updated portfolio
 *                 example: "https://johnsmith.portfolio.com"
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Updated resume file (optional)
 *     responses:
 *       200:
 *         description: Job application updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Job application updated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 fullName: "John Smith"
 *                 email: "john.smith@example.com"
 *                 phoneNumber: "+1234567891"
 *                 expectedSalary: "$60,000"
 *                 resume: "https://example.com/updated-resume.pdf"
 *                 createdAt: "2025-08-12T10:30:00.000Z"
 *                 updatedAt: "2025-08-12T11:30:00.000Z"
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Job application not found
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 */
router.put(
  '/:id',
  auth([featureNames.jobManagement]),
  imageUpload.single('resume'),
  uploadImages,
  validation(JobApplicationValidation.update),
  JobApplicationController.updateJobApplication,
);

/**
 * @swagger
 * /job-applications/{id}:
 *   delete:
 *     tags:
 *       - Job Applications
 *     summary: Delete a job application
 *     description: Delete an existing job application by its ID (requires authentication and job management permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Job Application ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Job application deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Job application deleted successfully"
 *               data: null
 *       404:
 *         description: Job application not found
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
  auth([featureNames.jobManagement]),
  JobApplicationController.deleteJobApplication,
);

export const JobApplicationRoutes = router;
