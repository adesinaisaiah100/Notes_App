# eazy-notes

## Overview
Eazy-notes is a modern web application designed to provide a seamless user experience for managing authentication, AI integrations, and note-taking functionalities. Built with Next.js, TypeScript, and MongoDB, this app leverages the latest technologies to deliver a robust and scalable solution.

## Features

### Authentication
- **User Registration**: Secure user registration with validation.
- **User Login**: Authentication using NextAuth.js.
- **Session Management**: Persistent sessions with secure token handling.

### AI Integration
- **AI-Powered Features**: Integration with AI services to enhance user experience.

### Notes Management
- **Create Notes**: Users can create and save notes.
- **Edit Notes**: Update existing notes.
- **Delete Notes**: Remove notes when no longer needed.
- **View Notes**: Retrieve and display notes.

### UI Components
- **Reusable Components**: A library of reusable UI components such as buttons, cards, dialogs, and more.
- **Responsive Design**: Optimized for mobile and desktop devices.

### Database
- **MongoDB Integration**: Secure and scalable database for storing user and application data.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/adesinaisaiah100/app_7.git
   ```
2. Navigate to the project directory:
   ```bash
   cd app_7
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following variables:
     ```env
     DATABASE_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
     NEXTAUTH_SECRET=<your-secret>
     ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
app_7/
├── app/
│   ├── ClientLayout.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (Componentslib)/
│   │   └── components/
│   │       └── themeprovider.tsx
│   ├── (Signin)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── Register/
│   │       └── page.tsx
│   ├── AI/
│   │   └── ai.tsx
│   ├── api/
│   │   ├── ai/
│   │   │   └── route.ts
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── login/
│   │   │   └── route.js
│   │   ├── notes/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── register/
│   │       └── route.js
│   └── styles/
│       └── globals.css
├── components/
│   ├── app-sidebar.tsx
│   ├── authForm.tsx
│   ├── header.tsx
│   ├── logoutButton.tsx
│   ├── signupform.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── input.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
├── hooks/
│   └── use-mobile.ts
├── lib/
│   ├── mongodb.ts
│   └── utils.ts
├── models/
│   ├── Notes.ts
│   └── user.js
├── public/
│   └── logo.png
├── scripts/
│   └── test-mongo.js
├── types/
├── utils/
│   └── database.js
└── README.md
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or support, please contact [adesinaisaiah100](https://github.com/adesinaisaiah100).
