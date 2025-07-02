import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      setError(null);
      setSuccessMessage(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      setIsLoading(false);
      return;
    }

    // Password validation: at least 8 characters, capital, small, number, symbol
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError("New password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.");
      setIsLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error("User not authenticated.");
      }

      // Step 1: Re-authenticate the user with their current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update password
      await updatePassword(user, newPassword);

      setSuccessMessage("Password changed successfully!");
      setTimeout(() => onClose(), 2000);

    } catch (err) {
      console.error("Error changing password:", err);
      if (err.code === "auth/wrong-password") {
        setError("Current password is incorrect.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Try a stronger one.");
      } else {
        setError(err.message || "Failed to change password.");
      }
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
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label htmlFor="currentPassword" className="block text-left text-sm font-medium text-[#2F5249] mb-1">
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            value={formData.currentPassword}
            onChange={handleChange}
            className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#97B067] sm:text-sm sm:leading-6 transition-all duration-200"
          />
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-left text-sm font-medium text-[#2F5249] mb-1">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            value={formData.newPassword}
            onChange={handleChange}
            className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F30067] sm:text-sm sm:leading-6 transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1 text-left">Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol.</p>
        </div>

        {/* Confirm New Password */}
        <div>
          <label htmlFor="confirmNewPassword" className="block text-left text-sm font-medium text-[#2F5249] mb-1">
            Confirm New Password
          </label>
          <input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            required
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F30067] sm:text-sm sm:leading-6 transition-all duration-200"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="text-green-600 text-sm text-center">
            {successMessage}
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

export default ChangePasswordModal;