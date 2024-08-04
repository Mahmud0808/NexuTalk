<div align="center">
  <br />
    <img src="https://i.postimg.cc/syJzzwf1/NexuTalk.png" alt="Project Banner">
  <br />
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=393D72" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=1FAD58" alt="mongodb" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=3FBFF8" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Shadcn_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=1f223b" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Zod-black?style=for-the-badge&logoColor=white&logo=zod&color=4053BA" alt="zod" />
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=387CC8" alt="typescript" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=0A3C54" alt="prisma" />
    <img src="https://img.shields.io/badge/-Pusher-black?style=for-the-badge&logoColor=white&logo=pusher&color=361A59" alt="pusher" />
  </div>

  <h2 align="center">Quirklr</h2>

  <div align="center">
     <b>NexuTalk</b> is a real-time chatting platform built with cutting-edge technologies, offering seamless communication with a modern UI. It supports features such as group conversations, single conversations, online status, responsive design for various devices, image sharing, and dark/light mode.
  </div>
  <br />
  <a href="https://nexutalk.vercel.app/"><strong>➥ Visit NexuTalk App</strong></a>
</div>

## ✨ Features

- **Real-time Messaging:** Instant messaging with real-time updates.

- **Group Conversations:** Create and manage group chats.

- **Single Conversations:** One-on-one messaging.

- **Online Status:** See who's online.

- **Responsive Design:** Optimized for mobile, tablet, and desktop views.

- **Image Sharing:** Share images within conversations.

- **Dark/Light Mode:** Switch between dark and light themes.

- and many more, including code architecture and reusability.

## ⚙️ Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, Shadcn

- **Backend:** Next.js, Prisma, MongoDB, Pusher

- **Authentication:** NextAuth

- **Validation:** Zod

- **Image Upload:** Cloudinary

## 🚀 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/Mahmud0808/NexuTalk.git
cd NexuTalk
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a new file named `.env` in the root of your project and add the following content:

```env
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_URL="http://localhost:3000/"
NEXTAUTH_SECRET=
NEXTAUTH_JWT_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_SECRET=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up for the corresponding websites on [MongoDB](https://www.mongodb.com/), [Google Cloud Console](https://console.cloud.google.com/), [GitHub](https://github.com/), [Cloudinary](https://cloudinary.com/), and [Pusher](https://pusher.com/).

#### Google Cloud Console secrets:

- Go to Google Cloud Console > Create new project > Select the project > Search for APIs & Services > OAuth consent screen > Make sure to select External User Type > Continue, add app domain, authorized domain and developer contact information.

- Then go to Credentials > Create Credentials > OAuth client ID:

  - Application type: Web application

  - Add your site home page URL without any forward slash `/` at the end in Authorized JavaScript origins field, skip this if you are not deploying your site and using it in localhost. e.g: `https://nexutalk.vercel.app`

  - Add your site URL in this format `{site_url}/api/auth/callback/google`. e.g: `http://localhost:3000/api/auth/callback/google`

#### GitHub secrets:

- Go to GitHub > Settings > Developer settings > OAuth Apps > New OAuth App:

  - Add your site URL in Homepage URL and Authorized callback URL fields.

#### Cloudinary secrets:

- Go to Cloudinary > Settings > Upload > Add upload preset:

  - Signing Mode: Unsigned

  - Copy the name and use it in environment variables.

#### Pusher secrets:

- Go to Pusher > Channels:

  - Front end: React
 
  - Back end: Node.js

  - Get the environment variables from App Keys page.

### Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

- Fork the repository.
- Create your feature branch (`git checkout -b feature/AmazingFeature`).
- Commit your changes (`git commit -m 'Add some AmazingFeature'`).
- Push to the branch (`git push origin feature/AmazingFeature`).
- Open a pull request.

## 📬 Contact

Wanna reach out to me? DM me at 👇

Email: mahmudul15-13791@diu.edu.bd