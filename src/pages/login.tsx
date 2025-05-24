// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import HomeNavBar from './homeComponents/homeNavBar';
import ComingSoonPage from '../ComingSoon';
import { useAuth0 } from '@auth0/auth0-react';

//import backGroundImage from './homeComponents/homeBackGround.png'

const AuthComponent: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('Home');
  const { loginWithRedirect } = useAuth0();

  const phrases = [
    "to share with friends.",
    "to track your progress.",
    "to plan new adventures.",
    "to remember every climb.",
    "to inspire others."
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 5000); // Switch every 5 seconds
  
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="absolute left-0 top-0 box-border flex h-full w-screen flex-col bg-white overflow-y-scroll">
      
      {/* Add the CSS animation directly in a style tag */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
      
      <HomeNavBar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      {selectedPage === 'Home' ? (
        <>
          <div className='flex flex-col mt-32 gap-2 items-center'>
            <div className="font-changa text-4xl text-stone-600 text-center">
              <div>Visualize your climbing trips</div>
            </div>
            
            <div className="z-10 flex w-full items-center justify-center font-changa text-7xl font-[1000] text-center">
              <div 
                className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x"
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                {phrases[currentIndex]}
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="text-stone-400 font-changa text-2xl">Turn climbing trip planning into an </div>
              <div className="text-stone-400 font-changa text-2xl font-bold">interactive and collaborative experience</div>
            </div>

            <button 
              onClick={() => loginWithRedirect()} 
              className="text-stone-600 font-bold flex p-5 bg-green-400 rounded-lg mt-12 hover:cursor-pointer hover:bg-green-300 transition-colors duration-200"
            >
              Get Started - It's free
            </button>
          </div>

          {/* Feature Grid Section */}
          <div className="max-w-6xl mx-auto px-6 py-16 mt-16">
            <div className="flex flex-col gap-12">
              
              {/* Feature 1 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg flex items-center justify-center">
                    <div className="text-blue-800 font-changa text-xl font-bold">Feature Image 1</div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-2xl font-bold text-stone-700 mb-3">Plan Your Routes</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                    Discover and plan climbing routes with interactive maps. Mark your favorite spots, 
                    save difficulty ratings, and create detailed itineraries for your next adventure.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div className="w-full h-64 bg-gradient-to-br from-green-200 to-green-400 rounded-lg flex items-center justify-center">
                    <div className="text-green-800 font-changa text-xl font-bold">Feature Image 2</div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-2xl font-bold text-stone-700 mb-3">Track Progress</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                    Log your climbs, track your progress over time, and celebrate your achievements. 
                    Monitor your skill development and set new goals for future climbing sessions.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-purple-400 rounded-lg flex items-center justify-center">
                    <div className="text-purple-800 font-changa text-xl font-bold">Feature Image 3</div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-2xl font-bold text-stone-700 mb-3">Share Adventures</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                    Connect with fellow climbers, share your epic routes, and discover new locations 
                    through the community. Build lasting friendships through shared climbing experiences.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="w-full md:w-1/2">
                  <div className="w-full h-64 bg-gradient-to-br from-orange-200 to-orange-400 rounded-lg flex items-center justify-center">
                    <div className="text-orange-800 font-changa text-xl font-bold">Feature Image 4</div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-2xl font-bold text-stone-700 mb-3">Collaborate</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                    Plan group trips together, coordinate schedules, and share resources. 
                    Make climbing a truly collaborative experience with real-time planning tools.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </>
      ) : (
        <ComingSoonPage />
      )}
    </div>
  );
};

export default AuthComponent;