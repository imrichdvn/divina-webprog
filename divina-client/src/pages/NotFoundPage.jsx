import React from "react";
import Button from "../components/Button";

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
      <h1 className="text-9xl font-black text-neutral-900">404</h1>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
        Lost Dog
      </p>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-lg text-neutral-600">
        The page you followed to get here must be broken or the dog ran away with the link.
      </p>
      <div className="mt-8">
        <Button to="/" variant="primary">
          Return to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;