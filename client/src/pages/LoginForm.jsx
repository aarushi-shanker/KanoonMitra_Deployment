import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserBg from '../assets/bg.jpg';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import axios from 'axios';

function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password };
    try {
      const res = await axios.post('/api/v1/user/login', formData);
      if (res.data.success) {
        window.localStorage.setItem("token", res.data.token);
        setError('');
        navigate(from, { replace: true }); // redirection
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="lg:hero-content w-full">
        <div className="card lg:card-side bg-base-100 lg:shadow-xl rounded-none lg:rounded-lg">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
            <p className="text-center">We are Happy to see you back</p>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-red-950">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered focus:border-red-950 dark:focus:border-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-red-950">Password</span>
              </label>
              <div className="password-container relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  className="input input-bordered w-full focus:border-red-950 dark:focus:border-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-2 right-0 flex items-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <VscEyeClosed className="w-5 h-5" />
                  ) : (
                    <VscEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <label className="flex justify-center gap-1 my-3">
                New User?
                <Link to="/register" className="underline hover:underline-offset-2 hover:text-blue-500">Sign Up</Link>
              </label>
            </div>
            <p className="text-center font-semibold text-red-500 text-xs">
              {error === "User Blocked" ? (
                <>
                  {error} <br /> <span className="text-gray-900">Please  <a href="/contact" className="underline hover:underline-offset-2 hover:text-blue-500 mt-1">Contact Us</a> for Support</span>
                </>
              ) : (
                error
              )}
            </p>
            <div className="form-control">
              <button className="btn shadow-md bg-red-950 hover:bg-red-900 border-red-950 cursor-pointer text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                Sign In
              </button>
            </div>
          </form>
          <figure>
            <img
              src={UserBg}
              alt="Album" className="h-full w-fit md:hidden lg:block" />
          </figure>
        </div>
      </div>
    </div>

  );
}

export default LoginForm