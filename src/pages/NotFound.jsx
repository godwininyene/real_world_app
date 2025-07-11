import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 mx-auto text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h1>
                <p className="text-gray-600 mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-300 shadow-md hover:shadow-lg"
                >
                    Go Back Home
                </Link>
            </div>
            <p className="mt-8 text-gray-500 text-sm">
                Need help? <a href="mailto:support@example.com" className="text-purple-600 hover:underline">Contact support</a>
            </p>
        </div>
    );
}