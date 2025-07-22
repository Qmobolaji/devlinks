# DevLinks

DevLinks is a full-stack web application that allows users to create, customize, and share a personal profile page with links to their social and professional platforms. The app is built with Next.js, React, MongoDB, and Tailwind CSS, and features authentication, profile management, and CRUD operations for user links.

---

## Purpose

DevLinks helps users consolidate all their important links (GitHub, LinkedIn, Twitter, etc.) into a single, shareable profile page. Users can sign up, log in, add/edit/remove links, upload a profile picture, and preview their public profile.

---

## Major Features

- **User Authentication:** Secure signup and login using email and password.
- **Profile Management:** Update profile details and upload a profile picture.
- **Link Management:** Add, edit, reorder, and delete links to various platforms.
- **Live Preview:** Instantly preview your public profile page.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Toast Notifications:** User feedback for actions (success, errors).

---

## Tech Stack & Dependencies

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Radix UI, React Hook Form, Zod
- **Backend:** Next.js API routes, MongoDB (via Mongoose), bcryptjs (for password hashing)
- **Authentication:** NextAuth.js (credentials provider)
- **UI Components:** Lucide Icons, Radix UI, custom components
- **Other:** clsx, tailwind-merge, react-loader-spinner

---

## Folder Structure

- `/app` - Next.js pages and layouts
- `/components` - React UI components
- `/models` - Mongoose models for User and Link
- `/lib` - Utility functions, schema validation, and database connection
- `/hooks` - Custom React hooks (e.g., use-toast, use-is-desktop)
- `/public` - Static assets (images, SVGs)
- `/styles` - Global CSS (Tailwind)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- [Optional] Yarn or npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/devlinks.git
   cd devlinks
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory with the following:

   ```
   MONGODB_URI_LOCAL=mongodb://localhost:27017/devlinks
   MONGODB_URI_PROD=your_production_mongodb_uri
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Build & Deploy

### Build for Production

```sh
npm run build
npm start
```

### Deployment

You can deploy DevLinks to platforms like Vercel, Netlify, or your own server.  
Make sure to set the required environment variables in your deployment settings.

---

## API Endpoints

- `/api/user` - Get/update user profile
- `/api/signup` - Register new user
- `/api/login` - Authenticate user
- `/api/links/new` - Add/update/delete user links
- `/api/links/[id]` - Get links for a user
- `/api/userExists` - Check if user exists

---

## License

MIT

---

## Author

Built by [Abdulquadri Jinad](https://omobolaji.vercel.app/) - [GitHub](https://github.com/Qmobolaji)
