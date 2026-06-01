# Realtime Chat Application 🚀

A modern, real-time chat application built with React, Node.js, Express, and Socket.IO. Features include multi-room chat, typing indicators, user presence, and more.

## Live Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/94c8e7c9-7b5f-4b4d-9b8a-7b8b4c5e3e3d/deploy-status)](https://realtime-chat-application.netlify.com)

## Features ✨

- **Real-time messaging** - Instant message delivery via WebSockets
- **Multi-room chat** - Switch between different chat rooms
- **User presence** - See who's online in real-time
- **Typing indicators** - Visual feedback when others are typing
- **Message search** - Find messages quickly with search functionality
- **Responsive design** - Works on desktop and mobile devices
- **Modern UI** - Clean, intuitive interface with gradient themes
- **Avatar system** - Personalized avatars for users
- **Message history** - Recent messages retained per room

## Tech Stack 🛠️

### Frontend
- React 19
- React Router DOM
- Socket.IO Client
- React Emoji
- CSS3 with modern gradients

### Backend
- Node.js
- Express 5
- Socket.IO
- CORS middleware

### DevOps
- GitHub Actions (CI/CD)
- Netlify deployment
- Automated testing

## Getting Started 📋

### Prerequisites

- Node.js 18+ (LTS)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   npm run install:all

   # Or install individually
   cd server && npm install
   cd ../client && npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `server` folder:
   ```env
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=*
   ```

4. **Run the application**
   ```bash
   # Run both server and client concurrently
   npm run dev

   # Or run individually in separate terminals
   npm run dev:server   # Terminal 1: Start server on port 5000
   npm run dev:client   # Terminal 2: Start React dev server on port 3000
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## Development 🧑‍💻

### Running Tests
```bash
cd client
npm test
```

### Linting
```bash
# Lint both client and server
npm run lint

# Lint specific part
npm run lint:client
npm run lint:server
```

### Building for Production
```bash
cd client
npm run build
```

## Project Structure

```
chat-app/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat/
│   │   │   ├── Join/
│   │   │   ├── Messages/
│   │   │   ├── Input/
│   │   │   ├── InfoBar/
│   │   │   └── TextContainer/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── netlify.toml
├── server/
│   ├── index.js
│   ├── router.js
│   ├── users.js
│   └── package.json
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── release.yml
├── .env.example
├── package.json
└── README.md
```

## CI/CD Pipeline 🔄

This project uses GitHub Actions for automated testing and deployment:

- **CI Workflow**: Runs tests on Node.js 18, 20, and 22
- **Security Scans**: Audit for known vulnerabilities
- **Deploy Workflow**: Auto-deploys to Netlify on main branch pushes
- **Release Workflow**: Creates GitHub releases on version tags

### Environment Variables Needed

For deployment, set these GitHub Secrets:
- `NETLIFY_AUTH_TOKEN` - Your Netlify auth token
- `NETLIFY_SITE_ID` - Your Netlify site ID

## Deployment 🚀

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build settings:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/build`
3. Add environment variables if needed
4. Click "Deploy site"

### Manual Deployment
```bash
cd client
npm run build
# Upload the build folder to your hosting provider
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the ISC License.

## Acknowledgments 🙏

- Built as part of a comprehensive tutorial series
- Uses Socket.IO for real-time communication
- Inspired by modern chat applications

## Support 💬

For support, join our chat room or open an issue on GitHub.

---

**Happy Chatting!** 💬🎉
