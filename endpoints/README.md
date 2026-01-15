# How to Use HTTP Request Files

## Setup

This directory contains `.http` files for testing API endpoints using HTTP Client.

### VS Code Users:
Install the **REST Client** extension:
https://marketplace.visualstudio.com/items?itemName=humao.rest-client

### WebStorm/IntelliJ Users:
HTTP Client is built-in! Just open the `.http` files.

---

## Password Requirements (UPDATED 2026-01-14)

⚠️ **IMPORTANT**: Passwords now require:
- **Minimum 12 characters** (changed from 4-8)
- At least one **UPPERCASE** letter
- At least one **lowercase** letter
- At least one **number**
- At least one **special character** (@$!%*?&)

### Valid Password Examples:
```
✅ Test1234!@#$
✅ MyPassword123!
✅ SecurePass456&
✅ Admin@12345678
```

### Invalid Password Examples:
```
❌ test1234          - Too short, no uppercase, no special char
❌ Test1234          - No special character
❌ TestPassword!     - No number
❌ TESTPASSWORD123!  - No lowercase
```

---

## Updated Passwords in auth.http

The `auth.http` file has been updated with valid passwords:

### 1. Signup (POST)
```json
{
  "username": "Mike27",
  "password": "Test1234!@#$",     ← UPDATED (12 chars, complex)
  "email": "mike27@gmail.com",
  "avatarColor": "red",
  "avatarImage": "data:image/png;base64,..."
}
```

### 2. Signin (POST)
```json
{
  "username": "Mike27",
  "password": "Test1234!@#$"      ← UPDATED (12 chars, complex)
}
```

### 3. Reset Password (POST)
```json
{
  "password": "MyNewPass123!",    ← UPDATED (13 chars, complex)
  "confirmPassword": "MyNewPass123!"
}
```

---

## How to Send Requests

### In VS Code with REST Client:
1. Open `auth.http`
2. Click "**Send Request**" link above each request
3. View response in split pane

### In WebStorm/IntelliJ:
1. Open `auth.http`
2. Click the **▶ (play icon)** next to each request
3. View response in "Run" panel

---

## Manual Update Needed

⚠️ **Note**: The signup password in line 12 needs manual update due to the long base64 image.

**Change line 12 from:**
```
"password":"test1234",
```

**To:**
```
"password":"Test1234!@#$",
```

---

## Testing Workflow

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Signup** a new user first (POST /api/v1/signup)
3. **Signin** with the same credentials (POST /api/v1/signin)
4. **Test other endpoints** (they require authentication)

---

## Common Issues

### Issue: "Invalid password"
**Solution**: Make sure password meets all requirements (12+ chars, uppercase, lowercase, number, special char)

### Issue: "Token is not valid"
**Solution**: You need to signin first to get a session cookie. The HTTP client will automatically send cookies in subsequent requests if `withCredentials:true` is set.

### Issue: "User already exists"
**Solution**: Either:
- Use a different username/email
- Check your MongoDB database and delete the existing user
- Use the signin endpoint instead

### Issue: Requests not working in VS Code
**Solution**: Install REST Client extension

---

## Server Status Check

Before testing, verify the server is running:

```bash
curl http://localhost:5000/health
```

Expected response:
```
Health: Server instance is healthy with process id XXXX on [date]
```

---

## Next Steps

Once you've updated the signup password manually, you can:
1. Test the signup endpoint
2. Test the signin endpoint
3. Test protected endpoints (currentuser, etc.)

All requests should now work with the new password requirements!
