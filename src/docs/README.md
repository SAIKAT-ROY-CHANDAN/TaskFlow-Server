# API Documentation Structure

This directory contains the Swagger/OpenAPI documentation for the MNTech Foundation API.

## Structure

```
src/docs/
├── schemas/
│   └── common.yaml          # Common data schemas based on Prisma models
└── modules/
    ├── auth.swagger.ts      # Authentication endpoints documentation
    ├── role.swagger.ts      # Role management endpoints documentation
    └── [module].swagger.ts  # Other module documentation files
```

## Usage

### 1. Swagger UI

Access the interactive API documentation at: `http://localhost:5000/api-docs`

### 2. JSON Specification

Get the raw OpenAPI specification at: `http://localhost:5000/api-docs.json`

## Adding Documentation for New Modules

### Step 1: Create Module Documentation File

Create a new file in `src/docs/modules/[module-name].swagger.ts` with the following structure:

```typescript
/**
 * @swagger
 * tags:
 *   name: [ModuleName]
 *   description: [Module description]
 */

/**
 * @swagger
 * /[route-path]:
 *   [http-method]:
 *     summary: [Endpoint summary]
 *     tags: [[ModuleName]]
 *     security:
 *       - bearerAuth: []  # If authentication required
 *     parameters:
 *       - in: [path|query|header]
 *         name: [parameter-name]
 *         required: [true|false]
 *         schema:
 *           type: [string|number|boolean]
 *         description: [Parameter description]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/[SchemaName]'
 *     responses:
 *       200:
 *         description: [Success description]
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/[ResponseSchema]'
 */
```

### Step 2: Add Schemas to common.yaml

Add any new data models to `src/docs/schemas/common.yaml`:

```yaml
components:
  schemas:
    YourNewModel:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        # ... other properties
```

### Step 3: Update Swagger Config (if needed)

The swagger configuration in `src/app/configs/swagger.config.ts` automatically picks up:

- Route files: `./src/app/modules/**/*.routes.ts`
- Documentation files: `./src/app/modules/**/*.swagger.ts`
- Schema files: `./src/docs/**/*.yaml`

## Documentation Standards

### 1. Tags

- Use consistent tag names that match module names
- Provide clear descriptions for each tag

### 2. Security

- Use `security: []` for public endpoints
- Use `security: [{ bearerAuth: [] }]` for protected endpoints
- Use `security: [{ cookieAuth: [] }]` for cookie-based auth

### 3. Parameters

- Always include parameter descriptions
- Use proper schema types
- Mark required parameters clearly

### 4. Request Bodies

- Reference schemas from common.yaml when possible
- Use proper content types (application/json, multipart/form-data)
- Include examples

### 5. Responses

- Document all possible response codes
- Include error responses using the common Error schema
- Provide clear descriptions

### 6. Schemas

- Keep schemas in sync with Prisma models
- Use consistent property names and types
- Include examples for better understanding

## Common Schema References

- `$ref: '#/components/schemas/Error'` - Standard error response
- `$ref: '#/components/schemas/SuccessResponse'` - Standard success response
- `$ref: '#/components/schemas/PaginatedResponse'` - Paginated data response

## Authentication

The API uses two types of authentication:

1. **bearerAuth**: JWT token in Authorization header
2. **cookieAuth**: JWT refresh token in HTTP-only cookies

## File Uploads

For endpoints with file uploads, use:

```yaml
requestBody:
  required: true
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          file:
            type: string
            format: binary
```

## Next Steps

1. Create documentation files for all remaining modules
2. Add more detailed schemas based on Prisma models
3. Include request/response examples
4. Add validation rules documentation
5. Document error codes and messages
