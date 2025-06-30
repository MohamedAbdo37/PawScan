import { useState } from "react";
import PawScanLogo from "./PawScanLogo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";


async function loginUser(email, password) {
  console.log("Trying to log in with:", email, password);
  const userCredentials = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredentials.user.getIdToken();

  console.log("User logged in successfully:", userCredentials.user);  
  console.log("ID Token:", idToken);

  // ✅ Send the token to your Spring Boot backend
  const response = await fetch("http://localhost:8080/api/v1/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`, // 🛡️ JWT Auth header
    },
  });

  const result = await response.text(); // Or .json() if your backend returns JSON
  console.log("✅ Backend response:", result);

  return result;

}

export default function Example() {

   const [formVars, setFormVars] = useState({});

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVars((prev) => ({ ...prev, [name]: value }));
   }

   const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const { email, password } = formVars;
    
    if (email && password) {
      loginUser(email, password)
        .then(() => {
          // Handle successful login, e.g., redirect to dashboard
          console.log("Login successful");
        })
        .catch((error) => {
          // Handle login error
          console.error("Login failed:", error);
        });
    }
    else {
      console.error("Email and password are required for login.");
    }

   }
  
    
  return (
    <>
      <div className="bg-[#97B067] flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div className="bg-white px-10 py-5 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg shadow-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
                <div className="flex justify-center pt-4">
                    <a
                        alt="PawScan"
                        src="/"
                        className="mx-auto h-10 w-auto scale-125 hover:scale-150 transition-transform duration-300"
                    >
                        <PawScanLogo text={true} textColor={'554433'}/>
                    </a>
                </div>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Log in to your account
                </h2>
            </div>

          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
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
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Join Us.
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
