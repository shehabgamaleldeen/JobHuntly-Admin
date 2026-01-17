# 🎛️ JobHuntly - Admin Dashboard

> Modern admin panel built with Next.js 16 for managing the JobHuntly platform

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📖 Overview

JobHuntly Admin Dashboard is a comprehensive administrative interface for managing the JobHuntly job search platform. Built with Next.js 16 and React 19, it provides powerful tools for monitoring platform activity, managing users, analyzing data, and maintaining system health.

**🔗 Related Repositories:**
- [Frontend Application](https://github.com/shehabgamaleldeen/JobHuntly-frontend) - React + TypeScript
- [Backend API](https://github.com/shehabgamaleldeen/JobHuntly-Backend) - Express.js REST API

## ✨ Key Features

### Dashboard Overview 📊
- **Real-time Analytics** - Platform statistics and KPIs
- **Data Visualization** - Interactive charts with Recharts
- **Activity Monitoring** - Recent user actions and system events
- **Quick Actions** - Common administrative tasks

### User Management 👥
- **User Directory** - Browse all registered users
- **Role Management** - Assign and modify user roles
- **Account Status** - Activate, suspend, or delete accounts
- **User Details** - View comprehensive user profiles
- **Search & Filter** - Find users by various criteria

### Job Management 💼
- **Job Listings** - View all posted jobs
- **Job Moderation** - Approve or reject job postings
- **Job Analytics** - Track job performance metrics
- **Bulk Operations** - Manage multiple jobs efficiently

### Company Management 🏢
- **Company Directory** - All registered companies
- **Verification** - Approve company registrations
- **Profile Management** - Edit company information
- **Company Analytics** - Track company activity

### Analytics & Reports 📈
- **User Growth** - Registration trends over time
- **Job Statistics** - Posting and application metrics
- **Revenue Reports** - Premium subscription analytics
- **Platform Health** - System performance indicators

### System Settings ⚙️
- **Configuration** - Platform-wide settings
- **Email Templates** - Manage notification templates
- **Feature Flags** - Enable/disable features
- **Security Settings** - Authentication and access control

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - Latest React with concurrent features
- **TypeScript 5+** - Type-safe development

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Data & API
- **Axios 1.13.2** - HTTP client for API communication
- **Recharts 3.6.0** - Composable charting library

### UI Components
- **React Icons 5.5.0** - Icon library

### Development Tools
- **ESLint 9** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend API running (see [Backend Repository](https://github.com/shehabgamaleldeen/JobHuntly-Backend))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shehabgamaleldeen/JobHuntly-Admin.git
cd JobHuntly-Admin
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**

Create a `.env.local` file in the root directory:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Admin Authentication
NEXT_PUBLIC_ADMIN_SECRET=your_admin_secret_key

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

4. **Run development server**
```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
app/
├── auth/                    # Authentication pages
│   ├── login/
│   └── page.tsx
├── dashboard/               # Main dashboard
│   ├── users/              # User management
│   │   └── page.tsx
│   ├── jobs/               # Job management
│   │   └── page.tsx
│   ├── companies/          # Company management
│   │   └── page.tsx
│   ├── analytics/          # Analytics & reports
│   │   └── page.tsx
│   ├── settings/           # System settings
│   │   └── page.tsx
│   └── page.tsx            # Dashboard home
├── components/              # Reusable components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── UserTable.tsx
│   ├── JobTable.tsx
│   ├── Charts/
│   └── Modals/
├── utils/                   # Utility functions
│   └── api.ts              # API client
├── layout.tsx              # Root layout
├── page.tsx                # Landing page
└── globals.css             # Global styles
```

## 🔐 Authentication

The admin dashboard implements secure authentication:
- Admin-only access with JWT tokens
- Protected routes with middleware
- Session management
- Role-based permissions

## 📊 Dashboard Features

### Analytics Dashboard
- **User Metrics**
  - Total users
  - Active users
  - New registrations (daily/weekly/monthly)
  - User retention rate

- **Job Metrics**
  - Total jobs posted
  - Active job listings
  - Applications submitted
  - Average applications per job

- **Revenue Metrics**
  - Premium subscriptions
  - Revenue trends
  - Conversion rates

### Data Visualization
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions
- Real-time data updates

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop and tablets
- **Dark Mode Support** - Tailwind CSS theming
- **Intuitive Navigation** - Sidebar with clear sections
- **Data Tables** - Sortable, filterable, paginated
- **Loading States** - Skeleton loaders
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Action confirmations

## 🔌 API Integration

The dashboard communicates with the backend API:
- Centralized API client in `utils/api.ts`
- Axios interceptors for authentication
- Error handling and retry logic
- Type-safe API responses

### Key API Endpoints Used
```typescript
GET    /api/admin/users           # Get all users
PUT    /api/admin/users/:id       # Update user
DELETE /api/admin/users/:id       # Delete user
GET    /api/admin/jobs            # Get all jobs
GET    /api/admin/analytics       # Get analytics data
PUT    /api/admin/settings        # Update settings
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
Configure these in your deployment platform:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_ADMIN_SECRET` - Admin authentication secret

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Tablets */
md: 768px   /* Small laptops */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large screens */
```

## 🛡️ Security Features

- **Admin-only Access** - Restricted to authorized administrators
- **JWT Validation** - Token-based authentication
- **CSRF Protection** - Next.js built-in protection
- **Input Sanitization** - Prevent XSS attacks
- **Rate Limiting** - Prevent abuse
- **Audit Logging** - Track admin actions

## 📈 Performance Optimization

- **Next.js App Router** - Server components by default
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Next.js Image component
- **Caching** - API response caching
- **Lazy Loading** - Components loaded on demand

## 🎯 Key Pages

### Dashboard Home (`/dashboard`)
- Overview statistics
- Recent activity feed
- Quick action buttons
- System health indicators

### Users (`/dashboard/users`)
- User list with search/filter
- User details modal
- Role assignment
- Account status management

### Jobs (`/dashboard/jobs`)
- Job listings table
- Job approval workflow
- Job analytics
- Bulk actions

### Analytics (`/dashboard/analytics`)
- Interactive charts
- Date range selection
- Export reports
- Trend analysis

## 🤝 Contributing

This is a capstone project for the NTI Full-Stack Development Program. Contributions are welcome!

## 👨‍💻 Authors

**Shehab Gamal El-Deen**
- GitHub: [@shehabgamaleldeen](https://github.com/shehabgamaleldeen)
- LinkedIn: [Shehab Gamal El-Deen](https://www.linkedin.com/in/shehabgamaleldeen/)

## 📄 License

This project is part of the NTI Open-Source Applications Developer Program.

## 🙏 Acknowledgments

- National Telecommunication Institute (NTI)
- Open-Source Applications Developer Program
- All team members and instructors

---

**⭐ If you find this project helpful, please give it a star!**
