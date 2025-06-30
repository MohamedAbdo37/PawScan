const AboutUs = () => {
  return (
    // About Us Section - Color: #E3DE61 (recycled from palette) with added aesthetic touches
    <section className="bg-[#E3DE61] py-20 px-4 flex-shrink-0 relative overflow-hidden">
      {/* Subtle background pattern - using concentric circles for a soft, friendly feel */}
      <div className="absolute inset-0 z-0 opacity-20"
           style={{
             backgroundImage: `radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 70%),
                               radial-gradient(circle at 90% 80%, rgba(0,0,0,0.05) 0%, transparent 70%)`,
             backgroundSize: '200px 200px',
             backgroundRepeat: 'repeat',
           }}>
      </div>

      <div className="container mx-auto max-w-4xl text-gray-800 relative z-10
                      p-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl
                      transform animate-fade-in-up"> {/* Added padding, rounded corners, shadow, and animation */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center
                       text-gray-900 border-b-4 border-[#97B067] pb-4 inline-block mx-auto">
          About PawScan
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-center text-gray-700 animate-fade-in delay-200">
          At PawScan, our journey began with a simple idea: to combine our passion for cutting-edge technology with our deep love for animals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg leading-relaxed mt-8">
          <div className="animate-fade-in delay-400">
            <h3 className="text-2xl font-semibold mb-3 text-[#F30067]">Our Mission</h3>
            <p className="mb-4">
              Our core mission is to bridge the gap between advanced artificial intelligence and everyday pet owners. We strive to make sophisticated image analysis accessible, intuitive, and fun, empowering you to gain deeper insights into your beloved cats and dogs. We believe that a better understanding of our furry companions fosters stronger bonds and enables more informed care.
            </p>
          </div>

          <div className="animate-fade-in delay-600">
            <h3 className="text-2xl font-semibold mb-3 text-[#F30067]">The Journey: Knights Lab Collaboration</h3>
            <p className="mb-4">
              This project, PawScan, was developed with the support of **Knights Lab**. The core AI models used in this application were built by Knights Lab, and this project focuses on their seamless integration into a robust web platform for real-world use. It showcases our collaborative capability in bringing complex machine learning solutions to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs
