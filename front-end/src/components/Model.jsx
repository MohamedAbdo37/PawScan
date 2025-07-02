import { useState, useEffect} from 'react';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import PawScanLogo from './PawScanLogo';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase/firebase";

const Model = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true); // or false initially

  


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

  const getToken = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    const token = await user.getIdToken(/* forceRefresh */ true);
    return token;
  };
  

  const navigator = useNavigate();

  const modalclose = () => {
    navigator('/login');
  }

  const modelOpen = () => {
    navigator('/');
  }

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedImage);

    
    let analyzed = false;

    try {
      const res = await fetch('http://localhost:8080/api/v1/scan', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getToken()}`, // 🛡️ JWT Auth header
        },
        body: formData,
      });

      const data = await res.json();
      setResult(data);
      analyzed = true;
    } catch (err) {
      console.error('Upload failed:', err);
      setResult({ error: 'Failed to analyze image.' });
    }

    setLoading(false);

    if (analyzed) { 
      const uid = await auth.currentUser.uid;
      formData.append('uid',uid); // 🐾 Attach user ID to the form data
      try{
        const res = await fetch('http://localhost:8080/api/v1/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getToken()}`, // 🛡️ JWT Auth header
        },
        body: formData,
      });

        if (!res.ok) {
          throw new Error('Failed to upload image');
        }

        console.log('Image uploaded successfully');
        
      } catch (err) {
        console.error('Image upload failed:', err);
        setResult({ error: 'Failed to upload image.' });
      }

    }
  };

  return (
    <div className="min-h-screen bg-[#97B067] text-white font-sans p-6 mt-12 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10px 10px, #FFF8C9 2%, transparent 3%),
            radial-gradient(circle at 30px 30px, #FFF8C9 2%, transparent 3%),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 15 Q 20 5, 25 15 T 35 15 Q 30 20, 35 25 T 25 25 Q 20 35, 15 25 T 5 25 Q 10 20, 5 15 T 15 15' fill='%23FFF8C9' fill-opacity='0.3'/%3E%3C/svg%3E")
          `,
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      
      {/* Main Container */}
      <div className="max-w-5xl mx-auto z-1 relative bg-[#437057] p-10 rounded-2xl shadow-2xl">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">Pet AI Analyzer</h1>
          <p className="text-lg mt-2 text-gray-200">Upload an image to classify, detect, and segment pets</p>
        </header>

        {/* Upload Section */}
        <div className="bg-[#97bd99] p-6 rounded-xl shadow-md max-w-xl mx-auto mb-12 ">
          {selectedImage && (
            <div className="bg-[#2F5249] p-6 rounded-xl text-center  shadow-inner border border-[#437057] mb-4">
              <h2 className="text-2xl font-semibold text-[#E3DE61] mb-4">Original Image</h2>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Original Upload"
                className="lg:max-w-xs max-w-full mx-auto rounded-lg border border-[#97B067]" 
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold">Select Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 bg-[#2F5249] text-white rounded border border-[#97B067] focus:outline-none focus:ring-2 focus:ring-[#E3DE61]"
            />

            <button
              type="submit"
              className="w-full bg-[#E3DE61] text-[#2F5249] font-bold py-2 px-4 rounded hover:bg-[#d4cf55] transition"
            >
              {loading ? 'Analyzing...' : 'Analyze Image'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-8">
            {/* Classification Box */}
            <div className="bg-[#2F5249] p-6 rounded-xl text-center shadow-inner border border-[#437057]">
              <h2 className="text-2xl font-semibold text-[#E3DE61] mb-2">Classification Result</h2>
              <p className="text-lg text-white font-medium">
                <span className="text-[#E3DE61]">Detected:</span> {result.classification}
              </p>
            </div>

            {/* Detection & Segmentation Side-by-Side */}
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {/* Detection */}
              <div className="flex-1 bg-[#2F5249] p-6 rounded-xl text-center shadow-inner border border-[#437057]">
                <h2 className="text-2xl font-semibold text-[#E3DE61] mb-4">Detection</h2>
                <img
                  src={`data:image/png;base64,${result.detection_img}`}
                  alt="Detection"
                  className="max-w-full mx-auto rounded-lg border border-[#97B067]"
                />
              </div>

              {/* Segmentation */}
              <div className="flex-1 bg-[#2F5249] p-6 rounded-xl text-center shadow-inner border border-[#437057]">
                <h2 className="text-2xl font-semibold text-[#E3DE61] mb-4">Segmentation</h2>
                <img
                  src={`data:image/png;base64,${result.mask_img}`}
                  alt="Segmentation"
                  className="max-w-full mx-auto rounded-lg border border-[#97B067]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for additional information or actions */}
      <Modal
          isOpen={ !isAuthorized} // Show modal if user is not authorized
          onRequestClose={modelOpen}
          contentLabel="Authorization Required"
          className="bg-[#437057] text-white p-6 m-auto rounded-lg shadow-2xl w-full
                    flex flex-col items-center space-y-4 border-2 border-[#97B067]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          ariaHideApp={false}
          style={{
            content: {
              // borderRadius: '20px',
              marginTop: '25vh',
              // padding: '40px',
              maxWidth: '500px',
              // maxHeight: '60vh',
              // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              // margin: 'auto',
              textAlign: 'center',
              zIndex: 1000,
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
          }}
      >
        <div className="">
            {/* Logo at the top of the modal content */}
            <div >
              <PawScanLogo size="text-3xl" />
            </div>

            <div className="text-4xl mt-4">🔑</div> {/* Key emoji icon */}
            <p className="text-xl font-semibold text-center leading-relaxed">
              Please log in to access the AI Model features!
            </p>
            <button
              onClick={modalclose} // Use the onClose prop to close the modal
              className="mt-4 px-6 py-2 bg-[#F30067] text-white font-bold rounded-full shadow-md
                        hover:bg-[#CC005A] transition duration-300 transform hover:scale-105"
            >
              Got It!
            </button>
          </div>
      </Modal>

    </div>
  );
};

export default Model;
