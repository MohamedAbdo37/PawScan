import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';

const EditProfileModal = ({ isOpen, onClose, userProfile, onSave, getToken }) => {
  const [formData, setFormData] = useState({
    username: userProfile.username,
    email: userProfile.email,
    profileImageFile: null, // For new file upload
  });
  const [previewImageUrl, setPreviewImageUrl] = useState(userProfile.profileImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_root = import.meta.env.VITE_API_URL_ROOT || 'http://localhost:8080';

  useEffect(() => {
    // Reset form data and preview when modal opens/closes or userProfile changes
    if (isOpen) {
      setFormData({
        username: userProfile.username,
        email: userProfile.email,
        profileImageFile: null, // Reset file input
      });
      setPreviewImageUrl(userProfile.profileImageUrl);
      setIsLoading(false);
      setError(null);
    }
  }, [isOpen, userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImageFile: file }));
      setPreviewImageUrl(URL.createObjectURL(file)); // Create URL for preview
    } else {
      setFormData((prev) => ({ ...prev, profileImageFile: userProfile.profileImageUrl }));
      setPreviewImageUrl(userProfile.profileImageUrl); // Revert to original if no file selected
    }
  };
   

  const handleSubmit = async (e) => {
    const updatePayload = {
      username: formData.username,
      email: formData.email,
      // profileImageUrl: formData.profileImageFile ? URL.createObjectURL(formData.profileImageFile) : userProfile.profileImageUrl, // Use existing URL if no new file
    };

    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const uid = auth.currentUser?.uid; // Get current user's UID for the API call

      if (!uid) {
        throw new Error("User not authenticated for profile update.");
      }

      // Handle profile image upload if a new file is selected
      let newProfileImageUrl = userProfile.profileImageUrl;

      if (formData.profileImageFile) {
        const fileForm = new FormData();
        fileForm.append('file', formData.profileImageFile);
        fileForm.append('uid', uid);

        const uploadRes = await fetch(
          `${api_root}/v1/auth/upload/profile-image`,
          {
            method: 'POST',                    // ← HERE
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              // NOTE: Do NOT set Content-Type for multipart — browser will do it
            },
            body: fileForm,
          }
        );

        if (!uploadRes.ok) {
          const errorText = await uploadRes.text();
          throw new Error(`Image upload error: ${uploadRes.status} — ${errorText}`);
        }

        const uploadData = await uploadRes.json();
        newProfileImageUrl = uploadData.imageUrl;
      }

      // Send update request to backend
      const res = await fetch(`${api_root}/v1/auth/update/profile/${uid}`, {
        method: 'PUT', // Assuming PUT for updating profile
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...updatePayload,
          profileImageUrl: newProfileImageUrl, // Include the new or existing image URL
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Backend update error: ${res.status} - ${errorText}`);
      }

      const updatedData = await res.json();
      console.log("Profile updated successfully:", updatedData);
      onSave({ ...userProfile, ...updatedData, profileImageUrl: newProfileImageUrl }); // Update parent state
      onClose(); // Close modal on success

    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl max-w-xl w-full text-center relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold transition-transform duration-200 transform hover:scale-110"
      >
        &times;
      </button>

      <h2 className="text-3xl font-bold text-[#2F5249] mb-6 border-b-2 border-[#97B067] pb-2 inline-block mx-auto">
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={previewImageUrl || 'https://placehold.co/150x150/F30067/FFFFFF?text=User'}
            alt="Profile Preview"
            className="w-28 h-28 rounded-full object-cover border-3 border-[#F30067] shadow-md mb-3"
          />
          <label htmlFor="profileImage" className="cursor-pointer px-4 py-2 bg-[#97B067] text-white font-semibold rounded-full shadow-md hover:bg-[#80A05A] transition duration-300">
            Change Image
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-left text-sm font-medium text-[#2F5249] mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#97B067] sm:text-sm sm:leading-6 transition-all duration-200"
          />
        </div>

        {/* Email Input (often read-only or requires re-auth for change) */}
        {/* <div>
          <label htmlFor="email" className="block text-left text-sm font-medium text-[#2F5249] mb-1">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#97B067] sm:text-sm sm:leading-6 transition-all duration-200"
            readOnly // Email is often read-only for security reasons
          />
          <p className="text-xs text-gray-500 mt-1 text-left">Email changes may require re-authentication.</p>
        </div> */}

        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-full shadow-md
                       hover:bg-gray-400 transition duration-300 transform hover:scale-105"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-2 rounded-full text-white font-bold shadow-lg transition duration-300 transform hover:scale-105
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F30067] hover:bg-[#CC005A]'}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;