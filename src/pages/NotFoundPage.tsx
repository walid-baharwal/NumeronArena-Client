import { AlertCircle } from 'lucide-react'; 

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-lg">
        {/* Error Icon */}
        <div className="h-20 w-20 text-red-500 mb-4">
          <AlertCircle size={70} />
        </div>
        <h1 className="text-3xl font-bold text-red-400 mb-2">404 - Page Not Found</h1>
        <p className="text-lg text-gray-300 mb-4">
          The page you are looking for does not exist.
        </p>
        <p className="text-gray-500">
          Please go back to the{" "}
          <a href="/" className="text-red-400 hover:underline">
            homepage
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
