import useApi from "../hooks/useApi";

export default function ConnectAppPage() {
  const { fetchData: connectApp } = useApi("POST", "JOIN");

  const handleConnect = async () => {
    await connectApp(true, {
      appName: "My app",
      origin: "http://localhost:3001",
      admin: "Ozzo",
      appDescription: "My first Authecho app",
    });
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
}
