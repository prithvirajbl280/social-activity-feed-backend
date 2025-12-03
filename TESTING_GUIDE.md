# Social Activity Feed Backend - Testing Guide

## Overview
This guide explains how to test all features of the Social Activity Feed Backend API, including role-based access control (User, Admin, Owner).

## Files Included
- `Social_Activity_Feed_Complete.postman_collection.json` - Complete test suite with all role-based scenarios

## Setup Instructions

### 1. Import the Postman Collection
1. Open Postman
2. Click **Import** button
3. Select `Social_Activity_Feed_Complete.postman_collection.json`
4. Click **Import**

### 2. Create Environment (Optional but Recommended)
1. In Postman, go to **Environments** → Click **+** to create new
2. Name it: **Social Activity Feed**
3. Click **Save**
4. Select it from the environment dropdown (top right)

### 3. Verify Base URL
The collection is pre-configured with:
```
https://social-activity-feed-backend-production.up.railway.app
```

If you're running locally, update the `base_url` variable to `http://localhost:5000`

## Testing Scenarios

### Complete Test Flow

#### 1. Setup - Create Test Users (Run in order)
These requests create all necessary test users with different roles:

| Request | Purpose | Expected Result |
|---------|---------|-----------------|
| **Create Regular User (User 1)** | Creates first regular user | 201 Created or 400 if exists |
| **Login Regular User (User 1)** | Login as regular user | 200 OK, saves `user1_token` |
| **Create Regular User (User 2)** | Creates target user for testing | 201 Created (random user) |
| **Create Admin User** | Creates admin user | 201 Created or 400 if exists |
| **Login Admin User** | Login as admin | 200 OK, saves `admin_token` |
| **Create Owner User** | Creates owner user | 201 Created or 400 if exists |
| **Login Owner User** | Login as owner | 200 OK, saves `owner_token` |

**Variables Set:**
- `user1_token`, `user1_id` - Regular user credentials
- `user2_id` - Target user for testing
- `admin_token`, `admin_id` - Admin credentials
- `owner_token`, `owner_id` - Owner credentials

---

#### 2. User Operations (Regular User)
Tests basic user functionality:

| Request | Purpose | Expected Result |
|---------|---------|-----------------|
| **Get User Profile** | Retrieve user profile | 200 OK |
| **Follow User** | Follow another user | 200 OK |
| **Unfollow User** | Unfollow a user | 200 OK |
| **Block User** | Block a user | 200 OK |
| **Unblock User** | Unblock a user | 200 OK |

**What to Test:**
- ✅ Users can view their own profile
- ✅ Users can follow/unfollow other users
- ✅ Users can block/unblock other users
- ✅ Cannot follow yourself (400 Bad Request)
- ✅ Cannot block yourself (400 Bad Request)

---

#### 3. Post Operations (Regular User)
Tests post creation and interactions:

| Request | Purpose | Expected Result |
|---------|---------|-----------------|
| **Create Post** | Create a new post | 201 Created, saves `post_id` |
| **Like Post** | Like a post | 200 OK |
| **Unlike Post** | Remove like from post | 200 OK |
| **Delete Own Post** | Delete your own post | 200 OK |

**What to Test:**
- ✅ Users can create posts
- ✅ Users can like/unlike posts
- ✅ Users can delete their own posts
- ✅ Activity is created for each action

---

#### 4. Activity Feed
Tests activity feed functionality:

| Request | Purpose | Expected Result |
|---------|---------|-----------------|
| **Get Activity Feed (Regular User)** | View all activities | 200 OK, shows all activities |
| **Get Activity Feed (After Blocking)** | View feed after blocking someone | 200 OK, blocked user's activities hidden |

**What to Test:**
- ✅ Activity feed shows: post_created, user_followed, post_liked
- ✅ Activities from blocked users are filtered out
- ✅ Feed is sorted by newest first

---

#### 5. Admin Operations
Tests admin role permissions:

| Request | Expected Result | Explanation |
|---------|-----------------|-------------|
| **Regular User Tries to Delete User** | 403 Forbidden | Only admin/owner can delete |
| **Admin Deletes User** | 200 OK | Admin can delete regular users |
| **Admin Tries to Delete Owner** | 403 Forbidden | Admin cannot delete owner |
| **Regular User Tries to Update Role** | 403 Forbidden | Only owner can update roles |
| **Admin Tries to Update Role** | 403 Forbidden | Only owner can update roles |

**What to Test:**
- ✅ Regular users cannot access admin endpoints
- ✅ Admins can delete regular users
- ✅ Admins cannot delete owners
- ✅ Admins cannot update user roles

---

#### 6. Owner Operations
Tests owner role (highest permission):

| Request | Expected Result | Explanation |
|---------|-----------------|-------------|
| **Owner Updates User Role** | 200 OK | Owner can promote to admin |
| **Owner Demotes User from Admin** | 200 OK | Owner can demote to user |
| **Owner Deletes User** | 200 OK | Owner can delete any user |
| **Owner Deletes Admin** | 200 OK | Owner can delete admins |

**What to Test:**
- ✅ Owner can update any user's role
- ✅ Owner can delete any user (including admins)
- ✅ Owner has all admin permissions
- ✅ Only one owner per system recommended

---

## Role Hierarchy

```
Owner (Highest Permission)
  ├── Can delete any user (including admins)
  ├── Can update any user's role (promote/demote)
  └── All admin permissions

Admin (Medium Permission)
  ├── Can delete regular users
  ├── Cannot delete owners
  └── Cannot update user roles

User (Basic Permission)
  ├── Can manage own profile
  ├── Can create/delete own posts
  ├── Can follow/block other users
  └── Cannot access admin endpoints
```

---

## Running the Complete Test Suite

### Option 1: Collection Runner (Recommended)
1. Click the collection name
2. Click **Run** button
3. Select environment: **Social Activity Feed** (or No environment)
4. **Uncheck these requests** (they are fallbacks):
   - ❌ Login Regular User (User 1) - only if signup succeeds
   - ❌ Login Admin User - only if signup succeeds
   - ❌ Login Owner User - only if signup succeeds
5. Click **Run Social Activity Feed**

### Option 2: Manual Testing
Run requests in this order:

**Setup Phase:**
1. Create Regular User (User 1)
2. Create Regular User (User 2)
3. Create Admin User
4. Create Owner User

**Testing Phase:**
5-9. All User Operations
10-13. All Post Operations
14-15. Activity Feed
16-20. Admin Operations
21-24. Owner Operations

---

## Expected Results Summary

| Category | Total Requests | Expected Success | Expected Failures (Authorized) |
|----------|----------------|------------------|-------------------------------|
| Setup | 7 requests | 7 (or login fallback) | 0 |
| User Operations | 5 requests | 5 | 0 |
| Post Operations | 4 requests | 4 | 0 |
| Activity Feed | 2 requests | 2 | 0 |
| Admin Operations | 5 requests | 1 | 4 (authorization tests) |
| Owner Operations | 4 requests | 4 | 0 |
| **TOTAL** | **27 requests** | **23 success** | **4 controlled failures** |

**Controlled Failures (These SHOULD fail - they test authorization):**
1. Regular user tries to delete user → 403 ✅
2. Admin tries to delete owner → 403 ✅
3. Regular user tries to update role → 403 ✅
4. Admin tries to update role → 403 ✅

---

## Console Logs
Watch the Postman Console (bottom of screen) for helpful logs:

```
✓ Regular User 1 created: 692f52341848cb73e0863465
✓ Regular User 2 created: 692fdc930bac23aa530357f7
✓ Admin User created: 692fdc8f0bac23aa530357e9
✓ Owner User created: 692fdc910bac23aa530357f0
✓ Post created: 692fdc970bac23aa5303580c
```

---

## Troubleshooting

### Issue: All requests return 404
**Solution:** Verify `base_url` is set correctly in collection variables.

### Issue: Follow/Like requests return 404
**Solution:** Ensure you run "Create Regular User (User 2)" and "Create Post" first to populate `user2_id` and `post_id` variables.

### Issue: Admin/Owner requests return 401
**Solution:** Make sure you run "Login Admin User" or "Login Owner User" to set the correct tokens.

### Issue: User already exists (400)
**Solution:** Use the "Login" requests instead of "Create" requests for existing users.

### Issue: Variables not persisting
**Solution:** Create an environment and select it in the runner.

---

## API Endpoints Reference

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:id` - Get user profile
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

### Admin (Requires admin/owner role)
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/role` - Update user role (owner only)

---

## Submission Checklist

✅ Backend deployed and running on Railway
✅ MongoDB connected successfully
✅ All authentication endpoints working
✅ All user operations working (follow, block, posts)
✅ Activity feed working with blocking filter
✅ Role-based authorization working correctly
✅ Postman collection includes all test scenarios
✅ Documentation provided

---

## Notes

1. **Random User Generation:** User 2 is created with a random email each time to avoid conflicts
2. **Auto-deletion Tests:** Some requests automatically create users for deletion testing
3. **Token Management:** Tokens are automatically saved and used for authenticated requests
4. **Activity Creation:** Activities are automatically created for: post creation, user follows, post likes
5. **Blocking Filter:** Activity feed automatically filters out blocked users' activities

---
