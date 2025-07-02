import PawScanLogo from './PawScanLogo'; // Adjust the import path as necessary


const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E3DE61] p-8 relative overflow-hidden">
      {/* Subtle background pattern - paw prints or abstract shapes */}
      <div className="absolute inset-0 z-0 opacity-15"
           style={{
             backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 70%),
                               radial-gradient(circle at 80% 20%, rgba(0,0,0,0.05) 0%, transparent 70%)`,
             backgroundSize: '250px 250px',
             backgroundRepeat: 'repeat',
           }}>
      </div>

      <div className="relative z-1 bg-white bg-opacity-90 p-12 rounded-3xl shadow-2xl text-center
                      transform animate-fade-in-up max-w-lg w-full"> {/* Responsive width */}

        {/* Logo at the top of the 404 box */}
        <div className="mb-6">
          <PawScanLogo size="text-4xl" textColor='000000' /> {/* Adjust size as needed */}
        </div>

        <h1 className="text-8xl md:text-9xl font-extrabold text-[#F30067] mb-4 animate-bounce-subtle-once">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in delay-200">
          Page Not Found
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8 animate-fade-in delay-400">
          Oops! Looks like this page ran off to chase a squirrel and got a little lost.
          Don't worry, we'll help you find your way back home.
        </p>

        <a href="/" className="inline-block px-8 py-4 bg-[#97B067] text-white font-semibold text-lg rounded-full shadow-lg
                               hover:bg-[#80A05A] transform hover:scale-105 transition duration-300 animate-bounce-in delay-600">
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default EmptyPage
