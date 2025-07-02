import { useState } from "react";
import PawScanLogo from "./PawScanLogo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
// import { useNavigate } from "react-router-dom";

const api_root = import.meta.env.VITE_API_URL_ROOT || 'http://localhost:8080'; // Ensure this is set in your .env file


async function loginUser(email, password) {
  console.log("Trying to log in with:", email, password);
  const userCredentials = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredentials.user.getIdToken();

  
  // ✅ Send the token to your Spring Boot backend
  const response = await fetch(`${api_root}/v1/auth/login`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`, // 🛡️ JWT Auth header
    },
  });

  const result = await response.text(); // Or .json() if your backend returns JSON
  window.localStorage.setItem("uid", result); // Store the user ID or any relevant data
  console.log("✅ Backend response:", result);


  return result;

}

export default function Example() {

   const [formVars, setFormVars] = useState({});
   const [loginError, setLoginError] = useState(null); 
    // const navigate = useNavigate();


   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVars((prev) => ({ ...prev, [name]: value }));
   }

   const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError(null);
    // Handle form submission logic here
    const { email, password } = formVars;
    
    if (email && password) {
      loginUser(email, password)
        .then(() => {
          // Handle successful login, e.g., redirect to dashboard
          console.log("Login successful");
          window.location.href = "/ai-model"; // Redirect to home page after login
          // navigate("/ai-model"); // Use useNavigate to redirect to the AI model page

        })
        .catch((error) => {
          // Handle login error
          console.error("Login failed:", error.message);
          setLoginError(error.message || "An unexpected error occurred during login.")
          
        });
    }
    else {
      setLoginError("Email and password are required for login.");
      console.error("Email and password are required for login.");
    }

   }
  
    
  return (
    <>
      <div className="bg-[#97B067] flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 opacity-50"
             style={{
               backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 70%),
                                 radial-gradient(circle at 80% 20%, rgba(0,0,0,0.05) 0%, transparent 70%)`,
               backgroundSize: '250px 250px',
               backgroundRepeat: 'repeat',
             }}>
        </div>
      
        <div className="relative z-10 bg-white bg-opacity-95 px-10 py-8 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-xl shadow-2xl border border-gray-200 transform animate-fade-in-up"> {/* Enhanced form card */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
                <div className="flex justify-center pt-4">
                    <a
                        alt="PawScan"
                        href="/"
                        className="mx-auto h-10 w-auto scale-125 hover:scale-150 transition-transform duration-300"
                    >
                        <PawScanLogo textColor="000000"/>
                    </a>
                </div>
                <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-[#2F5249] animate-fade-in delay-100">
                    Log in to your account
                </h2>
            </div>

          <form onSubmit={handleSubmit} method="POST" className="space-y-6 mt-8">
            <div className="animate-fade-in delay-200">
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

            <div className="animate-fade-in delay-300">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#2F5249] mb-1">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-[#F30067] hover:text-[#CC005A] transition-colors duration-200">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F30067] sm:text-sm sm:leading-6 transition-all duration-200"
                />
              </div>
            </div>

            {loginError && (
              <div className="text-red-600 text-sm text-center animate-fade-in delay-400">
                {loginError}
              </div>
            )}

            <div className="animate-fade-in delay-500">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#F30067] to-[#CC005A] px-3 py-2 text-md font-semibold text-white shadow-lg hover:from-[#CC005A] hover:to-[#F30067] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F30067] transition-all duration-300 transform hover:scale-105"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 animate-fade-in delay-600">
            Not a member?{' '}
            <a href="/signup" className="font-semibold text-[#F30067] hover:text-[#CC005A] transition-colors duration-200">
              Join Us.
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
