import PawScanLogo from "./PawScanLogo";
// import { ArrowRight, User } from "react-feather"



const Navbar = () => {
  const navLinks = [
    { name: 'Use the AI Model', path: '/ai-model' },
    { name: 'Features', path: '/features' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    // hover:bg-[#555555] transition duration-300
    <nav className="bg-[#2F5249] p-4 py-2 shadow-lg ">
      {/* Container for Navbar Content */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Brand/Logo Section */}
        <div className="text-white text-3xl font-extrabold mb-4 md:mb-0 transform hover:scale-105 transition duration-300">
            
          <a href="/" >
            <PawScanLogo/>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-start w-full"> {/* Centering container */}
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-8">
                {navLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.path}
                    className="relative z-0 group inline-block px-2 py-2 rounded-lg min-w-[100px] text-center"
                >
                    {/* Stable text container */}
                    <span className="font-medium text-white text-sm group-hover:font-bold inline-block w-full whitespace-nowrap">
                    {link.name}
                    </span>
                    
                    {/* Background effect */}
                    <span className="absolute inset-0 h-full w-full rounded-lg bg-[#437057] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 z-[-1]"></span>
                </a>
                ))}
            </div>
         </div>

         <div className="flex items-center space-x-4 ml-8 justify-end"> {/* Container for auth buttons */}
            {/* Login Button (Subtle outline) */}
            <a
                href="/login"
                className="relative px-2.5 py-1.5 rounded-lg border-2 border-white/20 hover:border-[#00D1CD] text-white group transition-all duration-300 min-w-[100px] text-center"
            >
                <span className="relative z-10 font-medium">Login</span>
                <span className="absolute inset-0 bg-[#00D1CD] rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                {/* <User className="inline mr-2" size={16} />   */}
            </a>

            {/* Sign Up Button (Prominent solid) */}
            <a
                href="/signup"
                className="relative px-2.5 py-1.5 rounded-lg bg-[#00D1CD] hover:bg-[#00B8B4] text-white font-bold transition-all duration-300 min-w-[100px] text-center shadow-md hover:shadow-lg hover:shadow-[#00B8B4]/40"
            >
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                {/* <ArrowRight className="inline ml-2" size={16} /> */}
            </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar
