import React from 'react'

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen pt-14"> {/* Removed max-w-4xl from here to allow sections to span full width */}

      {/* Section for Title and Intro Paragraph - Color: #437057 */}
      <section className="bg-[#437057] py-16 px-4 flex-shrink-0">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-5xl font-extrabold mb-6">
            PawScan Features: Unveiling Our Capabilities
          </h1>
          <p className="text-xl leading-relaxed">
            Welcome to the features overview of PawScan! Our application is designed to provide a seamless and insightful experience for analyzing images of your beloved pets. Below, we detail the core functionalities that make PawScan a powerful tool for pet owners and enthusiasts.
          </p>
        </div>
      </section>

      {/* Section 1: Multi-Page Web Application - Color: #97B067 */}
      <section className="bg-[#97B067] py-16 px-4 flex-shrink-0">
        <div className="container mx-auto max-w-4xl text-white"> {/* Text color set to white for contrast */}
          <h2 className="text-4xl font-bold mb-6 border-b-2 border-white pb-2">
            1. Multi-Page Web Application
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            PawScan is structured for intuitive navigation and clear functionality separation. Our primary pages include:
          </p>
          <ul className="list-disc list-inside space-y-3 text-lg pl-5">
            <li className="mb-2">
              <strong className="text-white">Use the AI Model:</strong> This is the heart of the application, where authenticated users can upload images for analysis.
            </li>
            <li className="mb-2">
              <strong className="text-white">Register and Sign In:</strong> Dedicated pages for new users to create an account and for existing users to log in, ensuring secure access.
            </li>
            <li className="mb-2">
              <strong className="text-white">Explanation of Website Features (You Are Here!):</strong> This page provides a comprehensive breakdown of all functionalities.
            </li>
            <li className="mb-2">
              <strong className="text-white">About Us:</strong> Learn more about the PawScan team, our mission, and the technology behind our platform.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Secure User Authentication - Color: #E3DE61 */}
      <section className="bg-[#E3DE61] py-16 px-4 flex-shrink-0">
        <div className="container mx-auto max-w-4xl text-gray-800"> {/* Text color set to gray for contrast */}
          <h2 className="text-4xl font-bold mb-6 border-b-2 border-gray-800 pb-2">
            2. Secure User Authentication
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            To ensure a personalized and secure experience, PawScan implements a robust user management system:
          </p>
          <ul className="list-disc list-inside space-y-3 text-lg pl-5">
            <li className="mb-2">
              <strong className="text-[#F30067]">Registration:</strong> New users can easily create an account, providing necessary credentials for secure access.
            </li>
            <li className="mb-2">
              <strong className="text-[#F30067]">Login:</strong> Existing users can securely log in to their accounts.
            </li>
            <li className="mb-2">
              <strong className="text-[#F30067]">Session Control:</strong> We manage user sessions to maintain a secure and persistent experience during your time on the site.
            </li>
            <li className="mb-2">
              <strong className="text-[#F30067]">Restricted Access:</strong> Access to the powerful AI model features is exclusively granted to authenticated users. This ensures data privacy and efficient resource management.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Intelligent Image Analysis Flow - Color: #2F5249 (new color from palette) */}
      <section className="bg-[#2F5249] py-16 px-4 flex-shrink-0"> {/* Updated to new color #2F5249 */}
        <div className="container mx-auto max-w-4xl text-white"> {/* Text color set to white for contrast */}
          <h2 className="text-4xl font-bold mb-6 border-b-2 border-white pb-2">
            3. Intelligent Image Analysis Flow
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Our core offering is the sophisticated AI-powered image analysis, designed specifically for cats and dogs. The process is streamlined and highly accurate:
          </p>
          <ul className="list-disc list-inside space-y-3 text-lg pl-5 mb-6">
            <li className="mb-2">
              <strong className="text-white">User Image Upload:</strong> Users can effortlessly upload their pet photos through a user-friendly interface.
            </li>
            <li className="mb-2">
              <strong className="text-white">Pet Classification:</strong> Upon upload, a highly trained Classification AI Model instantly analyzes the image to determine if it contains a cat or a dog. This initial step ensures efficient processing.
            </li>
            <li className="mb-2">
              <strong className="text-white">Advanced Detection & Segmentation (If Pets Detected):</strong>
              <ul className="list-circle list-inside ml-8 mt-2 space-y-2">
                <li className="mb-1">
                  <strong className="text-white">Object Detection:</strong> If the classification model identifies pets, our Detection AI Model immediately steps in. It generates precise **bounding boxes** around each detected pet, visually highlighting their exact location within the image.
                </li>
                <li className="mb-1">
                  <strong className="text-white">Image Segmentation:</strong> Complementing detection, the Segmentation AI Model provides **pixel-level masks**. This advanced feature outlines the exact contours of each pet, offering a highly detailed visualization of their shape and presence.
                </li>
              </ul>
            </li>
            <li className="mb-2">
              <strong className="text-white">Clear Visualizations:</strong> The results of both detection and segmentation are displayed with clear, intuitive overlays on your original image, allowing you to easily see the AI's findings.
            </li>
            <li className="mb-2">
              <strong className="text-white">No Pet Detection Feedback:</strong> If the classification model determines that no pets (cats or dogs) are present in the uploaded image, the application will provide a clear and concise message, such as "No pets found in the image," ensuring the user is always informed.
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
