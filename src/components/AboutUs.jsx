import React from 'react'

const AboutUs = () => {
  return (
   <section className="bg-[#E3DE61]  min-h-screen pt-20 pb-16 px-4 flex-shrink-0">
      <div className="container mx-auto max-w-4xl text-gray-800">
        <h2 className="text-4xl font-bold mb-6 border-b-2 border-gray-800 pb-2">
          About Us
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          PawScan was created with a passion for technology and a love for pets. Our mission is to bridge the gap between advanced artificial intelligence and everyday pet owners, making sophisticated image analysis accessible and fun. We believe that understanding our pets better can lead to deeper bonds and more informed care.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Our team is comprised of dedicated developers and AI enthusiasts committed to delivering a reliable, secure, and user-friendly platform. We continuously work to improve PawScan, enhance its capabilities, and expand its features to meet the evolving needs of our community.
        </p>
        <p className="text-lg leading-relaxed">
          Thank you for being a part of the PawScan journey!
        </p>
      </div>
    </section>
  )
}

export default AboutUs
