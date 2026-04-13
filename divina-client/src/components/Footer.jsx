const Footer = () => {
  return (
    <footer className="border-t-2 border-neutral-900 bg-white py-8">
      <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xl font-semibold tracking-[0.24em] text-neutral-900">
          Paws & Claws
        </p>
        <p className="text-sm font-medium text-neutral-600">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;