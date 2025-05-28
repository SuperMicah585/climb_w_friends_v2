// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import HomeNavBar from './homeComponents/homeNavBar';
import ComingSoonPage from '../ComingSoon';
import { useAuth0 } from '@auth0/auth0-react';
import LoginClimbDetails from './homeComponents/climbDetails_login.png'
import MapFilter from './homeComponents/mapFilter_login.png'
import HoverLogin from './homeComponents/hover_login.png'
import MapDashboard from './homeComponents/mapDashboard.png'
import MapEventLog from './homeComponents/mapEventLog.png'

//import backGroundImage from './homeComponents/homeBackGround.png'

const AuthComponent: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('Home');
  const [modalImage, setModalImage] = useState<string | null>(null);
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
    <div className="absolute top-0 left-0 h-full box-border w-screen flex-col bg-white overflow-y-scroll">
      
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
        
        .image-clickable {
          cursor: pointer;
          transition: opacity 0.2s ease-in-out;
        }
        
        .image-clickable:hover {
          opacity: 0.8;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .modal-image {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
          animation: scaleIn 0.3s ease-in-out;
        }
        
        .close-button {
          position: absolute;
          top: 20px;
          right: 30px;
          color: white;
          font-size: 40px;
          font-weight: bold;
          cursor: pointer;
          z-index: 1001;
          transition: opacity 0.2s ease-in-out;
        }
        
        .close-button:hover {
          opacity: 0.7;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.8);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      
      <HomeNavBar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      {selectedPage === 'Home' ? (
        <div>
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
              className="z-20 text-stone-600 font-bold flex p-5 bg-green-400 rounded-lg mt-12 hover:cursor-pointer hover:bg-green-300 transition-colors duration-200"
            >
              Get Started - It's free
            </button>
          </div>

          {/* Feature Grid Section */}
          
          <div className="max-w-6xl mx-auto px-6 py-16 mt-16">
            <div className="flex flex-col gap-12">
             
              {/* Feature 1 - Dashboard */}
              <div className="flex flex-col md:flex-row items-top gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-3xl font-bold text-stone-700 mb-3">Create and Manage Your Maps</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                    <span className="text-purple-700 font-semibold">Create and edit maps</span>, <span className="text-purple-700 font-semibold">add friends</span>, and view <span className="text-purple-700 font-semibold">statistics</span> for individual maps as well as <span className="text-purple-700 font-semibold">overall stats across all your maps</span>.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src={MapDashboard}
                    alt="Create Your Map"
                    className="w-full object-cover rounded-lg image-clickable"
                    onClick={() => setModalImage(MapDashboard)}
                  />
                </div>
              </div>

              {/* Feature 2 - Adding Climbs */}
              <div className="flex flex-col md:flex-row items-top gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-3xl font-bold text-stone-700 mb-3">Start Adding Climbs</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                    Explore <span className="text-purple-700 font-semibold">climbing routes</span> on <span className="text-purple-700 font-semibold">interactive maps</span> and add <span className="text-purple-700 font-semibold">climbs you're interested in</span>. <span className="text-purple-700 font-semibold">Collaborate with friends</span> to build your <span className="text-purple-700 font-semibold">shared map</span>, and track everyone's activity through the <span className="text-purple-700 font-semibold">event log</span>.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src={MapEventLog}
                    alt="Start Adding Climbs"
                    className="w-full object-cover rounded-lg image-clickable"
                    onClick={() => setModalImage(MapEventLog)}
                  />
                </div>
              </div>

              {/* Feature 3 - Hover Details */}
              <div className="flex flex-col md:flex-row items-top gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-3xl font-bold text-stone-700 mb-3">Zoom in For More Details</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                    <span className="text-purple-700 font-semibold">Zoom in</span> on areas that interest you to get a more <span className="text-purple-700 font-semibold">detailed view</span>. <span className="text-purple-700 font-semibold">Hover over shapes</span> to see <span className="text-purple-700 font-semibold">grade distribution</span>, <span className="text-purple-700 font-semibold">number of interested climbers</span>, and <span className="text-purple-700 font-semibold">total climbs in the area</span>.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src={HoverLogin}
                    alt="Hover Shapes For Details"
                    className="w-full object-cover rounded-lg image-clickable"
                    onClick={() => setModalImage(HoverLogin)}
                  />
                </div>
              </div>

              {/* Feature 4 - Climb Contehhhhhxt */}
              <div className="flex flex-col md:flex-row items-top gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-3xl font-bold text-stone-700 mb-3">Give Your Climbs Context</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                    <span className="text-purple-700 font-semibold">Click on shapes</span> to give your climbs more context. <span className="text-purple-700 font-semibold">Log ticks or attempts</span> on climbs, <span className="text-purple-700 font-semibold">join routes your friends are eyeing</span>, add <span className="text-purple-700 font-semibold">tags for context</span>, and <span className="text-purple-700 font-semibold">chat about each climb</span> — all in one place.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src={LoginClimbDetails}
                    alt="Give Your Climbs Context"
                    className="w-full object-cover rounded-lg image-clickable"
                    onClick={() => setModalImage(LoginClimbDetails)}
                  />
                </div>
              </div>

              {/* Feature 5 - Filtering */}
              <div className="flex flex-col md:flex-row items-top gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-3xl font-bold text-stone-700 mb-3">Filter Climbs</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                    <span className="text-purple-700 font-semibold">Filter climbs</span> based on attributes such as <span className="text-purple-700 font-semibold">tags</span>, <span className="text-purple-700 font-semibold">difficulty grade</span>, and <span className="text-purple-700 font-semibold">the people who have added them</span> to their <span className="text-purple-700 font-semibold">to-do lists</span>.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src={MapFilter}
                    alt="Filter Climbs"
                    className="w-full object-cover rounded-lg image-clickable"
                    onClick={() => setModalImage(MapFilter)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ComingSoonPage />
      )}
      
      {/* Image Modal */}
      {modalImage && (
        <div 
          className="modal-overlay"
          onClick={() => setModalImage(null)}
        >
          <span 
            className="close-button"
            onClick={() => setModalImage(null)}
          >
            ×
          </span>
          <img
            src={modalImage}
            alt="Full size view"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

<footer className="bg-violet-600 flex flex-col items-center justify-center text-white gap-4 py-10 px-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-left">
          <div className="text-2xl sm:text-3xl font-bold font-changa">ClimbWithFriends</div>
          <div className="text-base sm:text-lg sm:border-l border-violet-300 sm:pl-6">cwfauth@gmail.com</div>
        </div>
        <div className="text-xs sm:text-sm text-violet-200">© 2025 All rights reserved</div>
      </footer>
    </div>
  );
};

export default AuthComponent;