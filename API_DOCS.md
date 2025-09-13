# News Topics API

This API provides endpoints for managing news topics and users.

## Base URL
```
http://localhost:3001
```

## Endpoints

### Health Check
- **GET** `/health`
- Returns server status

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Users

#### Create User
- **POST** `/users`
- Creates a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "id": "generated-id",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-09-13T05:39:18.232Z",
  "updatedAt": "2025-09-13T05:39:18.232Z"
}
```

#### Get All Users
- **GET** `/users`
- Returns all users

### News Topics

#### Create News Topic
- **POST** `/news/topics`
- Creates a new news topic

**Request Body:**
```json
{
  "title": "Topic Title",
  "description": "Topic description",
  "authorId": "user-id"
}
```

**Response:**
```json
{
  "id": "generated-id",
  "title": "Topic Title",
  "description": "Topic description",
  "authorId": "user-id",
  "createdAt": "2025-09-13T05:39:24.989Z",
  "author": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get All News Topics
- **GET** `/news/topics`
- Returns all news topics sorted by creation date (newest first)

**Response:**
```json
[
  {
    "id": "topic-id",
    "title": "Topic Title",
    "description": "Topic description",
    "authorId": "user-id",
    "createdAt": "2025-09-13T05:39:24.989Z",
    "author": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

## Running the Server

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm run server
   ```

3. For development with auto-restart:
   ```bash
   npm run server:dev
   ```

## Data Storage

The API uses JSON files for data storage located in `server/data/`:
- `users.json` - User data
- `news-topics.json` - News topics data

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error