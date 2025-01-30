type FileColor = {
  color: string;
  extensions: string[];
};

type Dependency = {
  entry: "React app" | "Reverse proxy server" | "Backend server";
  dependency: string;
  desc: string;
};

type MappedDependency = {
  entry: string;
  dependencies: { dependency: string; desc: string }[];
};

type Intro = {
  header: string;
  contentItems: string[];
};

type RouteInfo = {
  path: string;
  desc: string;
  role?: string;
};

export const FILEEXTENSION_COLORS: FileColor[] = [
  { color: "#02bbdb", extensions: ["tsx", "ts"] },
  { color: "#e3df05", extensions: ["jsx", "js", "cjs"] },
  { color: "#069e27", extensions: ["json"] },
  { color: "#f00e25", extensions: ["gitignore", "html"] },
  { color: "#5776f2", extensions: ["md"] },
  { color: "#ffa805", extensions: ["env"] },
  { color: "#83ebfc", extensions: ["css"] },
  { color: "#fffd8f", extensions: ["svg"] },
];

export const DEPENDENCIES: Dependency[] = [
  {
    entry: "React app",
    dependency: "react",
    desc: "React is a JavaScript library for building user interfaces, particularly single-page applications where you need a dynamic and responsive user experience. It allows developers to create reusable UI components, manage state, and handle user interactions efficiently. For example, you can use React to build complex forms that update in real-time as users input data.",
  },
  {
    entry: "React app",
    dependency: "react-router",
    desc: "React Router is a powerful library that enables navigation among different components in a React application without reloading the page. It allows you to create single-page applications with multiple views, making it easy to manage routes and transitions. For instance, you might use React Router to set up different pages like Home, About, and Contact, allowing users to navigate seamlessly between them.",
  },
  {
    entry: "React app",
    dependency: "react-redux",
    desc: "React Redux is a binding library that helps you manage application state across components using the Redux architecture. It allows you to share data and actions between components effectively, which is especially useful in larger applications where many components need access to the same data. For example, you could use React Redux to manage user authentication status across your app, ensuring that all components reflect the current user's state.",
  },
  {
    entry: "React app",
    dependency: "@reduxjs/toolkit",
    desc: "Redux Toolkit simplifies the process of writing Redux logic by providing a set of tools and best practices out of the box. It includes features like the createSlice function to manage state and actions together, making it easier to set up and maintain your Redux store. For example, you can use Redux Toolkit to create a slice for managing a shopping cart in an e-commerce application, allowing you to handle adding, removing, and updating items effortlessly.",
  },
  {
    entry: "React app",
    dependency: "react-spinners",
    desc: "React Spinners is a library of loading indicators that can be used to enhance the user experience during data fetching or processing. It provides various spinner styles that can be easily integrated into your components. For instance, you might use a loading spinner while fetching data from an API to indicate to users that something is happening in the background.",
  },
  {
    entry: "React app",
    dependency: "axios",
    desc: "Axios is a promise-based HTTP client for making requests to external APIs. It simplifies the process of sending asynchronous requests and handling responses, making it a popular choice for data fetching in React applications. For example, you can use Axios to retrieve user information from a REST API and then display it in your app, ensuring smooth interactions with external services.",
  },
  {
    entry: "React app",
    dependency: "framer-motion",
    desc: "Framer Motion is a library for creating animations and transitions in React applications. It provides an intuitive API for adding motion to your components, enhancing the visual appeal of your app. For instance, you could use Framer Motion to animate a modal dialog that slides in and out, creating a smooth user experience.",
  },
  {
    entry: "React app",
    dependency: "tailwindcss",
    desc: "Tailwind CSS is a utility-first CSS framework that allows developers to build custom designs quickly by composing utility classes. It promotes a different approach to styling compared to traditional CSS frameworks, enabling a more efficient workflow. For instance, you can use Tailwind CSS to rapidly style a button by applying utility classes directly in your JSX, leading to a consistent and responsive design.",
  },
  {
    entry: "Reverse proxy server",
    dependency: "express",
    desc: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies the process of creating server-side applications and APIs. For example, you can use Express to set up a RESTful API that serves data to your frontend application, handling various HTTP requests seamlessly.",
  },
  {
    entry: "Reverse proxy server",
    dependency: "dotenv",
    desc: "Dotenv is a module that loads environment variables from a .env file into process.env in Node.js applications. This is useful for managing configuration settings and sensitive information like API keys. For instance, you can use dotenv to keep your database connection string hidden in a .env file, ensuring that it is not exposed in your source code.",
  },
  {
    entry: "Reverse proxy server",
    dependency: "http-proxy-middleware",
    desc: "Http-Proxy-Middleware is a middleware for creating proxy servers in Node.js applications. It allows you to redirect requests from your front end to a different backend server, which can help with API integration and handling CORS issues. For example, you might use this middleware to proxy requests from your React app to a backend API, circumventing cross-origin restrictions.",
  },
  {
    entry: "Reverse proxy server",
    dependency: "path",
    desc: "Path is a built-in Node.js module that provides utilities for working with file and directory paths. It allows you to manipulate file paths in a cross-platform way, ensuring your application works on different operating systems. For instance, you can use the path module to construct paths to static files in your Express server, making it easier to manage your file structure.",
  },
  {
    entry: "Reverse proxy server",
    dependency: "concurrently",
    desc: "Concurrently is a tool that allows you to run multiple commands simultaneously in your terminal. This is particularly useful in development environments where you need to run both a frontend and a backend server at the same time. For example, you can use concurrently to start your React app and Express server with a single command, streamlining your development workflow.",
  },
  {
    entry: "Backend server",
    dependency: "express",
    desc: "Express is also essential for backend server development, providing a simple and flexible framework for creating APIs and serving web content. It handles routing, middleware, and request/response management, making it a powerful choice for building RESTful services. For instance, you might create an Express API to handle user authentication and serve data to your frontend application.",
  },
  {
    entry: "Backend server",
    dependency: "dotenv",
    desc: "As in the reverse proxy context, dotenv is crucial for backend applications to manage environment-specific settings and sensitive information. It helps keep your application configuration clean and secure by loading variables from a .env file. For example, you can use dotenv to store and access your database credentials without hardcoding them into your application.",
  },
  {
    entry: "Backend server",
    dependency: "cors",
    desc: "CORS (Cross-Origin Resource Sharing) is a middleware that allows you to configure your backend server to accept requests from different origins. This is essential for web applications that make requests to APIs hosted on different domains. For instance, you can use the cors package in your Express server to allow your React app to fetch data from your backend without encountering cross-origin issues.",
  },
  {
    entry: "Backend server",
    dependency: "mongoose",
    desc: "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward way to interact with MongoDB databases by defining schemas and models. For example, you can use Mongoose to define a User model for your application, allowing you to easily create, read, update, and delete user data in your MongoDB database.",
  },
  {
    entry: "Backend server",
    dependency: "bcrypt",
    desc: "Bcrypt is a library for hashing passwords, providing a secure way to store user credentials. It uses a one-way hashing algorithm, making it difficult for attackers to retrieve original passwords. For instance, you can use bcrypt to hash user passwords before storing them in your MongoDB database, ensuring that sensitive information is protected.",
  },
  {
    entry: "Backend server",
    dependency: "body-parser",
    desc: "Body-Parser is middleware for Node.js that parses incoming request bodies in a middleware before your handlers, making it accessible under the req.body property. It supports various content types, such as JSON and URL-encoded data. For example, you can use body-parser to parse JSON request bodies sent from your React app, allowing you to access the submitted data easily.",
  },
  {
    entry: "Backend server",
    dependency: "cookie-parser",
    desc: "Cookie-Parser is a middleware that parses Cookie header and populates req.cookies with an object keyed by the cookie names. This is useful for managing user sessions and storing small pieces of data on the client-side. For instance, you can use cookie-parser to read session cookies, allowing you to maintain user authentication state across requests.",
  },
  {
    entry: "Backend server",
    dependency: "crypto",
    desc: "Crypto is a built-in Node.js module that provides cryptographic functionality, including a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions. You can use the crypto module to generate secure random tokens or hashes for various security purposes, such as creating unique identifiers for sessions.",
  },
  {
    entry: "Backend server",
    dependency: "jsonwebtoken",
    desc: "Jsonwebtoken is a library for creating and verifying JSON Web Tokens (JWTs). JWTs are commonly used for authentication and information exchange in web applications. For example, you can use jsonwebtoken to generate a token when a user logs in, allowing them to authenticate their requests without sending their credentials repeatedly.",
  },
];

export const INTRO_CONTENT: Intro[] = [
  {
    header: "Security Layers",
    contentItems: [
      "The SDK is designed to route all data through a reverse proxy server. This architecture effectively mitigates the risk of exposing sensitive backend information to the frontend, enhancing overall application security.",
      "During the sign-up process, users are required to undergo an email verification step. This ensures that only verified individuals are granted access, significantly reducing the likelihood of unauthorized access.",
      "To bolster account security, all users must establish a security question during account setup. This additional layer serves as a safeguard, providing an extra level of protection during account recovery and access attempts.",
      "Every sign-in attempt mandates the entry of an email verification code that is valid for only one use. This mechanism significantly hampers the ability of attackers to exploit compromised credentials. Should an invalid code be entered, users must correctly answer their security question to request a new code, further reinforcing security.",
      "In the case of account suspension, users can seamlessly recover access through the official website. This user-centric approach ensures minimal disruption and supports effective account management.",
      "All sensitive data is secured using advanced encryption techniques, including strong hashing algorithms. This guarantees that passwords and other critical information remain protected against potential decryption attempts.",
      "Access to backend servers is strictly controlled through the use of API keys and rigorous CORS policies. Only verified applications are permitted to interact with the authentication system, ensuring that backend resources are safeguarded against unauthorized access.",
    ],
  },
  {
    header: "Ready-to-Use Authentication",
    contentItems: [
      "Implement top-tier security measures that safeguard user data, ensuring compliance with industry standards and regulations. This commitment to security builds trust with your users and mitigates risks associated with data breaches.",
      "Eliminate the complexities and headaches associated with configuring security protocols for account management. Our SDK simplifies this process, allowing your development team to focus on core functionalities rather than security concerns.",
      "Benefit from centralized account management, which streamlines user access and enhances administrative control. This feature allows for efficient user onboarding, management, and monitoring, facilitating a smoother operational workflow.",
      "Access comprehensive documentation and support resources designed to assist with seamless implementation. This ensures that your team can quickly integrate the authentication system and leverage its features effectively.",
      "Utilize scalable solutions that can accommodate growing user bases. As your business expands, the SDK adapts to your needs, ensuring consistent performance and user experience without the need for significant reconfiguration.",
      "Provide a user-friendly experience that allows users to remain logged in for extended periods, thanks to robust security features. This not only enhances user satisfaction but also fosters increased engagement and retention.",
    ],
  },
  {
    header: "The Development Experience",
    contentItems: [
      "The SDK comes with a fully organized React folder structure, encompassing components, custom hooks, and routing mechanisms. This pre-configured setup accelerates the development process, allowing teams to focus on building features rather than configuring the project structure.",
      "With built-in TypeScript support, the SDK ensures type safety throughout the development lifecycle. This is especially beneficial for large-scale applications, as it reduces runtime errors and enhances code maintainability, making collaboration among developers more efficient.",
      "Tailwind CSS is integrated directly into the SDK, empowering developers to implement responsive designs swiftly. This eliminates the need for additional styling libraries, enabling teams to concentrate on delivering a polished user interface from the outset.",
      "The SDK includes robust components for layout and animation, such as a responsive animated navigation bar and smooth page transition elements. These features not only improve user engagement but also enhance the overall aesthetic appeal of the application.",
      "A predefined Redux Toolkit store is included for streamlined global state management. This simplifies data handling across the application, facilitating better state synchronization and enhancing performance.",
      "Designed for seamless integration, all components of the SDK work cohesively, serving as a reliable foundation for larger applications. Each page and component acts as a customizable template, allowing businesses to tailor the SDK to their specific operational needs and branding.",
    ],
  },
];

export const ROUTES: RouteInfo[] = [
  {
    path: "/",
    desc: "The root of the application, serving as the primary entry point for users. This route typically contains general information about the application and may provide navigation to other key sections.",
  },
  {
    path: "/signin",
    desc: "The sign-in page where users can enter their credentials to access their accounts. This route facilitates user authentication and is crucial for securing user data.",
  },
  {
    path: "/account",
    desc: "Upon successful authentication, users will be redirected to their account page. This route provides access to user-specific functionalities, settings, and information, enhancing the personalized experience.",
    role: "Access to this route is restricted to authenticated users. Unauthorized users will be redirected to the sign-in page.",
  },
  {
    path: "/admin",
    desc: "The admin page designated for application administrators. This route grants access to administrative functionalities, such as user management and system settings, which are essential for maintaining the application.",
    role: "Only users with administrative privileges are permitted to access this route. Unauthorized access attempts will be denied.",
  },
  {
    path: "*",
    desc: "A catch-all route that handles any undefined paths within the application. When users attempt to navigate to a route that does not exist, this route renders a 'Not Found' page, guiding users back to valid sections of the application.",
  },
];

export const mappedDependencies = DEPENDENCIES.reduce<MappedDependency[]>(
  (acc, { entry, dependency, desc }) => {
    let category = acc.find((cat) => cat.entry === entry);

    if (!category) {
      category = { entry, dependencies: [] };
      acc.push(category);
    }

    category.dependencies.push({ dependency, desc });

    return acc;
  },
  []
);

export function findFileColor(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");

  const fileExtension = lastDotIndex !== -1 ? fileName.slice(lastDotIndex + 1) : "";

  if (fileExtension) {
    return (
      FILEEXTENSION_COLORS.find((ext) => ext.extensions.includes(fileExtension))?.color || "white"
    );
  }
  return "white";
}
