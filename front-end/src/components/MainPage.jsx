import classificationImage from '../assets/classification.png';
import PhotoFrame from './PhotoFrame';
import detectionImage from '../assets/detection.png';
import segmentationImage from '../assets/segmentation.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {

    const [isClicked, setIsClicked] = useState(false);

    const navigator = useNavigate();
    

  return (
     <div className="flex-grow overflow-y-auto pt-14"> {/* This div ensures the content area is scrollable */}
      {/* First Part */}
        <div className="bg-[#97B067] min-h-[3rem] relative isolate overflow-hidden px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-10 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
                
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              Analyze Your Pet Photos!s
            </h2>
            <p className="mt-6 text-xl text-pretty text-gray-300 leading-relaxed">
              Upload images of your cats and dogs and let PawScan's intelligent AI models
            classify, detect, and segment them with precision. Discover fascinating
            insights into your furry friends!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              
                <button 
                    className={`mt-2 px-8 py-3 bg-white text-[#97B067] font-semibold rounded-full shadow-lg
                                hover:bg-gray-100 transform hover:scale-105 transition-all duration-300
                                ${isClicked ? 'scale-95 shadow-inner' : ''}`}
                    onClick={() => {
                        setIsClicked(true);
                        navigator('/ai-model');
                        setTimeout(() => setIsClicked(false), 150);
                    }}
                    onMouseLeave={() => setIsClicked(false)} // Reset if mouse leaves during animation
                    >
                    <span className={`inline-block ${isClicked ? 'translate-y-0.5' : ''} transition-transform duration-150`}>
                        Get Started
                    </span>
                </button>

                <a 
                href="#how-it-works" 
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
                }}   
                className="group text-lg mt-2 font-semibold text-white hover:text-gray-100 transition-colors duration-200"
                >
                    <span className="inline-flex items-center">
                        Learn more
                        <span 
                        aria-hidden="true"
                        className="text-4xl font-bold pb-3 ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1"
                        >
                        →
                        </span>
                    </span>
                </a>
            </div>
          </div>
            <div className="relative right-60 mt-10 w-[70rem] h-[40rem] z-10">

                {/* 1st Photo */}
                <div className="absolute rounded-lg top-0 right-20 rotate-3 z-10 hover:z-10 hover:scale-105 transition-all duration-300 ">
                <PhotoFrame 
                    imageUrl={classificationImage}
                    frameColor="bg-white"
                    frameSize="px-2 pt-2 py-8"
                    matteSize="border-[32px]"
                    className="w-[300px] max-w-full"
                />
                </div>

                {/* 2nd Photo */}
                <div className="absolute top-40 -right-24  z-[5] -rotate-6 hover:z-10 hover:scale-105 transition-all duration-300">
                <PhotoFrame 
                    imageUrl={detectionImage}
                    frameColor="bg-white"
                    frameSize="px-2 pt-2 py-8"
                    matteSize="border-[32px]"
                    className="w-[300px] max-w-full"
                />
                </div>

                {/* 3rd Photo */}
                <div className="absolute top-43 -right-48 z-0 rotate-12 hover:z-10 hover:scale-105 transition-all duration-300">
                <PhotoFrame 
                    imageUrl={segmentationImage}
                    frameColor="bg-white"
                    frameSize="px-2 pt-2 py-8"
                    matteSize="border-[32px]"
                    className="w-[300px] max-w-full"
                />
                </div>

            </div>

        </div>
        {/* </div> */}

      {/* Second Part */}
     <section id='how-it-works' className="min-h-[80vh] bg-[#E3DE61] flex items-center justify-center p-8 text-gray-800
                                       relative overflow-hidden"> {/* Added relative and overflow-hidden */}

        {/* Diagonal stripe pattern - now using a more defined pattern and slightly different colors for contrast */}
        <div className="absolute inset-0 z-0 opacity-20"
             style={{
               backgroundImage: `linear-gradient(45deg, #FFF8C9 25%, transparent 25%),
                                 linear-gradient(-45deg, #FFF8C9 25%, transparent 25%),
                                 linear-gradient(45deg, transparent 75%, #FFF8C9 75%),
                                 linear-gradient(-45deg, transparent 75%, #FFF8C9 75%)`,
               backgroundSize: '40px 40px',
               backgroundPosition: '0 0, 0 20px, 20px 20px, 20px 0'
             }}>
        </div>

        <div className="text-center max-w-4xl relative z-10 p-6 bg-white bg-opacity-90 rounded-xl shadow-2xl"> {/* Added more padding, background, rounded corners, shadow */}
          <h2 className="text-5xl font-bold mb-6 text-gray-900 border-b-4 border-[#97B067] pb-4 inline-block"> {/* Stronger border */}
            How It Works
          </h2>
          <p className="text-xl leading-relaxed mb-10 text-gray-700">
            PawScan utilizes advanced pre-trained AI models for a comprehensive analysis flow, broken down into simple, intuitive steps:
          </p>

          {/* Enhanced step-by-step list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-[#F30067] text-white text-3xl font-bold rounded-full mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-2">Secure Upload</h3>
              <p className="text-md text-gray-700 text-center">
                Easily and securely upload your pet images through our user-friendly interface.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-[#97B067] text-white text-3xl font-bold rounded-full mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-2">AI Classification</h3>
              <p className="text-md text-gray-700 text-center">
                Our classification model quickly determines if cats or dogs are present in your photo.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-[#2F5249] text-white text-3xl font-bold rounded-full mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-2">Detection & Segmentation</h3>
              <p className="text-md text-gray-700 text-center">
                If pets are found, our advanced models detect their exact location and outline them with pixel-level masks.
              </p>
            </div>

            {/* Step 4 (Implicit: Results Display) */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 transition duration-300 md:col-span-2 lg:col-span-3"> {/* Span all columns for emphasis */}
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white text-3xl font-bold rounded-full mb-4 shadow-lg">
                4
              </div>
              <h3 className="text-2xl font-semibold mb-2">Visualized Results</h3>
              <p className="text-md text-gray-700 text-center">
                View clear, insightful visualizations of your pet analysis directly on the screen.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default MainPage
