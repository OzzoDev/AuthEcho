import ProjectTreeFile from "./ProjectTreeFile";
import ProjectTreeFolder from "./ProjectTreeFolder";

export default function ProjectTree() {
  return (
    <div className="max-w-[90%] xl:max-w-[1400px] m-auto">
      <h2 className="text-center text-2xl text-sky-300 mb-[70px]">
        All Included Files Facilitating a Seamless and Effective Development Experience with
        Authecho's SDK
      </h2>
      <ProjectTreeFolder
        name="client"
        desc="The root directory for the frontend code encompasses a reverse proxy that manages traffic routing to the React server while also serving as a security layer for API calls.">
        <ProjectTreeFile
          name=".env"
          desc="Environment variables for securely interacting with the Authecho API through the reverse proxy, ensuring that no sensitive information is exposed to the end user."
        />
        <ProjectTreeFile
          name=".gitignore"
          desc="Specifies files and directories, such as the .env file and the node_modules folder, to be excluded from version control in Git, preventing them from being pushed to GitHub."
        />
        <ProjectTreeFile
          name="package-lock.json"
          desc="Automatically generated file that locks the versions of dependencies and their transitive dependencies, ensuring consistent installations across different environments."
        />
        <ProjectTreeFile
          name="package.json"
          desc="Defines the project's dependencies, scripts, and metadata, serving as the primary configuration file for Node.js projects."
        />
        <ProjectTreeFile
          name="reverseProxy.js"
          desc="Manages routing for the React application while providing security for the backend services, ensuring seamless communication and protection against direct access."
        />
        <ProjectTreeFolder
          name="public"
          desc="Directory routed to by the reverse proxy for the React application, containing all frontend-related code, including assets and static files.">
          <ProjectTreeFile
            name=".gitignore"
            desc="Specifies files and directories, such as the .env file and the node_modules folder, to be excluded from version control in Git, preventing them from being pushed to GitHub."
          />
          <ProjectTreeFile
            name="eslint.config.js"
            desc="Configuration file for ESLint, specifying coding standards and rules to enforce consistent code quality and style across the project."
          />
          <ProjectTreeFile
            name="index.html"
            desc="The main HTML file serving as the entry point for the web application, containing the structure for rendering the React app and linking to styles and scripts."
          />
          <ProjectTreeFile
            name="package-lock.json"
            desc="Automatically generated file that locks the versions of dependencies and their sub-dependencies for consistent installations across environments."
          />
          <ProjectTreeFile
            name="package.json"
            desc="Defines project metadata, scripts, and dependencies for the application, managing the project's package configuration."
          />
          <ProjectTreeFile
            name="postcss.config.cjs"
            desc="Configuration file for PostCSS, specifying plugins and settings for transforming CSS with modern features."
          />
          <ProjectTreeFile
            name="README.md"
            desc="Markdown file providing documentation, instructions, and information about the project, its setup, and usage."
          />
          <ProjectTreeFile
            name="tailwind.config.js"
            desc="Configuration file for Tailwind CSS, defining custom themes, colors, and responsive design settings for the application."
          />
          <ProjectTreeFile
            name="tsconfig.app.json"
            desc="TypeScript configuration file for the application, specifying compiler options and settings specific to the app context."
          />
          <ProjectTreeFile
            name="tsconfig.node.json"
            desc="TypeScript configuration file for Node.js environment, defining compiler settings tailored for server-side code."
          />
          <ProjectTreeFile
            name="vite.config.ts"
            desc="Configuration file for Vite, specifying build and development server settings for optimizing the application workflow."
          />
          <ProjectTreeFolder
            name="src"
            desc="Source directory for the React application, containing all the main components, styles, and TypeScript definitions.">
            <ProjectTreeFile
              name="App.tsx"
              desc="Main application component that serves as the root of the React app, managing routing and global state."
            />
            <ProjectTreeFile
              name="index.css"
              desc="Global CSS file that styles the entire application, providing base styles and layout configurations."
            />
            <ProjectTreeFile
              name="main.tsx"
              desc="Entry point of the React application, rendering the main component and initializing the application."
            />
            <ProjectTreeFile
              name="vite-env.d.ts"
              desc="TypeScript declaration file that provides type definitions for Vite-specific features and modules."
            />
            <ProjectTreeFolder
              name="assets"
              desc="Directory containing static assets for the application, including images and icons used throughout the app.">
              <ProjectTreeFile
                name="authechoLogo.svg"
                desc="SVG logo file for the AuthEcho application, used for branding and visual identity."
              />
              <ProjectTreeFile
                name="notFound.svg"
                desc="SVG image displayed when a requested resource is not found, serving as a visual representation of a 404 error."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="components"
              desc="Directory containing reusable React components for the application, organized by functionality.">
              <ProjectTreeFolder
                name="account"
                desc="Component library for user account management.">
                <ProjectTreeFile
                  name="AccountDashboard.tsx"
                  desc="Main component that serves as the parent for the user account dashboard."
                />
                <ProjectTreeFile
                  name="AccountHeader.tsx"
                  desc="Header component displaying user information and managing sign-out functionality."
                />
                <ProjectTreeFile
                  name="AccountPanel.tsx"
                  desc="Core component responsible for conditionally rendering content based on the selected tab."
                />
                <ProjectTreeFile
                  name="AccountSidebar.tsx"
                  desc="Sidebar component listing the available tabs in the account dashboard."
                />
                <ProjectTreeFile
                  name="AccountSidebarTab.tsx"
                  desc="Component that facilitates tab switching within the account sidebar."
                />
              </ProjectTreeFolder>
              <ProjectTreeFolder
                name="admin"
                desc="Component library for administrative dashboard functionalities.">
                <ProjectTreeFile
                  name="AdminDashboard.tsx"
                  desc="Main component that serves as the parent for all administrative dashboard elements."
                />
                <ProjectTreeFile
                  name="AdminAccountBar.tsx"
                  desc="Bar component for managing account functionalities with multiple tabs."
                />
                <ProjectTreeFile
                  name="AdminAccountBarTab.tsx"
                  desc="Component responsible for handling tab changes within the admin account bar."
                />
                <ProjectTreeFile
                  name="AdminHeader.tsx"
                  desc="Header component displaying admin user information and managing sign-out functionality."
                />
                <ProjectTreeFile
                  name="AdminPanel.tsx"
                  desc="Core component that conditionally renders content based on the selected tab in the admin dashboard."
                />
                <ProjectTreeFile
                  name="AdminSidebar.tsx"
                  desc="Sidebar component presenting the available management tabs for administrators."
                />
                <ProjectTreeFile
                  name="AdminSidebarTab.tsx"
                  desc="Component that facilitates tab switching within the admin sidebar."
                />
              </ProjectTreeFolder>
              <ProjectTreeFolder
                name="btn"
                desc="Folder containing button components, offering different styles for user interactions.">
                <ProjectTreeFile
                  name="PrimaryBtn.tsx"
                  desc="Primary button component styled for primary actions in the application."
                />
                <ProjectTreeFile
                  name="SecondaryBtn.tsx"
                  desc="Secondary button component styled for secondary actions, providing a visual distinction from primary buttons."
                />
              </ProjectTreeFolder>
              <ProjectTreeFolder
                name="signIn"
                desc="Folder containing components related to the sign-in process, including form elements and structures.">
                <ProjectTreeFile
                  name="FormCheckbox.tsx"
                  desc="Checkbox component used in forms, allowing users to select multiple options."
                />
                <ProjectTreeFile
                  name="FormError.tsx"
                  desc="Component for displaying error messages related to form validation."
                />
                <ProjectTreeFile
                  name="FormFooter.tsx"
                  desc="Footer component for sign-in forms, typically containing action buttons."
                />
                <ProjectTreeFile
                  name="FormHeader.tsx"
                  desc="Header component for sign-in forms, providing titles or instructions for users."
                />
                <ProjectTreeFile
                  name="FormPasswordInput.tsx"
                  desc="Input component specifically for password entry, with secure input features."
                />
                <ProjectTreeFile
                  name="FormTextInput.tsx"
                  desc="Text input component used for entering various types of user data."
                />
                <ProjectTreeFile
                  name="PasswordForm.tsx"
                  desc="Form component focused on password management, including creation and reset functionalities."
                />
                <ProjectTreeFile
                  name="QuestionForm.tsx"
                  desc="Form component designed for user inquiries, allowing for question submissions."
                />
                <ProjectTreeFile
                  name="UserForm.tsx"
                  desc="General user information form component for collecting user data."
                />
                <ProjectTreeFile
                  name="VerifyForm.tsx"
                  desc="Form component for user verification processes, including email or phone verification."
                />
              </ProjectTreeFolder>
              <ProjectTreeFile
                name="ProtectedRoute.tsx"
                desc="Component that protects routes from unauthorized access, ensuring users are authenticated before accessing certain pages."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="constants"
              desc="Directory for storing constant values and configuration settings used throughout the application.">
              <ProjectTreeFile
                name="api-config.ts"
                desc="Configuration file for the SDK's API, defining URLs and endpoints."
              />
              <ProjectTreeFile
                name="authecho-config.ts"
                desc="Configuration file containing settings specific to the AuthEcho api, such as API url and endpoints"
              />
              <ProjectTreeFile
                name="constants.ts"
                desc="File defining general constant values used across the application, promoting consistency and reducing magic numbers."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="hooks"
              desc="Directory containing custom React hooks that encapsulate reusable logic for various functionalities within the application.">
              <ProjectTreeFolder
                name="authecho"
                desc="Folder containing hooks specifically designed for managing AuthEcho-related functionalities, including API interactions and authentication.">
                <ProjectTreeFile
                  name="useAuthechoApi.ts"
                  desc="Hook for interacting with the AuthEcho API, providing methods for making authenticated requests."
                />
                <ProjectTreeFile
                  name="useAuthechoApiStore.ts"
                  desc="Hook that manages the state of API responses and data for the AuthEcho module."
                />
                <ProjectTreeFile
                  name="useAuthechoAuth.ts"
                  desc="Hook for handling authentication logic, such as login and logout processes."
                />
                <ProjectTreeFile
                  name="useAuthechoAuthStore.ts"
                  desc="Hook that manages the authentication state and user session for the AuthEcho application."
                />
                <ProjectTreeFile
                  name="useNavigateAdmin.ts"
                  desc="Hook that facilitates navigation to admin-specific routes, ensuring proper access control."
                />
              </ProjectTreeFolder>
              <ProjectTreeFile
                name="useApi.ts"
                desc="Encapsulates logic for interacting with the SDK's built-in API, providing a dynamic approach to handle API calls with various methods and request bodies."
              />
              <ProjectTreeFile
                name="useOutsideClicks.ts"
                desc="Custom hook for detecting clicks outside a specified element, useful for dropdowns and modals."
              />
              <ProjectTreeFile
                name="useSessionStorage.ts"
                desc="Hook for managing session storage, providing a simple interface for storing and retrieving data in the session storage."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="layouts"
              desc="Directory containing layout components that define the structure and common elements of pages in the application.">
              <ProjectTreeFolder
                name="animation"
                desc="Folder containing animation components for enhancing visual effects and transitions within the application.">
                <ProjectTreeFile
                  name="FadeInOnScroll.tsx"
                  desc="Component that fades in elements as they scroll into view, enhancing user engagement."
                />
                <ProjectTreeFile
                  name="SlideInFromBottom.tsx"
                  desc="Component that slides in elements from the bottom of the viewport, adding a dynamic entry effect."
                />
              </ProjectTreeFolder>
              <ProjectTreeFolder
                name="footer"
                desc="Folder containing footer layout components for consistent page footers across the application.">
                <ProjectTreeFile
                  name="Footer.tsx"
                  desc="Footer component that provides links and information at the bottom of each page."
                />
              </ProjectTreeFolder>
              <ProjectTreeFolder
                name="nav"
                desc="Folder containing navigation components for routing and menu structures within the application.">
                <ProjectTreeFile
                  name="Navbar.tsx"
                  desc="Navbar component that serves as the primary navigation menu for the application."
                />
                <ProjectTreeFile
                  name="Link.tsx"
                  desc="Custom link component for navigation, enhancing styling and behavior of standard links."
                />
              </ProjectTreeFolder>
              <ProjectTreeFile
                name="AuthLayout.tsx"
                desc="Layout component tailored for authentication-related pages, providing a consistent structure for sign-in and registration."
              />
              <ProjectTreeFile
                name="PageTransition.tsx"
                desc="Component that manages page transition animations, enhancing the user experience during navigation."
              />
              <ProjectTreeFile
                name="SimplifiedLayout.tsx"
                desc="Minimal layout component designed for pages that require a less complex structure."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="pages"
              desc="Directory containing individual page components, each representing a distinct view or route in the application.">
              <ProjectTreeFile
                name="AccountPage.tsx"
                desc="Page component for user account management, including profile details and settings."
              />
              <ProjectTreeFile
                name="AdminPage.tsx"
                desc="Page component designed for administrative functions, accessible only to authorized users."
              />
              <ProjectTreeFile
                name="HomePage.tsx"
                desc="HomePage page component that serves as the entry point for users, typically showcasing key features."
              />
              <ProjectTreeFile
                name="NotFoundPage.tsx"
                desc="Page component displayed when a requested route is not found, serving as a 404 error page."
              />
              <ProjectTreeFile
                name="SignInPage.tsx"
                desc="Page component for user sign-in, including forms and authentication logic."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="router"
              desc="Directory responsible for managing the application's routing architecture, facilitating navigation between various views and components.">
              <ProjectTreeFile
                name="Router.tsx"
                desc="Central routing component of the application, utilizing createBrowserRouter to define and manage all routes. This component ensures seamless navigation across different pages, enhancing the user experience by enabling dynamic routing and lazy loading of components."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="store"
              desc="Directory containing Redux slices and store configuration for managing application state.">
              <ProjectTreeFile
                name="authechoApiSlice.ts"
                desc="Redux slice for managing API interactions related to the AuthEcho application, handling data fetching and state management."
              />
              <ProjectTreeFile
                name="authechoAuthSlice.ts"
                desc="Redux slice for managing authentication state and user session for the AuthEcho application."
              />
              <ProjectTreeFile
                name="store.ts"
                desc="Configuration file for the Redux store, combining reducers and applying middleware."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="styles"
              desc="Directory containing CSS files for styling various components and layouts in the application.">
              <ProjectTreeFile
                name="footer.css"
                desc="CSS file for styling the footer component, defining its appearance and layout."
              />
              <ProjectTreeFile
                name="navbar.css"
                desc="CSS file for styling the navbar component, enhancing its design and responsiveness."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="types"
              desc="Directory containing TypeScript type definitions used throughout the application for type safety.">
              <ProjectTreeFile
                name="types.ts"
                desc="File defining custom TypeScript types and interfaces to ensure type safety and clarity in the application."
              />
            </ProjectTreeFolder>
            <ProjectTreeFolder
              name="utils"
              desc="Directory containing utility functions and helpers that provide reusable logic across the application.">
              <ProjectTreeFile
                name="utils.ts"
                desc="File containing various utility functions that simplify common tasks and enhance code reusability."
              />
            </ProjectTreeFolder>
          </ProjectTreeFolder>
        </ProjectTreeFolder>
      </ProjectTreeFolder>
      <ProjectTreeFolder
        name="server"
        desc="Directory for configuring the backend of the application, including environment settings and dependencies.">
        <ProjectTreeFolder
          name="controllers"
          desc="Directory containing the server controllers, which manage the application's business logic and request handling.">
          <ProjectTreeFile
            name="ManageUsersController.js"
            desc="Controller responsible for managing user-related operations within the application. This controller requires admin authentication to ensure that sensitive user management functions are securely accessed."
          />
          <ProjectTreeFile
            name="UserController.js"
            desc="Publicly accessible controller that facilitates user interactions with the database, handling operations such as user registration, login, and profile management."
          />
        </ProjectTreeFolder>
        <ProjectTreeFolder
          name="middlewares"
          desc="Collection of middleware functions designed to process incoming requests, enforcing application-level security and data validation.">
          <ProjectTreeFile
            name="Auth.js"
            desc="Authentication middleware that ensures only authenticated users can access protected routes. This middleware also implements role-based access control to manage permissions effectively."
          />
        </ProjectTreeFolder>
        <ProjectTreeFolder
          name="models"
          desc="Defines data models used for interactions with the database, providing a structured schema for data management.">
          <ProjectTreeFile
            name="db.js"
            desc="Entry point for establishing a connection to a MongoDB database, configuring the necessary parameters for seamless database operations."
          />
          <ProjectTreeFile
            name="User.js"
            desc="File defining the user schema, allowing for efficient management of user properties and ensuring data integrity across user-related operations."
          />
        </ProjectTreeFolder>
        <ProjectTreeFolder
          name="routes"
          desc="Collection of routers used by the server to efficiently manage various application routes, facilitating clean and organized routing.">
          <ProjectTreeFile
            name="ManageUsersRouter.js"
            desc="Router that handles all endpoints related to user management, providing structured access to user-related functionalities."
          />
          <ProjectTreeFile
            name="UserRouter.js"
            desc="Router encapsulating endpoints accessible to all users, facilitating seamless retrieval of data from the database."
          />
        </ProjectTreeFolder>
        <ProjectTreeFolder
          name="utils"
          desc="Collection of utility functions used throughout the server application to promote clean code and enhance maintainability.">
          <ProjectTreeFile
            name="utils.js"
            desc="File containing highly modular utility functions with various use cases, designed for global accessibility across the application."
          />
        </ProjectTreeFolder>
        <ProjectTreeFile
          name=".env"
          desc="Environment configuration file for storing sensitive information and environment-specific variables."
        />
        <ProjectTreeFile
          name=".gitignore"
          desc="File specifying which files and directories should be ignored by Git, helping to keep the repository clean."
        />
        <ProjectTreeFile
          name="index.js"
          desc="Main entry point for the backend application, setting up the server and defining routes."
        />
        <ProjectTreeFile
          name="package-lock.json"
          desc="Automatically generated file that locks the versions of dependencies for consistent installations across environments."
        />
        <ProjectTreeFile
          name="package.json"
          desc="File that defines the metadata of the project, including dependencies, scripts, and other configurations for the Node.js application."
        />
      </ProjectTreeFolder>
    </div>
  );
}
