import { Link, Outlet } from "react-router";

export default function ConnectLayout() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-x-4 mt-4 p-4 text-blue-400 underline">
        <Link to="/connectapp">Connect Application</Link>
        <Link to="/connectapp/install">Installation Guide</Link>
        <Link to="/connectapp/docs">Documentation and Workflow with the Authecho SDK</Link>
      </div>
      <Outlet />
    </>
  );
}
