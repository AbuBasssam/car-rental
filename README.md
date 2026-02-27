# 🚗 Car Rental System - Frontend

A modern, responsive car rental web application built with React and Vite, providing a seamless user experience for car rental services with comprehensive authentication and multi-language support.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Car Rental System Frontend is a modern single-page application (SPA) designed to provide users with an intuitive interface for browsing, booking, and managing car rentals. Built with React 18 and Vite, it offers lightning-fast performance and an exceptional user experience.

## 🏗️ Architecture

This project follows **Component-Based Architecture** with clear separation of concerns:

- **Components Layer**: Reusable UI components organized by feature
- **Pages Layer**: Route-level components representing application screens
- **Context Layer**: Global state management using React Context API
- **Services Layer**: API communication and business logic
- **Hooks Layer**: Custom React hooks for reusable logic
- **Utils Layer**: Helper functions, constants, and validators

### Architecture Patterns Used

- **Context API**: Global state management for authentication and theme
- **Custom Hooks**: Reusable stateful logic extraction
- **Compound Components**: Complex UI components with flexible composition
- **Provider Pattern**: Context providers for global data
- **Container/Presentational Pattern**: Separation of logic and UI
- **Route-based Code Splitting**: Lazy loading for optimal performance

## ✨ Features

### Authentication & Authorization

- JWT-based authentication with refresh token mechanism
- Email confirmation system with OTP verification
- Password reset with OTP verification
- Protected and public route handling
- Automatic token refresh on expiration
- Session management with automatic cleanup
- Remember me functionality

### User Experience

- Multi-language support (Arabic & English)
- RTL (Right-to-Left) support for Arabic
- Light and dark theme switching
- Responsive design for all devices (mobile, tablet, desktop)
- Toast notifications for user feedback
- Flash messages for important alerts
- Loading states and skeletons
- Form validation with real-time feedback

### Core Functionality

- Browse most rented cars
- View car details and specifications
- User registration and profile management
- Email verification workflow
- Password reset workflow
- Interactive navigation with dropdown menus
- Hero sections with compelling CTAs
- How it works section
- Why choose us section

### UI Components

- Custom form inputs with validation
- Password visibility toggle
- Dropdown menus with click-outside handling
- Primary and outline button variants
- Full-width buttons for mobile
- Themed components (light/dark mode)
- Responsive navigation bar
- Footer with links and information

### Developer Experience

- Hot Module Replacement (HMR) with Vite
- ESLint configuration for code quality
- Environment variable management
- Modular component organization
- Custom hooks for reusability
- Utility functions for common tasks

## 🛠️ Technologies

### Core Framework

- **React 18.x** - UI library with concurrent features
- **Vite 5.x** - Next-generation frontend build tool
- **React Router v6** - Declarative routing for React

### State Management

- **React Context API** - Global state management
- **Custom Hooks** - Reusable stateful logic
- **Local Storage** - Client-side data persistence

### API & Data Fetching

- **Axios** - Promise-based HTTP client
- **Axios Interceptors** - Request/response middleware
- **Refresh Token Service** - Automatic token renewal

### Internationalization

- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next
- **RTL Support** - Right-to-left language support

### UI & Styling

- **CSS Modules** / **Tailwind CSS** - Component styling
- **Responsive Design** - Mobile-first approach
- **Theme System** - Light/dark mode support

### Form Management

- **Custom Form Validation** - Client-side validation
- **Password Strength Indicators** - Visual password strength

### Development Tools

- **ESLint** - JavaScript linting
- **Vite DevServer** - Development server with HMR
- **Git** - Version control

## 📁 Project Structure

```text
CAR-RENTAL/
├── .vscode/
├── public/
├── src/
│   ├── actions/
│   │
│   ├── api/
│   │   └── endpoints/
│   │       ├── auth.js
│   │       ├── endpoints.js
│   │       ├── axiosInstance.js
│   │       └── RefreshTokenService.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── footer/
│   │   ├── hero/
│   │   ├── howItWorks/
│   │   ├── login/
│   │   ├── mostRentedCars/
│   │   ├── Navbar/
│   │   ├── signUp/
│   │   ├── Verify/
│   │   └── whyChooseUs/
│   │
│   ├── config/
│   │   └── toastConfig.js
│   │
│   ├── context/
│   │   ├── AuthBridge.js
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │   ├── useActionError.js
│   │   ├── useActionToast.js
│   │   ├── useAuth.js
│   │   ├── useClickOutside.js
│   │   ├── useFlashMessage.js
│   │   ├── useLogout.js
│   │   ├── useOtpVerification.js
│   │   ├── useScrollLock.js
│   │   └── useTheme.js
│   │
│   ├── layouts/
│   │   ├── dropDownMenu.jsx
│   │   ├── FormInput.jsx
│   │   ├── FullWidthButton.jsx
│   │   ├── outlineButton.jsx
│   │   ├── PasswordInput.jsx
│   │   ├── primaryButton.jsx
│   │   └── Root.jsx
│   │
│   ├── loaders/
│   │   └── Rootloader.js
│   │
│   ├── locales/
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── Login.jsx
│   │   ├── RequestResetPasswordPage.jsx
│   │   ├── ResetPasswordPage.jsx
│   │   ├── SignUp.jsx
│   │   ├── VerifyAccountPage.jsx
│   │   └── VerifyResetCodePage.jsx
│   │
│   ├── routes/                       # Route configuration
│   │   ├── ProtectedRoute.jsx
│   │   ├── PublicRoute.jsx
│   │   ├── ResetPasswordRoute.jsx
│   │   ├── router.jsx
│   │   ├── VerifyResetRoute.jsx
│   │   └── VerifyRoute.jsx
│   │
│   ├── services/                     # Business logic and
│   │   └── authService.js           # Authentication service
│   │
│   ├── utils/
│   │   ├── authUtils.js
│   │   ├── constants.js
│   │   ├── flashService.js
│   │   ├── helpers.js
│   │   ├── localeKeys.js
│   │   ├── Passwordhelpers.js
│   │   ├── styles.js
│   │   └── validators.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/car-rental.git
cd car-rental-frontend
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure environment variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
VITE_API_BASE_URL=http:// your Youstr
VITE_APP_NAME=Car Rental System
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

### Build for Production

```bash
npm run build
# or
yarn build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🔄 API Integration

### Axios Configuration

The application uses a centralized Axios instance with interceptors for:

- **Request Interceptor**: Automatically attaches JWT tokens to requests
- **Response Interceptor**: Handles token refresh and error responses
- **Base URL Configuration**: Centralized API endpoint management
- **Error Handling**: Consistent error response formatting

### Refresh Token Flow

```javascript
// Automatic token refresh on 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newToken = await RefreshTokenService.refreshToken();
      // Retry original request with new token
    }
    return Promise.reject(error);
  },
);
```

### API Endpoints Structure

```javascript
// endpoints/auth.js
export const authEndpoints = {
  signUp: "/auth/signup",
  login: "/auth/login",
  logout: "/auth/logout",
  refresh: "/auth/refresh",
  verifyEmail: "/auth/verify-email",
  requestPasswordReset: "/auth/request-reset",
  verifyResetCode: "/auth/verify-reset-code",
  resetPassword: "/auth/reset-password",
};
```

## 🔒 Security

### Authentication Flow

1. **User Registration**:
   - User submits registration form
   - OTP sent to email
   - User verifies email with OTP
   - Account activated

2. **Login**:
   - User provides credentials
   - Server returns access token and refresh token
   - Tokens stored in memory and local storage
   - User redirected to dashboard

3. **Token Refresh**:
   - Access token expires after 30 minutes
   - Interceptor automatically requests new token
   - Refresh token used for renewal
   - New tokens stored securely

4. **Logout**:
   - Tokens revoked on server
   - Local storage cleared
   - User redirected to login

### Protected Routes

```javascript
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

Routes are protected using:

- JWT token validation
- Role-based access control (future)
- Permission checks (future)

### Security Best Practices

- No sensitive data in localStorage (only refresh token)
- Access tokens kept in memory
- Automatic token cleanup on logout
- HTTPS enforcement in production
- CORS configuration for API requests
- XSS protection with React
- CSRF protection with tokens

### Password Security

- Client-side password validation
- Password strength indicators
- Minimum 8 characters required
- Must include uppercase, lowercase, digits, and special characters
- Passwords never stored in plain text
- Secure password reset flow with OTP

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🌍 Internationalization

The application supports multiple languages:

### Adding Translations

1. Add translation keys to `locales/en.json` and `locales/ar.json`
2. Use in components:

```javascript
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t("welcome.title")}</h1>;
}
```

### RTL Support

The application automatically switches between LTR and RTL based on the selected language:

```javascript
// Automatic direction switching
document.dir = language === "ar" ? "rtl" : "ltr";
```

## 🎨 Theming

### Theme Toggle

Users can switch between light and dark themes:

```javascript
import { useTheme } from "./hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
  );
}
```

### Custom Styles

Theme-aware styles are applied throughout the application using CSS variables and conditional classes.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes using conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow React best practices and hooks rules
- Use functional components with hooks (no class components)
- Use meaningful component and variable names
- Write reusable components
- Add PropTypes or TypeScript for type checking
- Keep components small and focused (Single Responsibility)
- Use custom hooks for reusable logic
- Follow ESLint rules
- Write clean, readable code with comments where necessary

### Code Review Checklist

- [ ] Components follow single responsibility principle
- [ ] Proper error handling implemented
- [ ] Loading states handled appropriately
- [ ] Responsive design implemented
- [ ] Accessibility considerations (a11y)
- [ ] No console.log statements in production code
- [ ] No sensitive data in commits
- [ ] Documentation updated (if applicable)
- [ ] Tests pass (when available)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**[Your Name]**

- GitHub: [@AbuBasssam](https://github.com/AbuBasssam)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- Open source community for excellent libraries
- Contributors and supporters

## 📞 Support

For support, email support@carrental.com or open an issue in the GitHub repository.

## 🗺️ Roadmap

### Phase 1: Core Features ✅

- [x] Authentication system
- [x] Multi-language support
- [x] Theme system
- [x] Responsive design
- [x] Protected routes

### Phase 2: Enhanced Features 🚧

- [ ] Car browsing and filtering
- [ ] Car details page with image gallery
- [ ] Booking system with calendar
- [ ] User dashboard
- [ ] Booking management
- [ ] Payment integration

### Phase 3: Advanced Features 📊

- [ ] Real-time notifications (WebSocket)
- [ ] Car reviews and ratings
- [ ] Favorites and wishlists
- [ ] Booking history
- [ ] Profile management
- [ ] Document upload for verification

### Phase 4: Optimization 🎯

- [ ] Progressive Web App (PWA)
- [ ] Code splitting and lazy loading
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Accessibility improvements (WCAG 2.1)

---

**Note**: This project is actively maintained. Features and documentation are subject to updates.
