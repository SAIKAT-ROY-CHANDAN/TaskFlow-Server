import { Router } from 'express';
import validation from '../../middlewares/validation';
import { AdminContactValidation } from './admin-contact.validation';
import { AdminContactController } from './admin-contact.controller';

const router = Router();

/**
 * @swagger
 * /admin-contacts:
 *   post:
 *     tags:
 *       - Admin Contacts
 *     summary: Create admin contact information
 *     description: Create new admin contact information (requires authentication and admin contact permission)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - email
 *               - address
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Admin contact phone number
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Admin contact email address
 *                 example: "admin@company.com"
 *               address:
 *                 type: string
 *                 description: Admin contact address
 *                 example: "123 Main St, City, Country"
 *               facebookUrl:
 *                 type: string
 *                 format: uri
 *                 description: Facebook page URL (optional)
 *                 example: "https://facebook.com/company"
 *               linkedinUrl:
 *                 type: string
 *                 format: uri
 *                 description: LinkedIn page URL (optional)
 *                 example: "https://linkedin.com/company/company"
 *               instagramUrl:
 *                 type: string
 *                 format: uri
 *                 description: Instagram page URL (optional)
 *                 example: "https://instagram.com/company"
 *               xUrl:
 *                 type: string
 *                 format: uri
 *                 description: X (Twitter) page URL (optional)
 *                 example: "https://x.com/company"
 *               discordUrl:
 *                 type: string
 *                 format: uri
 *                 description: Discord server URL (optional)
 *                 example: "https://discord.gg/company"
 *               googleMapUrl:
 *                 type: string
 *                 format: uri
 *                 description: Google Maps location URL (optional)
 *                 example: "https://maps.google.com/?q=company+location"
 *     responses:
 *       201:
 *         description: Admin contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: "Admin contact created successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 phone: "+1234567890"
 *                 email: "admin@company.com"
 *                 address: "123 Main St, City, Country"
 *                 facebookUrl: "https://facebook.com/company"
 *                 linkedinUrl: "https://linkedin.com/company/company"
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
  // auth([featureNames.otherPageSetup]),
  validation(AdminContactValidation.create),
  AdminContactController.createAdminContact,
);

/**
 * @swagger
 * /admin-contacts:
 *   get:
 *     tags:
 *       - Admin Contacts
 *     summary: Get all admin contact information
 *     description: Retrieve a list of all admin contact information (requires authentication and admin contact permission)
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
 *         description: Number of admin contacts per page
 *         example: 10
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search admin contacts by phone, email, or address
 *         example: "admin@company.com"
 *     responses:
 *       200:
 *         description: Admin contacts retrieved successfully
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
  // auth([featureNames.otherPageSetup]),
  AdminContactController.getAdminContacts,
);


/**
 * @swagger
 * /admin-contacts/{id}:
 *   put:
 *     tags:
 *       - Admin Contacts
 *     summary: Update admin contact information
 *     description: Update existing admin contact information by its ID (requires authentication and admin contact permission)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Admin contact ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Updated admin contact phone number
 *                 example: "+1234567891"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Updated admin contact email address
 *                 example: "newadmin@company.com"
 *               address:
 *                 type: string
 *                 description: Updated admin contact address
 *                 example: "456 New St, New City, Country"
 *               facebookUrl:
 *                 type: string
 *                 format: uri
 *                 description: Updated Facebook page URL
 *                 example: "https://facebook.com/newcompany"
 *               linkedinUrl:
 *                 type: string
 *                 format: uri
 *                 description: Updated LinkedIn page URL
 *                 example: "https://linkedin.com/company/newcompany"
 *               instagramUrl:
 *                 type: string
 *                 format: uri
 *                 description: Updated Instagram page URL
 *                 example: "https://instagram.com/newcompany"
 *               xUrl:
 *                 type: string
 *                 format: uri
 *                 description: Updated X (Twitter) page URL
 *                 example: "https://x.com/newcompany"
 *               discordUrl:
 *                 type: string
 *                 format: uri
 *                 description: Updated Discord server URL
 *                 example: "https://discord.gg/newcompany"
 *               googleMapUrl:
 *                 type: string
 *                 format: uri
 *                 description: Updated Google Maps location URL
 *                 example: "https://maps.google.com/?q=new+company+location"
 *     responses:
 *       200:
 *         description: Admin contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Admin contact not found
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
  // auth([featureNames.otherPageSetup]),
  validation(AdminContactValidation.update),
  AdminContactController.updateAdminContact,
);


export const AdminContactRoutes = router;
