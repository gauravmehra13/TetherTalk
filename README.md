# ✨ TetherTalk - MERN Stack Chat App ✨

Welcome to our comprehensive guide for setting up and running the Full Stack Realtime Chat App. This project leverages cutting-edge technologies to provide a seamless and engaging user experience.

**Tech Stack:**

- **ViteJS**: A modern development server that provides fast and efficient project setup and management.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Zustand**: A state management library for React applications.
- **Socket.io**: A JavaScript library for real-time communication over the web.
- **MongoDB**: A NoSQL document-based database for storing and managing data.
- **Mongoose**: A MongoDB ORM for Node.js that simplifies database interactions.

**Features:**

- **Authentication (JWT)**: Secure user authentication using JSON Web Tokens.
- **Active Users**: Real-time tracking of active users for a more engaging experience.
- **Realtime Messaging**: Instant messaging capabilities for seamless communication.
- **Image Upload**: Users can share images with each other, enhancing the chat experience.
- **Deleting Conversation**: Users can delete conversations, ensuring a clean and organized chat history.
- **Profile Update**: Users can update their profiles, including profile pictures and other information.
- **Beautiful Themes (with Daisy)**: A visually appealing theme system, including the Daisy theme, to enhance the user interface.

**Product Images:**

You can find product images in the `public/project-images` directory. The images are named `tethertalk1.png` and `tethertalk2.png`.

**Setting Up the Environment Variables:**

To ensure the app runs smoothly, you need to configure the environment variables in the `.env` file. Please follow the format below:

```js
MONGODB_URI=your_mongodb_uri_here
PORT=5001
JWT_SECRET=your_jwt_secret_here

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here

NODE_ENV=development
CLIENT_URL=http://localhost:5173 // Ensure this matches your VITE_API_URL
```

Additionally, you need to configure Vite-specific environment variables in the `vite.config.js` file:

```js
VITE_API_URL=http://localhost:5173
VITE_MODE=development
```

**Starting the App Locally:**

To start the app locally, follow these steps:

**Backend:**

1. Navigate to the /backend directory in your terminal.
2. Run `npm run dev` to start the backend server.
3. The backend server will be running on `http://localhost:5001`.

**Frontend:**

1. Navigate to the /frontend directory in your terminal.
2. Run `npm run dev` to start the frontend server.
3. The frontend server will be running on `http://localhost:5173`.

Open your web browser and navigate to `http://localhost:5173` to access the app.
