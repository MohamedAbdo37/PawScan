const MainPage = () => {
  return (
     <div className="flex-grow overflow-y-auto pt-14"> {/* This div ensures the content area is scrollable */}
      {/* First Part */}
      <section className="min-h-screen bg-[#97B067] flex items-center justify-center p-8 text-white">
        <div className="text-center max-w-2xl">
          <h2 className="text-5xl font-bold mb-4">Analyze Your Pet Photos!</h2>
          <p className="text-xl leading-relaxed">
            Upload images of your cats and dogs and let PawScan's intelligent AI models
            classify, detect, and segment them with precision. Discover fascinating
            insights into your furry friends!
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-[#97B067] font-semibold rounded-full shadow-lg
                             hover:bg-gray-100 transform hover:scale-105 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Second Part */}
      <section className="min-h-[80vh] bg-[#E3DE61] flex items-center justify-center p-8 text-gray-800">
        <div className="text-center max-w-2xl">
          <h2 className="text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl leading-relaxed mb-6">
            PawScan utilizes advanced pre-trained AI models for a comprehensive analysis flow:
            first, a classification model determines pet presence, followed by detection
            for bounding boxes and segmentation for pixel-level masks.
          </p>
          <ul className="list-disc list-inside text-left text-lg mx-auto w-fit space-y-2">
            <li>Upload an image securely.</li>
            <li>AI classifies for pet presence (cats/dogs).</li>
            <li>If pets are found, AI detects and segments them.</li>
            <li>Results are displayed with clear visualizations.</li>
          </ul>
        </div>
      </section>

    </div>
  )
}

export default MainPage
