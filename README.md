# User API
API này cho phép người dùng đăng kí, đăng nhập, xác thực OTP, đặt lại mật khẩu.
## Base URL
URL cơ bản cho tất cả các endpoint API là: `http://localhost:<port>/api/user/`.

**Lưu ý:** `<port>` là số cổng mà máy chủ API đang chạy. Giá trị này có thể khác nhau tùy thuộc vào cấu hình (ví dụ: 3000, 8080, v.v.).
## Endpoints
### 1. Sign Up
**POST** `/registration`
#### Mô tả: 
Tạo tài khoản người dùng mới. Một OTP sẽ được gửi đến email để xác thực.
#### Request Body:
```json
{
  "email": "user@example.com",
  "username": "username123",
  "password": "password123"
}
```
#### Response:
```json
{
  "status": true,
  "success": "User Registered. Please verify OTP sent to your email."
}
```
### 2. Xác thực OTP
**POST** `/vertifyOtp`
#### Mô tả:
Xác thực OTP để đăng kí hoặc đổi mật khẩu.
#### Request Body:
```json
{
  "email": "user@example.com",
  "otpCode": "123456"
}
```
#### Response for Register:
```json
{
  "status": true,
  "message": "OTP Verified and User Registered Successfully"
}
```
#### Response for Forgot Password:
```json
{
  "status": true,
  "message": "OTP Verified and please send new password"
}
```
### 3. Login
**POST** `/login`
#### Mô tả: 
Đăng nhập với email/username và password.
#### Request Body:
```json
{
  "login": "user@example.com",
  "password": "password123"
},
{
  "login": "username",
  "password": "password123"
}

```
#### Response:
```json
{
  "status": true,
  "token": "JWT_TOKEN_HERE"
}
```
### 4. Forgot Password
**POST** `/forgotPassword`
#### Mô tả: 
Yêu cầu gửi OTP để đổi mật khẩu.
#### Request Body:
```json
{
  "email": "user@example.com"
}
```
#### Response:
```json
{
  "status": true,
  "success": "User Forgot Password. Please verify OTP sent to your email."
}
```
### 5. Reset Password
**POST** `/resetPassword`
#### Mô tả: 
Người dùng gửi lại mật khẩu mới.
#### Request Body:
```json
{
  "email": "user@example.com",
  "newPassword": "newpassword123"
}
```
#### Response:
```json
{
  "status": true,
  "message": "Password reset successfully"
}
```
