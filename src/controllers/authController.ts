import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    // Allow setting role for testing purposes, or restrict it in production
    // For this assignment, we might want to allow creating 'owner' initially or via specific logic
    // Here we just allow it from body for simplicity as per "Users should be able to create their profile"

    const user = await User.create({
        username,
        email,
        password,
        role: role || 'user',
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
```

### Steps to Fix on GitHub:

1. Go to: `https://github.com/YOUR_USERNAME/social-activity-feed-backend/blob/main/src/controllers/authController.ts`
2. Click the **pencil icon** (Edit this file)
3. Find line 35: Change `user._id as string` to `user._id.toString()`
4. Find line 56: Change `user._id as string` to `user._id.toString()`
5. Scroll down and commit: `"Fix: TypeScript ObjectId to string conversion"`

### Railway Will Auto-Deploy

Once you commit, Railway will automatically:
- Detect the change
- Build again
- This time it should succeed! ✅

## Expected Success Log

After the fix, you should see:
```
npm run build
> npx tsc

✓ Build successful
```

Then it will start your server:
```
npm run start
> node dist/server.js

MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
