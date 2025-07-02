import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase'; // Adjust the import path as necessary
import Modal from 'react-modal';
import AnalyzedImageModal from './AnalyzedImageModal';
import EditProfileModal from './EditProfileModal'; 
import ChangePasswordModal from './ChangePasswordModal'; 

const ProfilePage = () => {
  
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHistoryImage, setSelectedHistoryImage] = useState(null);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false); // New state for edit modal
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);


  const getToken = async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      const token = await user.getIdToken(/* forceRefresh */ true);
      return token;
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getToken();
        const uid = auth.currentUser?.uid; // Get the current user's UID
        if (!uid) throw new Error("User not authenticated");
        const response = await fetch(`http://localhost:8080/api/v1/auth/profile/${uid}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // 🛡️ JWT Auth header
          },
        });

        const data = await response.json();
        setUserProfile(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchUserProfile();
  }, []);



  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true); // Open the edit profile modal
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };


  const handleSaveProfile = (updatedData) => {
    setUserProfile(updatedData);
    setIsEditProfileModalOpen(false);
  };

  const handleChangePassword = () => {
    setIsChangePasswordModalOpen(true); 
  };

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const handleImageClick = (image) => {
    setSelectedHistoryImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHistoryImage(null); // Clear selected image on close
  };


  if (loadingProfile) return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3DE61]">
      <p className="text-2xl font-semibold text-[#2F5249]">Loading profile...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3DE61]">
      <p className="text-2xl font-semibold text-red-600">Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#E3DE61] flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-15"
           style={{
             backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 70%),
                               radial-gradient(circle at 80% 20%, rgba(0,0,0,0.05) 0%, transparent 70%)`,
             backgroundSize: '250px 250px',
             backgroundRepeat: 'repeat',
           }}>
      </div>

      <div className="relative z-1 bg-white bg-opacity-95 p-10 rounded-2xl shadow-2xl max-w-2xl w-full text-center transform animate-fade-in-up">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-10">
          <img
            src={userProfile.profileImageUrl || 'https://placehold.co/150x150/F30067/FFFFFF?text=User'} 
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#F30067] shadow-lg mb-4 transform hover:scale-105 transition duration-300 animate-fade-in delay-200"
          />
          <h1 className="text-4xl font-extrabold text-[#2F5249] mb-2 animate-fade-in delay-300">
            {userProfile.username}
          </h1>
          <p className="text-lg text-gray-600 mb-6 animate-fade-in delay-400">
            {userProfile.email}
          </p>

          {/* Edit Buttons */}
          <div className="flex space-x-4 animate-fade-in delay-500">
            <button
              onClick={handleEditProfile}
              className="px-6 py-2 bg-[#97B067] text-white font-semibold rounded-full shadow-md
                         hover:bg-[#80A05A] transition duration-300 transform hover:scale-105"
            >
              Edit Profile
            </button>
            <button
              onClick={handleChangePassword}
              className="px-6 py-2 bg-[#F30067] text-white font-semibold rounded-full shadow-md
                         hover:bg-[#CC005A] transition duration-300 transform hover:scale-105"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Analyzed Images History Grid */}
        <h2 className="text-3xl font-bold text-[#2F5249] mb-8 border-b-2 border-[#97B067] pb-2 inline-block animate-fade-in delay-600">
          Analyzed Image History
        </h2>
        {userProfile.history.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in delay-700">
            {userProfile.history.map((image) => (
              <div
                key={image.id}
                className="bg-gray-100 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer group"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.originalImageUrl}
                  alt={`Analyzed on ${image.analysisDate}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3 text-sm text-gray-700 font-medium bg-white group-hover:bg-[#97B067] group-hover:text-white transition-all duration-300">
                  {image.analysisDate}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 animate-fade-in delay-700">
            No analyzed images yet. Upload your first photo!
          </p>
        )}
      </div>

        {/* Render the AnalyzedImageModal using react-modal */}
      {isModalOpen && selectedHistoryImage && ( // Conditionally render Modal only if needed
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Analyzed Image Details"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          ariaHideApp={false} // This is important for accessibility, but can be set to true if you handle it globally
          style={{
            content: {
              backgroundColor: 'transparent', // Let the inner component handle background
              border: 'none',
              padding: '0',
              maxWidth: '900px', // Increased max-width for the modal content
              maxHeight: '90vh',
              boxShadow: 'none',
              margin: 'auto',
              overflow: 'auto', // Allow scrolling if content is too tall
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
          }}
        >
          <AnalyzedImageModal
            isOpen={isModalOpen} // Pass isOpen to inner component for its useEffect
            onClose={handleCloseModal}
            imageData={selectedHistoryImage}
            getToken={getToken}
          />
        </Modal>
      )}

      {isEditProfileModalOpen && (
        <Modal
          isOpen={isEditProfileModalOpen}
          onRequestClose={handleCloseEditProfileModal}
          contentLabel="Edit Profile"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          style={{
            content: {
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0',
              maxWidth: '600px',
              maxHeight: '90vh',
              boxShadow: 'none',
              margin: 'auto',
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
          }}
        >
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={handleCloseEditProfileModal}
            userProfile={userProfile}
            onSave={handleSaveProfile}
            getToken={getToken}
          />
        </Modal>
      )}

      {isChangePasswordModalOpen && (
        <Modal
          isOpen={isChangePasswordModalOpen}
          onRequestClose={handleCloseChangePasswordModal}
          contentLabel="Change Password"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          style={{
            content: {
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0',
              maxWidth: '600px',
              maxHeight: '90vh',
              boxShadow: 'none',
              margin: 'auto',
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
          }}
        >
          <ChangePasswordModal
            isOpen={isChangePasswordModalOpen}
            onClose={handleCloseChangePasswordModal}
          />
        </Modal>
      )}

    </div>
  );
};

export default ProfilePage;