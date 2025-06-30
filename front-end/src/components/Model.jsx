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
      const res = await fetch('http://localhost:8000/classify', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Upload failed:', err);
      setResult({ error: 'Failed to analyze image.' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#97B067] text-white font-sans p-6">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10px 10px, #FFF8C9 2%, transparent 3%),
            radial-gradient(circle at 30px 30px, #FFF8C9 2%, transparent 3%),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 15 Q 20 5, 25 15 T 35 15 Q 30 20, 35 25 T 25 25 Q 20 35, 15 25 T 5 25 Q 10 20, 5 15 T 15 15' fill='%23FFF8C9' fill-opacity='0.3'/%3E%3C/svg%3E")
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 20px 20px, 0 0'
        }}
      >
      </div>
      <div className="max-w-4xl mx-auto bg-[#437057] p-8 rounded-xl shadow-lg z-10 relative">
        {/* Header */}
        <header className="text-center mt-16 mb-10">
          <h1 className="text-4xl font-bold text-[#ffffff]">Use the AI Model</h1>
          <p className="text-lg mt-2 text-gray-200">Upload an image to detect and segment pets</p>
        </header>

        {/* Upload Box */}
        <div className="max-w-xl mx-auto bg-[#97bd99] p-6 rounded-xl shadow-lg">
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

        {/* Results */}
        {result && (
          <div className="max-w-4xl mx-auto mt-10 bg-[#2F5249] p-6 rounded-xl shadow-inner border border-[#437057]">
            <h2 className="text-2xl font-semibold text-[#E3DE61] mb-4">Results</h2>

            <div className="flex flex-col items-center">
              {result.image ? (
                <img
                  src={`data:image/png;base64,${result.image}`}
                  alt="AI Result"
                  className="max-w-md rounded-lg mb-4 border border-[#97B067]"
                />
              ) : (
                <p className="text-[#97B067]">{result.message || result.error}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Model
