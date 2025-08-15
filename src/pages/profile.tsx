import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../reusableComponents/profileDropdown';
import ToastContainer from '../reusableComponents/toastContainer';
import { userObject } from '../types/interfaces';
import climbwfriendsLogo from './homeComponents/climbwfriends.png';

const Profile = () => {
  const { user } = useAuth0();
  const [userData, setUserData] = useState<userObject | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{[key: string]: string}>({});
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
    } catch (error) {
      console.error('Error fetching user data:', error);
      setToastType('error');
      setToastMessage('Failed to load user data');
      setToastTrigger(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValues(prev => ({ ...prev, [field]: currentValue }));
  };

  const handleSave = async (field: string) => {
    if (!userData || !user?.sub) return;

    try {
      const updateData: any = {};
      
      // Map frontend field names to backend field names
      switch (field) {
        case 'legalName':
          updateData.Name = editValues[field];
          break;
        case 'preferredFirstName':
          updateData.PreferredFirstName = editValues[field];
          break;
        case 'email':
          updateData.Email = editValues[field];
          break;
        case 'phoneNumber':
          updateData.PhoneNumber = editValues[field];
          break;
        case 'username':
          updateData.UserName = editValues[field];
          break;
      }

      const response = await fetch(`${domain}api/User/${user.sub}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setEditingField(null);
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
    setEditingField(null);
    setEditValues({});
  };

  const maskEmail = (email: string) => {
    if (!email) return 'Not provided';
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;
    return `${localPart.charAt(0)}***${localPart.charAt(localPart.length - 1)}@${domain}`;
  };

  const maskPhone = (phone: string) => {
    if (!phone) return 'Not provided';
    if (phone.length <= 4) return phone;
    return `+1 ***-***-${phone.slice(-4)}`;
  };

  const renderField = (label: string, field: string, value: string, isEditable: boolean = true) => {
    const isEditing = editingField === field;
    const displayValue = field === 'email' ? maskEmail(value) : 
                        field === 'phoneNumber' ? maskPhone(value) : 
                        value || 'Not provided';

    return (
      <div className="border-b border-gray-200 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-1">{label}</div>
            {isEditing ? (
              <input
                type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                value={editValues[field] || ''}
                onChange={(e) => setEditValues(prev => ({ ...prev, [field]: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 bg-white"
                placeholder={`Enter ${label.toLowerCase()}`}
                autoFocus
              />
            ) : (
              <div className="text-gray-600">{displayValue}</div>
            )}
          </div>
          <div className="ml-4">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleSave(field)}
                  className="text-violet-600 hover:text-violet-800 underline font-medium"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="text-gray-600 hover:text-gray-800 underline font-medium"
                >
                  Cancel
                </button>
              </div>
            ) : isEditable ? (
              <button
                onClick={() => handleEdit(field, value || '')}
                className="text-violet-600 hover:text-violet-800 underline font-medium"
              >
                {value ? 'Edit' : 'Add'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h1>
            
            <div className="space-y-0">
              {renderField('Legal name', 'legalName', userData?.name || '')}
              {renderField('Preferred first name', 'preferredFirstName', userData?.preferredFirstName || '')}
              {renderField('Email address', 'email', userData?.email || '')}
              {renderField('Phone number', 'phoneNumber', userData?.phoneNumber || '')}
              {renderField('Username', 'username', userData?.username || '')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 