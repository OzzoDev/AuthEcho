import ConnectControls from "../../components/connect/ConnectControls";

export default function ConnectAppPage() {
  return (
    <div className="grid grid-cols-[1fr] xl:grid-rows-[auto_auto_auto] xl:grid-cols-[20%_60%_20%]">
      <section className="row-start-2 xl:row-auto space-y-10 p-10 xl:p-4 xl:border-r-[1px]">
        <h2 className="text-xl text-sky-300 font-semibold">
          Benefits of Developing with Authecho's SDK
        </h2>
        <p className="text-green-400">
          ✅ MERN-stack development is the leading technology stack for future-proofing your next
          application, ensuring high scalability and modularity.
        </p>
        <p>
          🪨 By choosing to use this SDK for your next application, you will have established the
          core of the app immediately after installation. When utilizing this SDK, you will benefit
          from:
        </p>
        <p>
          🚀 You will be provided with a substantial boilerplate of code that maximizes your
          productivity by allowing you to use pre-built components and features included in the SDK.
          This enables you, as a developer, to begin coding custom features tailored to the needs of
          your application right away.
        </p>
        <p>
          😉 The purpose of Authecho is to provide a secure, user-friendly, and developer-friendly
          service that allows users to manage and track their accounts more easily and centrally.
          This is achieved by offering the option to use the same account across multiple
          applications. For developers, the SDK is designed to facilitate account management setup
          quickly by utilizing the Authecho API, enabling any project or idea to connect to Authecho
          and start developing with the pre-built boilerplate that includes ready-to-use account
          management.
        </p>
        <p>
          📁 Currently, the SDK supports only MERN stack development due to high demand and
          increasing popularity among developers. The essentials included with this SDK are a folder
          for frontend code and one for backend logic. Significant effort has been dedicated to
          delivering a modern and smooth user interface, making it versatile enough for various
          projects.
        </p>
        <p>
          🔒 Given that security is a high priority for Authecho, the frontend code built in React
          incorporates a reverse proxy server that manages the forwarding of traffic to the React
          development server or the distribution folder in production. Simultaneously, it acts as a
          security layer for backend communication by ensuring that no API keys or URLs are exposed
          directly on the frontend, thereby protecting sensitive information from end users. This
          reverse proxy server is pre-configured to securely forward requests to the Authecho API
          when users sign in to your application and seamlessly redirects API requests to the
          included backend template. In this way, as a developer, you do not need to configure it
          yourself and can feel confident that data transmission is secure.
        </p>
        <p>
          🌐 Not only does this SDK include a sophisticated frontend to assist you in your
          development journey, but it also incorporates a state-of-the-art design pattern for the
          backend, leveraging modern and well-proven methods to ensure backend security. It uses
          middleware to handle CORS and authentication via JWTs stored in HTTP-only cookies, making
          it nearly impossible for an attacker to steal user credentials. Furthermore, the backend
          code includes a model for adding user information into your MongoDB database, but only
          after enforcing authentication via Authecho. You can easily set this up by providing the
          MongoDB URI during SDK installation. This allows you to manage your application
          effectively by assigning properties to the user model, with the assurance that passwords
          and authentication are securely handled by Authecho.
        </p>
        <p>
          📈 The Authecho application provides you with an easy way to manage your connected
          applications. When you log in to Authecho, the apps that you control or have access to as
          an administrator will be visible in your account dashboard. From this dashboard, you will
          be able to update the settings of these applications, including URLs, API keys,
          application names, and descriptions. More importantly, you will also have the ability to
          easily monitor user traffic on your applications, such as the number of logins within a
          given time frame and the total number of users on your app.
        </p>
      </section>

      <div className="row-start-1 xl:row-auto">
        <ConnectControls />
      </div>

      <section className="row-start-3 xl:row-auto space-y-10 p-10 xl:p-4 xl:border-l-[1px]">
        <h2 className="text-xl text-sky-300 font-semibold">
          The Core Building Block of the Authecho SDK
        </h2>
        <p className="text-lg bg-slate-800 p-2">📁 /client</p>
        <p>
          Encapsulates the frontend code, including the reverse proxy server and the React
          development server.
        </p>
        <p className="text-lg bg-slate-800 p-2">📁 /client/public</p>
        <p>Entry point for React with Vite.</p>
        <h3 className="text-xl text-cyan-400 font-semibold">What is Included?</h3>
        <ol className="flex flex-col space-y-6 pl-4 list-decimal">
          <li>
            <span className="text-gray-400 font-medium">TypeScript</span> - Assists with type safety
            and enhances the scalability of your project.
          </li>
          <li>
            <span className="text-gray-400 font-medium">Tailwind CSS</span> - A leading CSS
            framework for efficiently styling components.
          </li>
          <li>
            <span className="text-gray-400 font-medium">React Redux</span> - Global state management
            to facilitate better handling of states and avoid prop drilling.
          </li>
          <li>
            <span className="text-gray-400 font-medium">React Router</span> - A library that enables
            dynamic application routing, configured to align with the React Router documentation and
            enforce the use of createBrowserRouter().
          </li>
          <li>
            <span className="text-gray-400 font-medium">Axios</span> - An API management library
            that simplifies API integration, making it more maintainable and easier to work with.
          </li>
          <li>
            <span className="text-gray-400 font-medium">Framer Motion</span> - An extensive
            collection of animations that can be seamlessly integrated into your project to enhance
            user experience.
          </li>
          <li>
            <span className="text-gray-400 font-medium">React Spinners</span> - Ready-to-use
            spinners and loaders for handling asynchronous functionality, providing a visual
            indication of delays to users.
          </li>
        </ol>
        <h4 className="text-xl text-cyan-400 font-semibold">Important Components and Functions</h4>
        <ul className="flex flex-col space-y-6 pl-4 list-disc">
          <li>
            <span className="text-blue-400 font-medium">Navbar.tsx</span> - Designed to be
            responsive and dynamic, featuring a hamburger menu and animations, with easy options to
            add or remove links.
          </li>
          <li>
            <span className="text-blue-400 font-medium">Router.tsx</span> - The entry point for
            React routing and management of routes.
          </li>
          <li>
            <span className="text-blue-400 font-medium">RootLayout.tsx</span> - The main layout of
            the application, including background color and flex properties, as well as both header
            and footer components.
          </li>
          <li>
            <span className="text-blue-400 font-medium">types.ts</span> - A file to store all common
            and generic types, which includes types for interacting with the Authecho API.
          </li>
          <li>
            <span className="text-blue-400 font-medium">store.ts</span> - The root-level file for
            global state management, accounting for the distribution of all slices.
          </li>
          <li>
            <span className="text-blue-400 font-medium">SignInPage.tsx</span> - Handles
            authentication logic by allowing users to sign in with their Authecho accounts.
          </li>
        </ul>
        <p className="text-lg bg-slate-800 p-2">📁 /server</p>
        <p>
          A prebuilt Node.js backend server using the Express framework, including CORS and
          authentication handling to ensure secure access control.
        </p>
        <ul className="flex flex-col space-y-6 pl-4 list-disc">
          <li>
            <span className="text-green-400 font-medium">/controllers</span> - Controller functions
            responsible for handling the core logic of the backend, such as communication and
            updating the database.
          </li>
          <li>
            <span className="text-green-400 font-medium">/middlewares</span> - Functions that
            execute before any controller is triggered, these middleware functions ensure
            authentication and manage role-based access to certain endpoints.
          </li>
          <li>
            <span className="text-green-400 font-medium">/routes</span> - The routes utilized by the
            server, keeping controllers separate to more effectively group related logic. Middleware
            allows different routes to have distinct access control.
          </li>
        </ul>
      </section>
    </div>
  );
}
