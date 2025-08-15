import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex items-center gap-2">
      {/* Login Button - Transparent with purple text */}
      <button
        onClick={() => loginWithRedirect()}
        className="bg-transparent text-violet-800 hover:bg-violet-300/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 border-0 text-sm font-medium transition-all duration-200"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(167, 139, 250, 0.1)'; // violet-300/20
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        Login
      </button>
      
      {/* Sign Up Button - Purple background */}
      <button
        onClick={() => loginWithRedirect()}
        className="bg-violet-600 text-white hover:bg-violet-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 border-0 text-sm font-medium transition-all duration-200"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#7c3aed'; // violet-700
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#9333ea'; // violet-600
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons; 