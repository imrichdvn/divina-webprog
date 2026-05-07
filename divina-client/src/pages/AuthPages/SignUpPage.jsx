import { useState } from 'react';
import Button from '../components/Button';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpPage = () => {
  const [name, setName] = useState('');
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
    // TODO: handle signup logic
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border-2 border-neutral-900 bg-white p-8 shadow-xl sm:p-12">
        <div className="space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-400">Sign up</p>
            <h1 className="mt-4 text-4xl font-black text-neutral-900 sm:text-5xl">Create your account</h1>
            <p className="mt-4 text-base text-neutral-600">Join our community to bookmark articles, receive updates, and discover the best dog care advice.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Jane Doe"
                className="mt-2 w-full rounded-3xl border-2 border-neutral-900 bg-stone-50 px-4 py-3 text-neutral-900 focus:border-orange-500 focus:outline-none"
              />
            </label>

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
                aria-describedby="signup-email-error"
                className={`mt-2 w-full rounded-3xl border-2 px-4 py-3 text-neutral-900 focus:border-orange-500 focus:outline-none ${
                  emailError ? 'border-red-500 bg-red-50' : 'border-neutral-900 bg-stone-50'
                }`}
              />
              {emailError && (
                <p id="signup-email-error" className="mt-2 text-sm text-red-600">
                  {emailError}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Password</span>
              <input
                type="password"
                placeholder="Create a password"
                className="mt-2 w-full rounded-3xl border-2 border-neutral-900 bg-stone-50 px-4 py-3 text-neutral-900 focus:border-orange-500 focus:outline-none"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="primary" className="w-full sm:w-auto px-10 py-4">Sign up</Button>
              <Button to="/auth/signin" className="w-full sm:w-auto px-10 py-4">Already have an account</Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
