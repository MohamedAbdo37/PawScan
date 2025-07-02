import { useState, useEffect } from 'react';

const AnalyzedImageModal = ({ isOpen, onClose, imageData, getToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResultImage, setAiResultImage] = useState(null);
  const [aiResultMessage, setAiResultMessage] = useState(null);
  const [error, setError] = useState(null);

  const api_root = import.meta.env.VITE_API_URL_ROOT || 'http://localhost:8080';


  // Reset state when modal opens/closes or image data changes
  useEffect(() => {
    if (isOpen) {
      setAiResultImage(null);
      setAiResultMessage(null);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen, imageData]);

  const handleRescan = async () => {
    if (!imageData || !imageData.originalImageUrl) {
      setError("No image selected for rescan.");
      return;
    }

    setIsLoading(true);
    setAiResultImage(null);
    setAiResultMessage(null);
    setError(null);

    try {
      const token = await getToken();
      const formData = new FormData();
      const imageBlobResponse = await fetch(imageData.originalImageUrl);
      const imageBlob = await imageBlobResponse.blob();
      formData.append('file', imageBlob, `image-${imageData.id}.png`);

      const res = await fetch(`${api_root}/api/v1/scan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Backend error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      console.log("Rescan Result:", data);

      if (data) {
        setAiResultImage(data);
        setAiResultMessage(data.message || "Pets detected and analyzed!");
      } else {
        setAiResultMessage(data.message || "Analysis complete, but no clear pets detected.");
        setAiResultImage(null);
      }

    } catch (err) {
      console.error("Error during rescan:", err);
      setError(err.message || "Failed to rescan image. Please check server and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // This component is designed to be rendered within a modal container.
  // It no longer has its own fixed positioning.
  return (
    <div className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl max-w-2xl w-full text-center relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold transition-transform duration-200 transform hover:scale-110"
      >
        &times;
      </button>

      <h2 className="text-3xl font-bold text-[#2F5249] mb-6 border-b-2 border-[#97B067] pb-2 inline-block mx-auto">
        Image Details & Rescan
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        {/* Original Image */}
        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Original Image</h3>
          <img
            src={imageData.originalImageUrl}
            alt={`Original from ${imageData.analysisDate}`}
            className="max-h-64 w-auto rounded-lg shadow-md object-contain border border-gray-200"
          />
          <p className="text-sm text-gray-600 mt-2">Analyzed on: {imageData.analysisDate}</p>
        </div>

        {/* Rescan Button */}
        <div className="md:w-auto flex flex-col justify-center items-center">
          <button
            onClick={handleRescan}
            disabled={isLoading}
            className={`px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg transition duration-300 transform hover:scale-105
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F30067] hover:bg-[#CC005A]'}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Rescanning...
              </span>
            ) : (
              "Rescan Image"
            )}
          </button>
        </div>
      </div>

      {/* Rescan Results Display Section */}
      {(aiResultImage || aiResultMessage || error) && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner animate-fade-in">
          <h3 className="text-2xl font-bold text-[#2F5249] mb-4">Rescan Results</h3>
          {error ? (
            <div className="text-red-600 text-lg">{error}</div>
          ) : aiResultImage ? (
            <div className="flex flex-row justify-center gap-4 mb-4"> {/* Flex container for side-by-side images */}
              <img 
                src={`data:image/png;base64,${aiResultImage.detection_img}`} 
                alt="AI Detection Result" 
                className="max-h-40 w-auto rounded-md shadow-lg object-contain border border-gray-300" 
              />
              <img 
                src={`data:image/png;base64,${aiResultImage.mask_img}`} 
                alt="AI Mask Result" 
                className="max-h-40 w-auto rounded-md shadow-lg object-contain border border-gray-300" 
              />
            </div>
          ) : (
            <div className="text-xl text-gray-700 font-semibold mb-4">
              {aiResultMessage}
            </div>
          )}
          {aiResultMessage && aiResultImage && (
            <p className="text-lg text-gray-600 mt-2">{aiResultMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyzedImageModal;