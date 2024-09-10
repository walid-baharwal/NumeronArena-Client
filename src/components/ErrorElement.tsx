import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { AlertCircle } from "lucide-react"; // Import Lucide's AlertCircle icon

const ErrorElement = () => {
  const error = useRouteError();

  let errorMessage: string;

  // Check if the error is a RouteErrorResponse
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || "An unexpected error occurred.";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unknown error occurred.";
  }

  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
    <div className="flex flex-col items-center p-8 bg-gray-800 rounded-lg shadow-lg">
      {/* Error Icon */}
      <div className="h-20 w-20 text-red-500 mb-4">
        <AlertCircle size={70} />
      </div>
      <h1 className="text-3xl font-bold text-red-500 mb-2">Oops! Something went wrong</h1>
      <p className="text-lg text-gray-300 mb-4">{errorMessage}</p>
      <p className="text-gray-400">
        Please try refreshing the page, or go back to the{" "}
        <a href="/" className="text-red-400 hover:underline">
          homepage
        </a>
        .
      </p>
    </div>
  </div>
  );
};

export default ErrorElement;
