src/
├── assets/                      # Static files like images, fonts, icons
│
├── components/                  # Global reusable UI components (eg: Header, Button, Modal)
│   ├── ui/                      # Only Shadcn UI components (Button, Input, Dialog, etc.)
│
├── features/                    # Feature-based modular folders
│   ├── user-auth/               # User authentication logic and UI
│   │   ├── components/          # Auth-specific components (LoginForm, SignupForm, etc.)
│   │   ├── hooks/               # Auth-specific hooks (useLogin, useSignup, etc.)
│   │   └── index.ts             # Entry point to export user-auth module
│   │
│   ├── admin-auth/              # Admin authentication logic and UI
│   │   ├── components/          # Admin auth components (AdminLoginForm, etc.)
│   │   ├── hooks/               # Admin auth hooks (useAdminLogin, etc.)
│   │   └── index.ts             # Entry point to export admin-auth module
│   │
│   ├── user-profile/            # User profile management
│   │   ├── components/          # Profile UI (ProfileCard, EditProfileForm, etc.)
│   │   ├── hooks/               # Profile-related hooks (useUserProfile, etc.)
│   │   └── index.ts             # Entry point to export user-profile module
│
├── hooks/                       # Shared/global custom hooks (eg: useDebounce, useOnClickOutside)
│
├── lib/                         # Libraries, instances, and configuration
│   ├── axios.ts                 # Axios instance
│   ├── validators/              # Schema validators (eg: Zod, Yup)
│   └── constants.ts             # Global constants (roles, status codes, etc.)
│
├── pages/                       # Route-level pages, organized by role and access type
│   ├── admin/                   # Admin-specific pages
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   └── Settings.tsx
│   │
│   ├── user/                    # Logged-in user pages
│   │   ├── Home.tsx
│   │   ├── Profile.tsx
│   │   └── Settings.tsx
│   │
│   ├── subadmin/                # Subadmin-specific pages
│   │   ├── Dashboard.tsx
│   │   └── Reports.tsx
│   │
│   └── NotFound.tsx            # 404 fallback page
│
├── routes/                      # Route definitions, layouts, and role-based route guards
│   ├── AppRouter.tsx            # Central router configuration
│   ├── ProtectedRoute.tsx       # Role-based route guard component
│
├── layouts/                 # Shared or role-specific layout wrappers
│   ├── AdminLayout.tsx
│   ├── UserLayout.tsx
│   └── PublicLayout.tsx
│
├── store/                       # Redux store config and initialization
│   └── index.ts
│
├── slices/                      # Global state slices (authSlice, themeSlice, etc.)
│   ├── authSlice.ts
│   └── themeSlice.ts
│
├── utils/                       # Utility functions and helpers
│   ├── formatDate.ts
│   └──  getRole.ts

