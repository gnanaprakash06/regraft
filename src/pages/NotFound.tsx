// src/pages/NotFound.tsx

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#DCEBFA] p-8 text-center">
            <h1 className="text-7xl font-extrabold text-slate-800">404</h1>
            <p className="mt-3 text-xl text-slate-600">Page not found</p>
            <p className="mt-1 text-sm text-slate-500">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="mt-6 rounded-lg bg-[#1B74E4] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1565C0]"
            >
                Go home
            </Link>
        </div>
    );
};

export default NotFound;
