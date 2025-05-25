// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import HomeNavBar from './homeComponents/homeNavBar';
import ComingSoonPage from '../ComingSoon';
import { useAuth0 } from '@auth0/auth0-react';
import LoginMap from './homeComponents/login_map.png'
import LoginClimbDetails from './homeComponents/climbDetails_login.png'
import MapFilter from './homeComponents/mapFilter_login.png'
import HoverLogin from './homeComponents/hover_login.png'

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
              className="z-20 text-stone-600 font-bold flex p-5 bg-green-400 rounded-lg mt-12 hover:cursor-pointer hover:bg-green-300 transition-colors duration-200"
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
                  <img
                    src={LoginMap}
                    alt="Create Your Map"
                    className="w-full object-cover rounded-lg image-clickable"
                    onClick={() => setModalImage(LoginMap)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-2xl font-bold text-stone-700 mb-3">Create Your Map  </h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                  Explore climbing routes on interactive maps. Add climbs you're interested in, collaborate with friends to build your shared map, and track everyone's activity through the event log. Shapes on the map automatically group nearby climbs for easier navigation and prioritization.                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
              <img
                    src={LoginClimbDetails}
                    alt="Give Your Climbs Context"
                    className="w-full object-cover rounded-lg image-clickable"
                    onClick={() => setModalImage(LoginClimbDetails)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-2xl font-bold text-stone-700 mb-3">Give Your Climbs Context</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                  Log ticks or attempts on climbs, join routes your friends are eyeing, add tags for context, and chat about each climb — all in one place.               </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
              <img
                    src={MapFilter}
                    alt="Filter Climbs"
                    className="w-full object-cover rounded-lg image-clickable"
                    onClick={() => setModalImage(MapFilter)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-2xl font-bold text-stone-700 mb-3">Filter Climbs</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                  Filter climbs based on attributes such as tags, difficulty grade, and the people who have added them to their to-do lists.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                <img
                    src={HoverLogin}
                    alt="Hover Shapes For Details"
                    className="w-full object-cover rounded-lg image-clickable"
                    onClick={() => setModalImage(HoverLogin)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-changa text-2xl font-bold text-stone-700 mb-3">Hover Shapes For Details</h3>
                  <p className="text-stone-600 font-changa text-lg leading-relaxed">
                  Hover over shapes to see grade distribution, number of interested climbers, and total climbs in the area.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </>
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
    </div>
  );
};

export default AuthComponent;