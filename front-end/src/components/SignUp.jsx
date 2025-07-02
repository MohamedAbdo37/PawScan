import { useState } from "react";
import PawScanLogo from "./PawScanLogo";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase"; 


async function signUp(email, password, username) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const api_root = import.meta.env.VITE_API_URL_ROOT || 'http://localhost:8080'; // Ensure this is set in your .env file

  const idToken = await user.getIdToken(); 
  try {
    const res = await fetch(`${api_root}/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ idToken, username })
    });

    if (!res.ok) {
      const text = await res.json();
      throw new Error(text);
    }

    const message = await res.json();
    window.localStorage.setItem("uid", message); // Store the token in localStorage
    console.log("Signup success:", message);
  } catch (error) {
    console.error("Signup error:", error.message);
  }
}

export default function RegisterForm() {
   const [formVars, setFormVars] = useState({});
   const [registerError, setRegisterError] = useState(null);
   const [registerSuccess, setRegisterSuccess] = useState(false);

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVars((prev) => ({ ...prev, [name]: value }));
   }

   const handleSubmit = (e) => {
    e.preventDefault();
    setRegisterError(null);
    setRegisterSuccess(false);

    const { username, email, password, confirmPassword } = formVars;

    if (!username || !email || !password || !confirmPassword) {
      setRegisterError("All fields are required for registration.");
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    // Password validation: at least 8 characters, capital, small, number, symbol
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setRegisterError("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.");
      return;
    }

    signUp(email, password, username)
      .then(() => {
        setRegisterSuccess(true);
        setFormVars({ username: '', email: '', password: '', confirmPassword: '' });
        console.log("Registration successful!");
        window.location.href = `/profile/${auth.currentUser.uid}`; // Redirect to login page after successful registration
      })
      .catch((error) => {
        console.error("Registration failed:", error.message);
        setRegisterError(error.message || "An unexpected error occurred during registration.");
      });
   }

  return (
    <>
      <div className="bg-[#97B067] flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative overflow-hidden">
        {/* Background decoration - subtle paw prints or abstract shapes */}
        <div className="absolute inset-0 z-0 opacity-15"
             style={{
               backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 70%),
                                 radial-gradient(circle at 80% 20%, rgba(0,0,0,0.05) 0%, transparent 70%)`,
               backgroundSize: '250px 250px',
               backgroundRepeat: 'repeat',
             }}>
        </div>

        <div className="relative z-10 bg-white bg-opacity-95 px-10 py-8 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-xl shadow-2xl border border-gray-200 transform animate-fade-in-up">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
                <div className="flex justify-center pt-4">
                    <a
                        alt="PawScan"
                        href="/"
                        className="mx-auto h-10 w-auto scale-125 hover:scale-150 transition-transform duration-300"
                    >
                        <PawScanLogo />
                    </a>
                </div>
                <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-[#2F5249] animate-fade-in delay-100">
                    Create your account
                </h2>
            </div>

          <form onSubmit={handleSubmit} method="POST" className="space-y-6 mt-8">
            <div className="animate-fade-in delay-200">
              <label htmlFor="username" className="block text-sm font-medium text-[#2F5249] mb-1">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#97B067] sm:text-sm sm:leading-6 transition-all duration-200"
                />
              </div>
            </div>

            <div className="animate-fade-in delay-300">
              <label htmlFor="email" className="block text-sm font-medium text-[#2F5249] mb-1">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#97B067] sm:text-sm sm:leading-6 transition-all duration-200"
                />
              </div>
            </div>

            <div className="animate-fade-in delay-400">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#2F5249] mb-1">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F30067] sm:text-sm sm:leading-6 transition-all duration-200"
                />
              </div>
            </div>

            <div className="animate-fade-in delay-500">
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2F5249] mb-1">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F30067] sm:text-sm sm:leading-6 transition-all duration-200"
                />
              </div>
            </div>

            {registerError && (
              <div className="text-red-600 text-sm text-center animate-fade-in delay-600">
                {registerError}
              </div>
            )}

            {registerSuccess && (
              <div className="text-green-600 text-sm text-center animate-fade-in delay-600">
                Registration successful! You can now log in.
              </div>
            )}

            <div className="animate-fade-in delay-700">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#F30067] to-[#CC005A] px-3 py-2 text-md font-semibold text-white shadow-lg hover:from-[#CC005A] hover:to-[#F30067] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F30067] transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 animate-fade-in delay-800">
            Already a member?{' '}
            <a href="/login" className="font-semibold text-[#F30067] hover:text-[#CC005A] transition-colors duration-200">
              Log in.
            </a>
          </p>
        </div>
      </div>
    </>
  )
}