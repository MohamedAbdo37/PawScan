import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import PawScanLogo from './PawScanLogo'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'


const navLinks = [
  { name: 'Pet AI Analyzer', href: '/ai-model' },
  { name: 'Features', href: '/features' },
  { name: 'About Us', href: '/about' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState("https://placehold.co/150x150/F30067/FFFFFF?text=User");

  const api_root = import.meta.env.VITE_API_URL_ROOT || 'http://localhost:8080'; // Ensure this is set in your .env file


const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      // Optional: redirect to login page or home
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
};
  
  useEffect(() => {
    // Set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setIsAuthorized(true);
      } else {
        console.log("User is not logged in");
        setIsAuthorized(false);
      }
    });

    // Clean up the listener on unmount to avoid memory leaks
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch user profile image if the user is authorized
    if (isAuthorized) {
      const fetchUserProfileImage = async () => {
        try {
          const token = await auth.currentUser.getIdToken();
          const uid = auth.currentUser?.uid; // Get the current user's UID
          if (!uid) throw new Error("User not authenticated");
          const response = await fetch(`${api_root}/api/v1/auth/profile/image/${uid}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // 🛡️ JWT Auth heade
            },
          });

          const data = await response.json();
          if (data.imgURL) {
            setUserProfileImage(data.imgURL);
          } else {
            console.warn("No profile image found for user");
          }
        } catch (error) {
          console.error("Error fetching user profile image:", error);
        }
      };
      fetchUserProfileImage();
    }
  }, [isAuthorized]);
   

  return (
    <header className="bg-[#2F5249] text-white ">
      <nav className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <PawScanLogo className="h-8 w-auto" />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden justify-center lg:flex lg:items-center lg:space-x-6 ">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative z-0 group inline-block px-3 py-2 rounded-md text-white font-medium hover:font-bold transition-all duration-300"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-[#437057] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-md z-[-1]"></span>
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            { (!isAuthorized || isAuthorized === null) && <>
            <a
              href="/login"
              className="relative px-3 py-1.5 rounded-md border-2 border-white/20 text-white font-medium group hover:border-[#00D1CD] transition-all duration-300 min-w-[90px] text-center"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-[#00D1CD] rounded-md opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </a>
            <a
              href="/signup"
              className="relative px-3 py-1.5 rounded-md bg-[#00D1CD] text-white font-bold transition-all duration-300 min-w-[90px] text-center shadow-md hover:bg-[#00B8B4] hover:shadow-lg hover:shadow-[#00B8B4]/40"
            >
              <span className="relative z-10">Sign Up</span>
            </a>
            </>}
            {(isAuthorized) && <>
                <a
                  href="/"
                  className="relative px-3 py-1.5 rounded-md bg-red-600 text-white font-bold transition-all duration-300 min-w-[90px] text-center shadow-md hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40"
                  onClick={handleLogout}
                >
                  <span className="relative z-10">Logout</span>
                </a>
                 <div className="flex -space-x-1 overflow-hidden">
                  <img
                  alt=""
                  src={userProfileImage}
                  className="inline-block size-10 rounded-full ring-2 ring-white"
                  onClick={() => window.location.href = `/profile/${auth.currentUser.uid}`} // Redirect to profile page
                />
                  </div>
              </>
            }
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            {isAuthorized && <div className="flex -space-x-1 overflow-hidden">
                  <img
                  alt=""
                  src={userProfileImage}
                  className="inline-block size-10 rounded-full ring-2 ring-white"
                  onClick={() => window.location.href = `/profile/${auth.currentUser.uid}`}
                />
            </div>}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#00D1CD] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#2F5249] p-6 overflow-y-auto shadow-lg">
          <div className="flex items-center justify-between">
          
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-white hover:text-[#00D1CD] focus:outline-none"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-white font-medium hover:bg-[#437057] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            { !(isAuthorized)&&  <>
            <a
              href="/login"
              className="block px-3 py-2 rounded-md border-2 border-white/20 text-white font-medium hover:border-[#00D1CD] transition-all duration-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="block px-3 py-2 rounded-md bg-[#00D1CD] text-white font-bold hover:bg-[#00B8B4] transition-all duration-300"
            >
              Sign Up
            </a>
            </>}

            {(isAuthorized) && <>
                <a
                  href="/"
                  className="block px-3 py-2 rounded-md bg-red-600 text-white font-bold transition-all duration-300 min-w-[90px] text-center shadow-md hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40"
                  onClick={handleLogout}
                >
                  <span className="relative z-10">Logout</span>
                </a> </> 
            }

          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
