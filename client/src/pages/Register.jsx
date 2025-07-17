import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import UserBg from '../assets/bg.jpg'
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const isButtonDisabled = !(isTermsChecked && isPrivacyChecked);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            username,
            email,
            password
        };
        try {
            const res = await axios.post('/api/v1/user/register', formData)
            if (res.data.success) {
                setMsg('User Registered')
                navigate('/login')
            } else {
                console.error(res.data.message)
                setMsg(res.data.message)
            }
        } catch (error) {
            setMsg(error)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="lg:p-8 w-full h-fit">
                <div className="card lg:card-side bg-base-100 lg:shadow-xl rounded-none lg:rounded-lg">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold text-center">Welcome</h1>
                        <p className="text-center">Join KanoonMitra Community</p>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-red-950">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="input input-bordered focus:border-red-950 dark:focus:border-gray-700"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-red-950">Email</span>
                            </label>
                            <input
                                type="email"
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
                                Already a User?
                                <Link to="/login" className="underline hover:underline-offset-2 hover:text-blue-500">Sign In</Link>
                            </label>
                        </div>
                        <div className="pl-2 w-full flex flex-col">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isTermsChecked}
                                    onChange={(e) => setIsTermsChecked(e.target.checked)}
                                    className="form-checkbox checkbox-sm"
                                />
                                <span className="ml-2 text-sm">I agree to the Terms and Conditions.</span>
                            </label>
                            <label className="inline-flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    checked={isPrivacyChecked}
                                    onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                                    className="form-checkbox checkbox-sm"
                                />
                                <span className="ml-2 text-sm">I agree to the Privacy Policy.</span>
                            </label>
                        </div>
                        <p className={`${msg === 'User Registered' ? 'text-green-900' : 'text-red-500'} text-center font-semibold text-sm`}>{msg}</p>
                        <div className="form-control">
                            <button
                                disabled={isButtonDisabled}
                                className="btn shadow-md bg-red-950 hover:bg-red-900 border-red-950 cursor-pointer text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                                Sign Up
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

export default RegisterForm;