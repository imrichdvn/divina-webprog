import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const genders = ['male', 'female', 'other'];

const emptyForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  address: '',
};

const SignUpPage = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    const ageValue = Number(formData.age);

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.age) errors.age = 'Age is required';
    if (!/^\d+$/.test(String(formData.age))) errors.age = 'Age must be a number only';
    if (!errors.age && (ageValue < 18 || ageValue > 120)) errors.age = 'Age must be between 18 and 120';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.contactNumber) errors.contactNumber = 'Contact number is required';
    if (!/^\d{11}$/.test(formData.contactNumber)) errors.contactNumber = 'Contact number must be 11 digits';
    if (!formData.email) errors.email = 'Email is required';
    if (!emailRegex.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (formData.username.includes(' ')) errors.username = 'Username must not contain spaces';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (!formData.address.trim()) errors.address = 'Address is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await createUser({
        ...formData,
        type: 'viewer',
        isActive: true,
      });
      setSuccess('Account created! Viewer accounts cannot sign in — contact an admin for elevated access.');
      setFormData(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `mt-2 w-full rounded-3xl border-2 px-4 py-3 text-neutral-900 focus:border-orange-500 focus:outline-none ${
      formErrors[field] ? 'border-red-500 bg-red-50' : 'border-neutral-900 bg-stone-50'
    }`;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border-2 border-neutral-900 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] sm:p-12">
        <div className="space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-600">Sign up</p>
            <h1 className="mt-4 text-4xl font-black text-neutral-900 sm:text-5xl">Create your account</h1>
            <p className="mt-4 text-base text-neutral-600">
              Register with the same details used in our client directory. New accounts are created as viewers.
            </p>
          </div>

          {success && (
            <p className="rounded-2xl border-2 border-green-600 bg-green-50 px-4 py-3 text-sm text-green-800">{success}</p>
          )}
          {error && (
            <p className="rounded-2xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-neutral-700">First name</span>
                <input name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass('firstName')} />
                {formErrors.firstName && <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>}
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-neutral-700">Last name</span>
                <input name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass('lastName')} />
                {formErrors.lastName && <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>}
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-neutral-700">Age</span>
                <input name="age" value={formData.age} onChange={handleChange} className={inputClass('age')} />
                {formErrors.age && <p className="mt-1 text-sm text-red-600">{formErrors.age}</p>}
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-neutral-700">Gender</span>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClass('gender')}
                >
                  <option value="">Select gender</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </option>
                  ))}
                </select>
                {formErrors.gender && <p className="mt-1 text-sm text-red-600">{formErrors.gender}</p>}
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Contact number</span>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="09XXXXXXXXX"
                className={inputClass('contactNumber')}
              />
              {formErrors.contactNumber && <p className="mt-1 text-sm text-red-600">{formErrors.contactNumber}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Email</span>
              <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass('email')} />
              {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Username</span>
              <input name="username" value={formData.username} onChange={handleChange} className={inputClass('username')} />
              {formErrors.username && <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Password</span>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass('password')}
              />
              {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-neutral-700">Address</span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className={inputClass('address')}
              />
              {formErrors.address && <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>}
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" variant="primary" className="w-full px-10 py-4 sm:w-auto" disabled={loading}>
                {loading ? 'Creating account…' : 'Sign up'}
              </Button>
              <Button to="/auth/signin" className="w-full px-10 py-4 sm:w-auto">
                Already have an account
              </Button>
            </div>
          </form>

          <div className="rounded-3xl border-2 border-neutral-900 bg-stone-50 p-5 text-sm text-neutral-700">
            <p>
              Ready to sign in?{' '}
              <Link
                to="/auth/signin"
                className="font-semibold text-neutral-900 underline decoration-orange-400 decoration-2 hover:text-orange-600"
              >
                Go to the login page
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
