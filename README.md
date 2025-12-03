# Social Activity Feed Backend

A comprehensive social media activity feed backend API built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Live Deployment

**API URL:** https://social-activity-feed-backend-production.up.railway.app

**Status:** Live and Running

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- MongoDB database
- Postman (for testing)

### Installation

```bash
# Install dependencies
npm install

# Create .env file with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## Testing

Import the Postman collection and start testing:

1. **Import Collection:**
   - File: `Social_Activity_Feed_Complete.postman_collection.json`
   - Contains 27 comprehensive test requests

2. **Read Documentation:**
   - `TESTING_GUIDE.md` - Complete testing instructions
   - `SUBMISSION_SUMMARY.md` - Project overview and technical details

3. **Run Tests:**
   - Use Postman Collection Runner
   - Or test individual endpoints manually

## Documentation Files

| File | Description |
|------|-------------|
| `Social_Activity_Feed_Complete.postman_collection.json` | Complete API test suite with role-based testing |
| `TESTING_GUIDE.md` | Comprehensive testing instructions and API reference |
| `SUBMISSION_SUMMARY.md` | Project overview, architecture, and deployment details |
| `README.md` | This file - quick start guide |

## Key Features

- ✅ User authentication (signup/login with JWT)
- ✅ User operations (follow, unfollow, block, unblock)
- ✅ Post management (create, delete, like/unlike)
- ✅ Activity feed with blocking filter
- ✅ Role-based access control (User, Admin, Owner)
- ✅ Secure password hashing
- ✅ TypeScript for type safety
- ✅ Production-ready deployment

## Tech Stack

- **Backend:** Node.js + Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt
- **Security:** Helmet, CORS
- **Deployment:** Railway
- **Database Hosting:** MongoDB Atlas

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:id` - Get profile
- `PUT /api/users/:id/follow` - Follow user
- `PUT /api/users/:id/unfollow` - Unfollow user
- `PUT /api/users/:id/block` - Block user
- `PUT /api/users/:id/unblock` - Unblock user

### Posts
- `POST /api/posts` - Create post
- `DELETE /api/posts/:id` - Delete post
- `PUT /api/posts/:id/like` - Like/Unlike post

### Activity
- `GET /api/activity` - Get activity feed

### Admin
- `DELETE /api/admin/users/:id` - Delete user (admin/owner)
- `PUT /api/admin/users/:id/role` - Update role (owner only)

## Role Hierarchy

```
Owner (Highest)
  └── Can manage all users and roles

Admin (Medium)
  └── Can delete regular users

User (Basic)
  └── Standard social features
```

## Project Structure

```
src/
├── app.ts                 # Express app setup
├── server.ts              # Entry point
├── config/
│   └── db.ts             # Database connection
├── models/               # Mongoose schemas
├── controllers/          # Request handlers
├── middlewares/          # Auth & authorization
├── routes/               # API routes
└── utils/                # Helper functions
```

## Testing the API

### Using Postman (Recommended)

1. Import `Social_Activity_Feed_Complete.postman_collection.json`
2. Run "Setup - Create Test Users" folder first
3. Test other endpoints in any order
4. Check console for detailed logs

### Using cURL

```bash
# Register
curl -X POST https://social-activity-feed-backend-production.up.railway.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"123456"}'

# Login
curl -X POST https://social-activity-feed-backend-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## Assignment Requirements

All requirements have been fully implemented:

- ✅ User authentication system
- ✅ Follow/unfollow users
- ✅ Block users (with activity feed filtering)
- ✅ Create and manage posts
- ✅ Like/unlike posts
- ✅ Activity feed showing all actions
- ✅ Blocked users' activities filtered from feed
- ✅ Role-based authorization (bonus feature)
- ✅ Production deployment
- ✅ Complete API testing suite

## Key Implementations

### 1. Activity Feed with Blocking
```typescript
// Activities from blocked users are automatically filtered
const activities = await Activity.find({
    actor: { $nin: currentUser.blockedUsers }
})
```

### 2. Role-Based Access Control
```typescript
// Middleware checks user role before allowing access
export const authorize = (...roles: string[]) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        next();
    };
};
```

### 3. Smart Like Toggle
```typescript
// Single endpoint handles both like and unlike
if (post.likes.includes(userId)) {
    await post.updateOne({ $pull: { likes: userId } });
} else {
    await post.updateOne({ $push: { likes: userId } });
}
```


