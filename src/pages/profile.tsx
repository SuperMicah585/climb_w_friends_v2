import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../reusableComponents/profileDropdown';
import PurpleButton from '../reusableComponents/genericButton';
import ToastContainer from '../reusableComponents/toastContainer';
import { userObject } from '../types/interfaces';
import climbwfriendsLogo from './homeComponents/climbwfriends.png';

const Profile = () => {
  const { user } = useAuth0();
  const [userData, setUserData] = useState<userObject | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [toastTrigger, setToastTrigger] = useState(0);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const domain = import.meta.env.VITE_DOMAIN;

  useEffect(() => {
    if (user?.sub) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${domain}api/User/${user?.sub}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      setUserData(data);
      setEditedUsername(data.username || '');
    } catch (error) {
      console.error('Error fetching user data:', error);
      setToastType('error');
      setToastMessage('Failed to load user data');
      setToastTrigger(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userData || !user?.sub) return;

    try {
      const response = await fetch(`${domain}api/User/${user.sub}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: editedUsername,
          name: userData.name,
          email: userData.email
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
      setToastType('success');
      setToastMessage('Profile updated successfully!');
      setToastTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error updating user data:', error);
      setToastType('error');
      setToastMessage('Failed to update profile');
      setToastTrigger(prev => prev + 1);
    }
  };

  const handleCancel = () => {
    setEditedUsername(userData?.username || '');
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        trigger={toastTrigger}
        mode="light"
        type={toastType}
        message={toastMessage}
      />
      
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-2 font-changa">
              <img 
                src={climbwfriendsLogo} 
                alt="Climb With Friends Logo" 
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain rounded-full bg-white" 
              />
              <div className="flex items-center justify-center">
                <div className="text-xl sm:text-2xl lg:text-3xl text-violet-700">CLIMB</div>
                <div className="text-xs sm:text-sm text-gray-900">W</div>
                <div className="text-xl sm:text-2xl lg:text-3xl text-gray-900">FRIENDS</div>
              </div>
            </div>
            <div className="text-gray-400">|</div>
            <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/Maps"
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            {!isEditing && (
              <PurpleButton
                paddingLeft="pl-4"
                paddingRight="pr-4"
                clickCallBack={() => setIsEditing(true)}
              >
                Edit Profile
              </PurpleButton>
            )}
          </div>

          <div className="space-y-6">
            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-md text-gray-900">
                {userData?.email || 'Not available'}
              </div>
            </div>

            {/* Name (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-md text-gray-900">
                {userData?.name || 'Not available'}
              </div>
            </div>

            {/* Username (Editable) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="Enter username"
                />
              ) : (
                <div className="bg-gray-50 px-4 py-3 rounded-md text-gray-900">
                  {userData?.username || 'Not set'}
                </div>
              )}
            </div>

            {/* Auth0 ID (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <div className="bg-gray-50 px-4 py-3 rounded-md text-gray-900 text-sm font-mono">
                {userData?.auth0ID || 'Not available'}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-4">
                <PurpleButton
                  paddingLeft="pl-6"
                  paddingRight="pr-6"
                  clickCallBack={handleSave}
                >
                  Save Changes
                </PurpleButton>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 