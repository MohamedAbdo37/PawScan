const Features = () => {
  return (
    <div className="flex flex-col min-h-screen pt-14 bg-gray-50"> {/* Added a subtle background to the main div */}

      {/* Section for Title and Intro Paragraph - Color: #437057 */}
      <section className="bg-[#437057] py-16 px-4 flex-shrink-0 relative overflow-hidden">
        {/* Subtle radial gradient background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5A856A] to-transparent opacity-30 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-[#6C997F] to-transparent opacity-20 z-0"></div>

        <div className="container mx-auto max-w-4xl text-center text-white relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in-down">
            PawScan Features: Unveiling Our Capabilities
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed opacity-0 animate-fade-in delay-200">
            Welcome to the features overview of PawScan! Our application is designed to provide a seamless and insightful experience for analyzing images of your beloved pets. Below, we detail the core functionalities that make PawScan a powerful tool for pet owners and enthusiasts.
          </p>
        </div>
      </section>

      {/* Section 1: Multi-Page Web Application - Color: #97B067 */}
      <section className="bg-[#97B067] py-16 px-4 flex-shrink-0 relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 z-0 opacity-20"
             style={{
               backgroundImage: `linear-gradient(90deg, transparent 50%, rgba(255,255,255,.1) 50%),
                                 linear-gradient(rgba(255,255,255,.1) 50%, transparent 50%)`,
               backgroundSize: '40px 40px',
             }}>
        </div>
        <div className="container mx-auto max-w-4xl text-white relative z-10 p-8 bg-black bg-opacity-10 rounded-xl shadow-2xl animate-fade-in delay-300">
          <h2 className="text-4xl font-bold mb-6 border-b-2 border-white pb-2 inline-block">
            1. Multi-Page Web Application
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            PawScan is structured for intuitive navigation and clear functionality separation. Our primary pages include:
          </p>
          <ul className="list-none space-y-4 text-lg text-left"> {/* Changed to list-none for custom bullet */}
            <li className="flex items-start mb-2">
              <span className="text-white text-2xl mr-3">✨</span>
              <div>
                <strong className="text-white">Use the AI Model:</strong> This is the heart of the application, where authenticated users can upload images for analysis.
              </div>
            </li>
            <li className="flex items-start mb-2">
              <span className="text-white text-2xl mr-3">🔒</span>
              <div>
                <strong className="text-white">Register and Sign In:</strong> Dedicated pages for new users to create an account and for existing users to log in, ensuring secure access.
              </div>
            </li>
            <li className="flex items-start mb-2">
              <span className="text-white text-2xl mr-3">💡</span>
              <div>
                <strong className="text-white">Explanation of Website Features (You Are Here!):</strong> This page provides a comprehensive breakdown of all functionalities.
              </div>
            </li>
            <li className="flex items-start mb-2">
              <span className="text-white text-2xl mr-3">ℹ️</span>
              <div>
                <strong className="text-white">About Us:</strong> Learn more about the PawScan team, our mission, and the technology behind our platform.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Secure User Authentication - Color: #E3DE61 */}
      <section className="bg-[#E3DE61] py-16 px-4 flex-shrink-0 relative overflow-hidden">
        {/* Subtle diagonal stripe pattern */}
        <div className="absolute inset-0 z-0 opacity-20"
             style={{
               backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,.1) 10px, rgba(0,0,0,.1) 20px)`,
               backgroundSize: '40px 40px',
             }}>
        </div>
        <div className="container mx-auto max-w-4xl text-gray-800 relative z-10 p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl animate-fade-in delay-500">
          <h2 className="text-4xl font-bold mb-6 border-b-2 border-gray-800 pb-2 inline-block">
            2. Secure User Authentication
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            To ensure a personalized and secure experience, PawScan implements a robust user management system:
          </p>
          <ul className="list-none space-y-4 text-lg text-left"> {/* Changed to list-none for custom bullet */}
            <li className="flex items-start mb-2">
              <span className="text-[#F30067] text-2xl mr-3">✍️</span>
              <div>
                <strong className="text-[#F30067]">Registration:</strong> New users can easily create an account, providing necessary credentials for secure access.
              </div>
            </li>
            <li className="flex items-start mb-2">
              <span className="text-[#F30067] text-2xl mr-3">🔑</span>
              <div>
                <strong className="text-[#F30067]">Login:</strong> Existing users can securely log in to their accounts.
              </div>
            </li>
            <li className="flex items-start mb-2">
              <span className="text-[#F30067] text-2xl mr-3">🔐</span>
              <div>
                <strong className="text-[#F30067]">Session Control:</strong> We manage user sessions to maintain a secure and persistent experience during your time on the site.
              </div>
            </li>
            <li className="flex items-start mb-2">
              <span className="text-[#F30067] text-2xl mr-3">🚫</span>
              <div>
                <strong className="text-[#F30067]">Restricted Access:</strong> Access to the powerful AI model features is exclusively granted to authenticated users. This ensures data privacy and efficient resource management.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Intelligent Image Analysis Flow - Color: #2F5249 */}
      <section className="bg-[#2F5249] py-16 px-4 flex-shrink-0 relative overflow-hidden">
        {/* Subtle wave pattern */}
        <div className="absolute inset-0 z-0 opacity-20"
             style={{
               backgroundImage: `radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)`,
               backgroundSize: '150px 150px',
               backgroundRepeat: 'repeat',
             }}>
        </div>
        <div className="container mx-auto max-w-4xl text-white relative z-10 p-8 bg-black bg-opacity-20 rounded-xl shadow-2xl animate-fade-in delay-700">
          <h2 className="text-4xl font-bold mb-6 border-b-2 border-white pb-2 inline-block">
            3. Intelligent Image Analysis Flow
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            Our core offering is the sophisticated AI-powered image analysis, designed specifically for cats and dogs. The process is streamlined and highly accurate:
          </p>
          <ul className="list-none space-y-4 text-lg text-left"> {/* Changed to list-none for custom bullet */}
            <li className="flex items-start mb-2">
              <span className="text-white text-2xl mr-3">⬆️</span>
              <div>
                <strong className="text-white">User Image Upload:</strong> Users can effortlessly upload their pet photos through a user-friendly interface.
              </div>
            </li>
            <li className="flex items-start mb-2">
              <span className="text-white text-2xl mr-3">🧠</span>
              <div>
                <strong className="text-white">Pet Classification:</strong> Upon upload, a highly trained Classification AI Model instantly analyzes the image to determine if it contains a cat or a dog. This initial step ensures efficient processing.
              </div>
            </li>
            <li className="flex flex-col items-start mb-2"> {/* Changed to flex-col for nested list alignment */}
              <span className="text-white text-2xl mr-3 mb-2">⚡️</span>
              <div>
                <strong className="text-white">Advanced Detection & Segmentation (If Pets Detected):</strong>
                <ul className="list-none ml-8 mt-2 space-y-2">
                  <li className="flex items-start mb-1">
                    <span className="text-white text-xl mr-2">🔳</span>
                    <div>
                      <strong className="text-white">Object Detection:</strong> If the classification model identifies pets, our Detection AI Model immediately steps in. It generates precise **bounding boxes** around each detected pet, visually highlighting their exact location within the image.
                    </div>
                  </li>
                  <li className="flex items-start mb-1">
                    <span className="text-white text-xl mr-2">🎨</span>
                    <div>
                      <strong className="text-white">Image Segmentation:</strong> Complementing detection, the Segmentation AI Model provides **pixel-level masks**. This advanced feature outlines the exact contours of each pet, offering a highly detailed visualization of their shape and presence.
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex items-start mb-2">
              <span className="text-white text-2xl mr-3">👀</span>
              <div>
                <strong className="text-white">Clear Visualizations:</strong> The results of both detection and segmentation are displayed with clear, intuitive overlays on your original image, allowing you to easily see the AI's findings.
              </div>
            </li>
            <li className="flex items-start mb-2">
              <span className="text-white text-2xl mr-3">❌</span>
              <div>
                <strong className="text-white">No Pet Detection Feedback:</strong> If the classification model determines that no pets (cats or dogs) are present in the uploaded image, the application will provide a clear and concise message, such as "No pets found in the image," ensuring the user is always informed.
              </div>
            </li>
          </ul>
          <p className="text-xl leading-relaxed text-center mt-10">
            PawScan is continuously evolving, aiming to provide the best possible experience for pet image analysis. We hope you enjoy exploring all our features!
          </p>
        </div>
      </section>

    </div>
  )
}

export default Features