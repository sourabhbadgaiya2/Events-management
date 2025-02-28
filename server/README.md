# Authentication API Documentation

## Register User

Creates a new user account in the system.

### Endpoint

```
POST /api/auth/register
```

### Request Body

| Field    | Type   | Required | Validation Rules                                       |
| -------- | ------ | -------- | ------------------------------------------------------ |
| name     | string | Yes      | Must not be empty                                      |
| email    | string | Yes      | Valid email format, 4-32 characters                    |
| password | string | Yes      | Minimum 6 characters, must contain at least one number |

### Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

**Status Code:** 201 Created

```json
{
  "success": true,
  "message": "User created Successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "_id": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Error Responses

#### Validation Error

**Status Code:** 400 Bad Request

```json
{
  "error": "Password must contain at least 6 characters"
}
```

#### Email Already Exists

**Status Code:** 400 Bad Request

```json
{
  "message": "Email already exists"
}
```

### Status Codes

| Status Code | Description                              |
| ----------- | ---------------------------------------- |
| 201         | User successfully created                |
| 400         | Invalid request body or validation error |
| 500         | Server error                             |

## Login User

Authenticates a user and returns a JWT token.

### Endpoint

```
POST /api/auth/login
```

### Request Body

| Field    | Type   | Required | Validation Rules                                       |
| -------- | ------ | -------- | ------------------------------------------------------ |
| email    | string | Yes      | Valid email format, 4-32 characters                    |
| password | string | Yes      | Minimum 6 characters, must contain at least one number |

### Example Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

**Status Code:** 200 OK

```json
{
  "success": true,
  "message": "User logged in Successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "_id": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Error Responses

#### Invalid Credentials

**Status Code:** 400 Bad Request

```json
{
  "message": "Invalid email or password"
}
```

#### Validation Error

**Status Code:** 400 Bad Request

```json
{
  "error": "Email is required"
}
```

## Logout User

Invalidates the user's JWT token and logs them out.

### Endpoint

```
GET /api/auth/logout
```

### Headers

```
Authorization: Bearer <token>
```

or
Cookie: token=<token>

### Success Response

**Status Code:** 200 OK

```json
{
  "message": "Logged out successfully"
}
```

### Error Responses

#### No Token

**Status Code:** 400 Bad Request

```json
{
  "message": "No token provided"
}
```

#### Invalid Token

**Status Code:** 400 Bad Request

```json
{
  "message": "Invalid token"
}
```

### Status Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 200         | Success                                 |
| 400         | Invalid request or token                |
| 401         | Unauthorized - Token missing or invalid |
| 500         | Server error                            |

## API Endpoints

### User Management

#### Get Current User

```http
GET /api/user/current-user
```

**Authentication:** Bearer Token required

**Success Response:**

```json
{
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Attendee",
    "profilePicture": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "User fetched successfully"
}
```

**Error Response:**

```json
{
  "message": "Unauthorized: No token provided"
}
```

#### Get All Users (Organizer Only)

```http
GET /api/user/get-all-user
```

**Authentication:** Bearer Token required (Organizer role)

**Success Response:**

```json
{
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Attendee",
      "profilePicture": "",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
    // ... more users
  ],
  "message": "User fetched successfully"
}
```

**Error Response:**

```json
{
  "message": "Forbidden! Admin access required."
}
```

#### Update User

```http
PUT /api/user/update-user
```

**Authentication:** Bearer Token required

**Request Body:**

```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "role": "Attendee" // Optional
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "_id": "user_id",
    "name": "Updated Name",
    "email": "newemail@example.com",
    "role": "Attendee",
    "profilePicture": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "No fields to update"
}
```

## Event Management API

### Create Event

```http
POST /api/events/create-event
```

**Authentication:** Bearer Token required (Organizer role only)

**Request Body:**

```json
{
  "name": "Tech Conference 2024",
  "description": "Annual technology conference",
  "organizer": "Tech Corp",
  "guests": ["Speaker 1", "Speaker 2"],
  "address": "123 Tech Street",
  "city": "Silicon Valley",
  "pinCode": 123456,
  "date": "2024-06-15",
  "time": "09:00 AM",
  "media": ["image1.jpg", "image2.jpg"],
  "ticketTypes": [
    {
      "type": "VIP",
      "price": 199.99
    }
  ]
}
```

**Success Response (201):**

```json
{
  "message": "Event Created Successfully",
  "savedEvents": {
    "_id": "event_id",
    "name": "Tech Conference 2024",
    // ... other event details
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

```json
{
  "message": "Event Already Exists"
}
```

### Update Event

```http
PUT /api/events/edit-event/:id
```

**Authentication:** Bearer Token required (Organizer role only)

**Parameters:**

- `id`: Event ID (path parameter)

**Request Body:** (fields to update)

```json
{
  "name": "Updated Tech Conference 2024",
  "description": "Updated description"
}
```

**Success Response (200):**

```json
{
  "message": "Event updated successfully",
  "event": {
    "_id": "event_id",
    "name": "Updated Tech Conference 2024"
    // ... updated event details
  }
}
```

### Delete Event

```http
DELETE /api/events/delete-event/:id
```

**Authentication:** Bearer Token required (Organizer role only)

**Parameters:**

- `id`: Event ID (path parameter)

**Success Response (200):**

```json
{
  "message": "Event deleted successfully"
}
```

### Search Events

```http
GET /api/events/search
```

**Authentication:** Bearer Token required

**Query Parameters:**

- `searchText`: Search term for event name (optional)
- `date`: Filter by specific date (optional)

**Success Response (200):**

```json
{
  "data": [
    {
      "_id": "event_id",
      "name": "Tech Conference 2024"
      // ... event details
    }
    // ... more events
  ]
}
```

### Get Event by ID

```http
GET /api/events/get-event/:id
```

**Authentication:** Bearer Token required

**Parameters:**

- `id`: Event ID (path parameter)

**Success Response (200):**

```json
{
  "data": {
    "_id": "event_id",
    "name": "Tech Conference 2024",
    "description": "Annual technology conference"
    // ... other event details
  }
}
```

**Error Response (404):**

```json
{
  "message": "Event not found"
}
```

### Status Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 200         | Success                                 |
| 201         | Event created successfully              |
| 400         | Bad request or validation error         |
| 401         | Unauthorized - Token missing or invalid |
| 403         | Forbidden - Insufficient permissions    |
| 404         | Event not found                         |
| 500         | Server error                            |
