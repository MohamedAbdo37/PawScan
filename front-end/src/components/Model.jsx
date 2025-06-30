import { useState } from 'react';

const Model = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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

    try {
      const res = await fetch('http://localhost:8080/api/v1/scan', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('Response from server:', data);
      setResult(data);
    } catch (err) {
      console.error('Upload failed:', err);
      setResult({ error: 'Failed to analyze image.' });
    }

    setLoading(false);
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
    </div>
  );
};

export default Model;
