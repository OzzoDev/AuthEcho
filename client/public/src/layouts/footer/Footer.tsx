import { AUTHECHO_LINK } from "../../constants/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 py-4 md:py-6 text-white text-center bg-gray-950 shadow-cyan-t footer">
      <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-center">
        <p>Open source SDK</p>
        <p>&copy;{currentYear}</p>
        <p className="text-cyan-300">Powered by Authecho</p>
      </div>
      <a href={AUTHECHO_LINK} className="text-purple-500 underline md:whitespace-nowrap">
        Explore the power of Authecho
      </a>
    </div>
  );
}
