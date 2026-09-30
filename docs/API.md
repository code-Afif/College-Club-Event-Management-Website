# College Club Event Management API

## Base URL
All API endpoints are prefixed with `/api`.

## Global Response Format
The API responds with a standard JSON envelope format:
### Success Envelope
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message",
  "meta": { ... } // Optional pagination or extra metadata
}
```

### Error Envelope
```json
{
  "success": false,
  "error": "Error message",
  "issues": [ ... ] // Optional detailed validation errors (e.g., Zod issues)
}
```

---

## Endpoints

### Events

#### `GET /api/events`
Get a list of all events.
- **Method**: `GET`
- **Response**: Array of event objects.

#### `GET /api/events/:id`
Get a single event by ID.
- **Method**: `GET`
- **Response**: Event object.

#### `POST /api/events/:id/register`
Register for an event.
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "studentId": "S1234567" // optional
  }
  ```
- **Response**: Created registration object.

---

### Admin (Protected Routes)
All admin routes require a Bearer token in the `Authorization` header: `Authorization: Bearer <token>`

#### `POST /api/admin/login`
Authenticate as an admin to receive a token.
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "<ADMIN_EMAIL_ENV_VAR>",
    "password": "<ADMIN_PASSWORD_ENV_VAR>"
  }
  ```
- **Response**: Token string inside `data.token`.

#### `POST /api/admin/events`
Create a new event.
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Hackathon 2024",
    "description": "Annual coding event",
    "date": "2024-10-15T09:00:00.000Z",
    "location": "Main Hall",
    "capacity": 100,
    "imageUrl": "https://example.com/image.jpg"
  }
  ```
- **Response**: Created event object.

#### `PUT /api/admin/events/:id`
Update an existing event.
- **Method**: `PUT`
- **Body**: Same as `POST /api/admin/events`, all fields are optional.
- **Response**: Updated event object.

#### `DELETE /api/admin/events/:id`
Delete an event.
- **Method**: `DELETE`
- **Response**: Null data, success true.

#### `GET /api/admin/events/:id/registrations`
Get all registrations for a specific event.
- **Method**: `GET`
- **Response**: Array of registration objects.
