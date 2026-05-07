import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'Email is required.';
    }

    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address.';
    }

    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const error = validateEmail(email);

    if (error) {
      setEmailError(error);
      return;
    }

    setEmailError('');
    // TODO: handle sign-in logic
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border-2 border-neutral-900 bg-white p-8 shadow-xl sm:p-12">
        <div className="space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-400">Sign in</p>
            <h1 className="mt-4 text-4xl font-black text-neutral-900 sm:text-5xl">Welcome back</h1>
            <p className="mt-4 text-base text-neutral-600">Enter your account details to access your articles and saved resources.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (emailError) {
                    setEmailError('');
                  }
                }}
                onBlur={() => setEmailError(validateEmail(email))}
                placeholder="you@example.com"
                aria-describedby="email-error"
                className={`mt-2 w-full rounded-3xl border-2 px-4 py-3 text-neutral-900 focus:border-orange-500 focus:outline-none ${
                  emailError ? 'border-red-500 bg-red-50' : 'border-neutral-900 bg-stone-50'
                }`}
              />
              {emailError && (
                <p id="email-error" className="mt-2 text-sm text-red-600">
                  {emailError}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-3xl border-2 border-neutral-900 bg-stone-50 px-4 py-3 text-neutral-900 focus:border-orange-500 focus:outline-none"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="primary" className="w-full sm:w-auto px-10 py-4">Sign in</Button>
              <Button to="/auth/signup" className="w-full sm:w-auto px-10 py-4">Create account</Button>
            </div>
          </form>

          <div className="rounded-3xl border-2 border-neutral-900 bg-stone-50 p-5 text-sm text-neutral-700">
            <p>
              Don&apos;t have an account yet?{' '}
              <Link to="/auth/signup" className="font-semibold text-neutral-900 underline decoration-orange-400 decoration-2 hover:text-orange-600">
                Create one to save favorite guides.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
