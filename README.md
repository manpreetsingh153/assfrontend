Frontend - Authentication System with reCAPTCHA

This is the React 19 frontend for the authentication system using Google reCAPTCHA.

## Live Site
👉 [https://assfrontend.vercel.app/](https://assfrontend.vercel.app/)

## Technologies Used
- React 19
- JavaScript
- Google reCAPTCHA v2
- CSS
- bootstrap
- axios

## Pages
- `/` → Register
- `/login` → Login with reCAPTCHA
- `/profile` → Protected profile page

## Setup Instructions
1. Clone the repo and navigate into the `client` folder:
   ```bash
   git clone <repo_url>
   cd auth-app/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your site key from Google reCAPTCHA to `public/index.html`:
   ```html
   <script src="https://www.google.com/recaptcha/api.js" async defer></script>
   ```
4. Start the frontend:
   ```bash
   npm start
   ```

## Notes
- The frontend expects the backend to run at: `https://assbackend-859f.onrender.com`
- Cookies (for auth) must be allowed for cross-origin requests