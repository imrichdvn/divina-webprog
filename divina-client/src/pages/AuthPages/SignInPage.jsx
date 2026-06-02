import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';
import { setAuth } from '../../utils/auth';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email is required.';
    if (!emailRegex.test(value)) return 'Please enter a valid email address.';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateEmail(email);

    if (validationError) {
      setEmailError(validationError);
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    setEmailError('');
    setError('');
    setLoading(true);

    try {
      const { data } = await loginUser({ email, password });

      setAuth({
        token: data.token,
        type: data.type,
        firstName: data.firstName,
      });

      navigate(data.type === 'user' ? '/articles' : '/dashboard', {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border-2 border-neutral-900 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] sm:p-12">
        <div className="space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-600">Sign in</p>
            <h1 className="mt-4 text-4xl font-black text-neutral-900 sm:text-5xl">Welcome back</h1>
            <p className="mt-4 text-base text-neutral-600">
              Sign in to manage articles, reports, and your Paws &amp; Claws dashboard.
            </p>
          </div>

          {error && (
            <p className="rounded-2xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (emailError) setEmailError('');
                  if (error) setError('');
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
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••"
                className="mt-2 w-full rounded-3xl border-2 border-neutral-900 bg-stone-50 px-4 py-3 text-neutral-900 focus:border-orange-500 focus:outline-none"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" variant="primary" className="w-full px-10 py-4 sm:w-auto" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
              <Button to="/auth/signup" className="w-full px-10 py-4 sm:w-auto">
                Create account
              </Button>
            </div>
          </form>

          <div className="rounded-3xl border-2 border-neutral-900 bg-stone-50 p-5 text-sm text-neutral-700">
            <p>
              Don&apos;t have an account yet?{' '}
              <Link
                to="/auth/signup"
                className="font-semibold text-neutral-900 underline decoration-orange-400 decoration-2 hover:text-orange-600"
              >
                Register to join the community.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
