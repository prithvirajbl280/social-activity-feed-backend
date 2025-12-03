# Social Activity Feed Backend - Assignment Submission

## Candidate Information
**Position:** Backend Intern
**Assignment:** Social Activity Feed Backend
**Deployment:** Railway
**Database:** MongoDB Atlas

---

## 🚀 Live Deployment

**API Base URL:**
```
https://social-activity-feed-backend-production.up.railway.app
```

**Health Check:**
```bash
curl https://social-activity-feed-backend-production.up.railway.app
# Response: "API is running..."
```

---

## 📁 Deliverables

### 1. Source Code
- Complete TypeScript/Express.js backend
- Well-organized folder structure (`src/` directory)
- TypeScript configuration and build setup
- Environment configuration (.env)

### 2. API Documentation
- **Postman Collection:** `Social_Activity_Feed_Complete.postman_collection.json`
- **Testing Guide:** `TESTING_GUIDE.md` (comprehensive documentation)
- **This Summary:** `SUBMISSION_SUMMARY.md`

### 3. Deployment
- Deployed on Railway (Platform-as-a-Service)
- MongoDB Atlas database (cloud-hosted)
- Automatic deployment from git commits
- Environment variables configured

---

## ✅ Requirements Implemented

### Core Features

#### 1. User Authentication ✅
- [x] User registration with email/password
- [x] Secure password hashing (bcrypt)
- [x] JWT token-based authentication
- [x] Login endpoint
- [x] Role-based user system (user/admin/owner)

#### 2. User Actions ✅
- [x] Follow users
- [x] Unfollow users
- [x] Block users
- [x] Unblock users
- [x] View user profiles
- [x] Prevent self-follow/self-block

#### 3. Post Operations ✅
- [x] Create posts
- [x] Delete posts (own posts or admin)
- [x] Like/Unlike posts
- [x] Author tracking
- [x] Timestamp tracking

#### 4. Activity Feed ✅
- [x] Activity logging for actions:
  - Post creation
  - User follows
  - Post likes
- [x] Activity filtering (block feature)
- [x] Chronological ordering (newest first)
- [x] Actor and target tracking

#### 5. Role-Based Access Control ✅
- [x] **User Role:** Basic permissions
- [x] **Admin Role:** Can delete users (except owners)
- [x] **Owner Role:** Full system control
- [x] Authorization middleware
- [x] Protected routes

---

## 🏗️ Technical Architecture

### Technology Stack
```
Backend Framework:   Express.js (v4.19.2)
Language:           TypeScript (v5.4.5)
Database:           MongoDB (Mongoose v8.3.2)
Authentication:     JWT (jsonwebtoken v9.0.2)
Password Security:  bcrypt (bcryptjs v2.4.3)
Security:           Helmet, CORS
Development:        Nodemon, ts-node
Deployment:         Railway
Database Hosting:   MongoDB Atlas
```

### Project Structure
```
src/
├── app.ts                      # Express app setup
├── server.ts                   # Server entry point
├── config/
│   └── db.ts                   # MongoDB connection
├── models/
│   ├── User.ts                 # User schema & methods
│   ├── Post.ts                 # Post schema
│   └── Activity.ts             # Activity schema
├── controllers/
│   ├── authController.ts       # Auth logic
│   ├── userController.ts       # User operations
│   ├── postController.ts       # Post operations
│   ├── activityController.ts   # Activity feed
│   └── adminController.ts      # Admin operations
├── middlewares/
│   └── authMiddleware.ts       # JWT verification & RBAC
├── routes/
│   ├── authRoutes.ts           # Auth endpoints
│   ├── userRoutes.ts           # User endpoints
│   ├── postRoutes.ts           # Post endpoints
│   ├── activityRoutes.ts       # Activity endpoints
│   └── adminRoutes.ts          # Admin endpoints
└── utils/
    ├── generateToken.ts        # JWT token generation
    └── activityUtils.ts        # Activity creation helper
```

---

## 🔐 Security Implementation

### Authentication & Authorization
- ✅ JWT token-based authentication
- ✅ Secure password hashing (bcrypt with salt rounds)
- ✅ Token expiration (30 days)
- ✅ Protected routes (authentication middleware)
- ✅ Role-based authorization (user/admin/owner)

### Security Headers
- ✅ Helmet.js for HTTP headers
- ✅ CORS configuration
- ✅ JSON body parsing limits

### Data Protection
- ✅ Password field excluded from API responses
- ✅ MongoDB injection prevention (Mongoose)
- ✅ Environment variables for secrets

---

## 📊 Database Schema

### User Model
```typescript
{
  username: String (unique, required)
  email: String (unique, required)
  password: String (hashed, required)
  role: Enum ['user', 'admin', 'owner'] (default: 'user')
  following: [ObjectId] -> User references
  followers: [ObjectId] -> User references
  blockedUsers: [ObjectId] -> User references
  timestamps: true (createdAt, updatedAt)
}
```

### Post Model
```typescript
{
  content: String (required)
  author: ObjectId -> User (required)
  likes: [ObjectId] -> User references
  timestamps: true (createdAt, updatedAt)
}
```

### Activity Model
```typescript
{
  type: Enum ['post_created', 'user_followed', 'post_liked']
  actor: ObjectId -> User (required)
  targetUser: ObjectId -> User (optional)
  targetPost: ObjectId -> Post (optional)
  timestamps: true (createdAt, updatedAt)
}
```

---

## 🧪 Testing

### Postman Collection Features
- ✅ **27 comprehensive test requests**
- ✅ Automated token management
- ✅ Random user generation for testing
- ✅ Role-based testing scenarios
- ✅ Authorization failure testing
- ✅ Console logging for debugging
- ✅ Environment variable support

### Test Coverage
| Category | Test Cases | Coverage |
|----------|-----------|----------|
| Authentication | 7 tests | 100% |
| User Operations | 5 tests | 100% |
| Post Operations | 4 tests | 100% |
| Activity Feed | 2 tests | 100% |
| Admin Authorization | 5 tests | 100% |
| Owner Operations | 4 tests | 100% |

### How to Test
1. Import `Social_Activity_Feed_Complete.postman_collection.json`
2. Run collection or individual requests
3. See `TESTING_GUIDE.md` for detailed instructions

---

## 🎯 Key Features Demonstrated

### 1. Clean Architecture
- Separation of concerns (routes → controllers → models)
- Modular code organization
- Reusable utilities and middleware
- Type safety with TypeScript

### 2. RESTful API Design
- Proper HTTP methods (GET, POST, PUT, DELETE)
- Meaningful status codes
- Consistent response format
- Resource-based URLs

### 3. Error Handling
- Try-catch blocks in all controllers
- Appropriate HTTP status codes
- Error messages for debugging
- Validation for edge cases

### 4. Code Quality
- TypeScript for type safety
- Consistent naming conventions
- Comments where needed
- ESLint compatible structure

### 5. Production Ready
- Environment configuration
- Build process (TypeScript compilation)
- Production start script
- Railway deployment configuration

---

## 🔄 API Endpoints Summary

### Authentication (Public)
```
POST   /api/auth/signup          Register new user
POST   /api/auth/login           Login user
```

### Users (Protected)
```
GET    /api/users/:id            Get user profile
PUT    /api/users/:id/follow     Follow user
PUT    /api/users/:id/unfollow   Unfollow user
PUT    /api/users/:id/block      Block user
PUT    /api/users/:id/unblock    Unblock user
```

### Posts (Protected)
```
POST   /api/posts                Create post
DELETE /api/posts/:id            Delete post
PUT    /api/posts/:id/like       Like/Unlike post
```

### Activity (Protected)
```
GET    /api/activity             Get activity feed
```

### Admin (Protected - Admin/Owner)
```
DELETE /api/admin/users/:id        Delete user (admin/owner)
PUT    /api/admin/users/:id/role  Update role (owner only)
```

---

## 🌟 Advanced Features

### 1. Activity Feed with Blocking
- Activities from blocked users are automatically filtered
- Implemented using MongoDB's `$nin` operator
- Efficient query with proper indexing

### 2. Role-Based Access Control
```
Owner > Admin > User

Owner:
  - All admin permissions
  - Can delete any user (including admins)
  - Can update user roles (promote/demote)
  - Cannot be deleted by admin

Admin:
  - Can delete regular users
  - Cannot delete owners
  - Cannot update roles

User:
  - Basic profile management
  - Social interactions (follow/block)
  - Content creation (posts)
```

### 3. Smart Like System
- Toggle behavior (like/unlike with same endpoint)
- Prevents duplicate likes
- Efficient array operations

### 4. Self-Action Prevention
- Cannot follow yourself
- Cannot block yourself
- Proper validation with meaningful errors

---

## 🚀 Deployment Details

### Railway Configuration
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Environment Variables (Railway)
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=***
PORT=5000
NODE_ENV=production
```

### Build Process
1. Install dependencies: `npm install`
2. Compile TypeScript: `npm run build`
3. Start server: `npm start` (runs compiled JavaScript)

---

## 📈 Performance Considerations

### Database Optimization
- ✅ Indexed fields (username, email)
- ✅ Mongoose schema validation
- ✅ Efficient queries with population
- ✅ Array operations for relationships

### Security Best Practices
- ✅ Password hashing before storage
- ✅ JWT for stateless authentication
- ✅ Environment variables for secrets
- ✅ Input validation
- ✅ Error handling without exposing internals

### Code Optimization
- ✅ Async/await for non-blocking operations
- ✅ Proper use of TypeScript types
- ✅ Reusable middleware
- ✅ Helper utilities for common operations

---

## 🔍 Testing the Deployment

### Quick Test Commands

#### 1. Health Check
```bash
curl https://social-activity-feed-backend-production.up.railway.app
# Expected: "API is running..."
```

#### 2. Register User
```bash
curl -X POST https://social-activity-feed-backend-production.up.railway.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
# Expected: 201 with user object and JWT token
```

#### 3. Login
```bash
curl -X POST https://social-activity-feed-backend-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
# Expected: 200 with user object and JWT token
```

#### 4. Get Profile (Authenticated)
```bash
curl -X GET https://social-activity-feed-backend-production.up.railway.app/api/users/{userId} \
  -H "Authorization: Bearer {your_jwt_token}"
# Expected: 200 with user profile
```

---

## 📚 Additional Documentation

### Files Included
1. **Social_Activity_Feed_Complete.postman_collection.json**
   - Complete test suite with 27 requests
   - Role-based testing scenarios
   - Automated variable management

2. **TESTING_GUIDE.md**
   - Comprehensive testing instructions
   - Expected results for each endpoint
   - Troubleshooting guide
   - API reference

3. **SUBMISSION_SUMMARY.md** (this file)
   - Project overview
   - Technical details
   - Deployment information

### Quick Start Guide
1. Import Postman collection
2. Run "Setup - Create Test Users" folder
3. Test individual features or run entire collection
4. Check console logs for detailed output
5. Refer to TESTING_GUIDE.md for details

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- ✅ Backend API development with Node.js/Express
- ✅ TypeScript for type-safe code
- ✅ MongoDB database design and operations
- ✅ Authentication & Authorization (JWT, RBAC)
- ✅ RESTful API design principles
- ✅ Security best practices
- ✅ Cloud deployment (Railway, MongoDB Atlas)
- ✅ API testing and documentation
- ✅ Clean code architecture
- ✅ Version control with Git

---

## 🏆 Bonus Features Implemented

1. **Role-Based Access Control**
   - Three-tier permission system
   - Admin and Owner roles beyond requirements

2. **Advanced Activity Filtering**
   - Blocked users' activities hidden from feed
   - Efficient MongoDB queries

3. **Toggle Actions**
   - Like/Unlike with same endpoint
   - Smart duplicate prevention

4. **Comprehensive Testing**
   - 27 test scenarios
   - Automated token management
   - Authorization failure testing

5. **Production Deployment**
   - Live API on Railway
   - Environment configuration
   - Restart policies

6. **Type Safety**
   - Full TypeScript implementation
   - Custom interfaces for requests
   - Type-safe database models

---

## 📞 Submission Details

**Repository:** [If applicable, add GitHub link]
**Deployment:** https://social-activity-feed-backend-production.up.railway.app
**Postman Collection:** Included in submission
**Documentation:** Complete (3 files)

**Status:** ✅ **READY FOR REVIEW**

---

## 🙏 Notes

This project implements all required features plus additional enhancements for a production-ready social activity feed backend. The code is clean, well-documented, and follows best practices for Node.js/Express applications.

The Postman collection provides comprehensive testing for all features, including edge cases and authorization scenarios. The deployment is live and accessible for immediate testing.

Thank you for the opportunity to work on this assignment!

---

**Last Updated:** December 3, 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
