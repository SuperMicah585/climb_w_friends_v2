// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import HomeNavBar from './homeComponents/homeNavBar';
import camoBackGroundImage from './homeComponents/black_camo.jpeg';
import placeholder1 from './homeComponents/placeholder1.jpg';
import placeholder2 from './homeComponents/placeholder2.jpg';
import placeholder3 from './homeComponents/placeholder3.jpg';
const AuthComponent: React.FC = () => {
  const mainWords = ['BRINGING ', 'CLIMBERS', 'TOGETHER'];
  return (
    <div className="absolute left-0 top-0 box-border flex h-full w-screen flex-col bg-zinc-700">
      <HomeNavBar />

      <div className="absolute z-10 ml-10 mr-10 mt-24 box-border grid grid-cols-3 items-center gap-10">
        <div className="relative flex h-full w-full items-start justify-center">
          <div
            style={{
              textShadow: `
      -1px -1px 0 #000, /* Top-left shadow */
      1px -1px 0 #000,  /* Top-right shadow */
      -1px 1px 0 #000,  /* Bottom-left shadow */
      1px 1px 0 #000    /* Bottom-right shadow */
    `,
              color: '#fff', // Set the text color
              fontSize: '5vw', // Relative to the container size
              whiteSpace: 'nowrap', // Prevent wrapping
              overflow: 'hidden', // Ensure no overflow
              textAlign: 'center', // Center the text
            }}
            className="10 absolute z-10 w-full font-black"
          >
            {mainWords[0]}
          </div>

          <img
            className="absolute left-0 top-0 h-full max-h-full w-full max-w-full rounded-lg object-contain opacity-70"
            src={placeholder1}
            alt="Description of the image"
          />
        </div>

        <div className="relative flex h-full w-full items-center justify-center">
          <div
            style={{
              textShadow: `
      -1px -1px 0 #000, /* Top-left shadow */
      1px -1px 0 #000,  /* Top-right shadow */
      -1px 1px 0 #000,  /* Bottom-left shadow */
      1px 1px 0 #000    /* Bottom-right shadow */
    `,
              color: '#fff', // Set the text color
              fontSize: '5vw', // Relative to the container size
              whiteSpace: 'nowrap', // Prevent wrapping
              overflow: 'hidden', // Ensure no overflow
              textAlign: 'center', // Center the text
            }}
            className="10 absolute z-10 w-full font-black"
          >
            {mainWords[1]}
          </div>
          <img
            className="h-full max-h-full w-full max-w-full rounded-lg object-contain opacity-70"
            src={placeholder3}
            alt="Description of the image"
          />
        </div>

        <div className="relative flex h-full w-full items-end justify-center">
          <div
            style={{
              textShadow: `
      -1px -1px 0 #000, /* Top-left shadow */
      1px -1px 0 #000,  /* Top-right shadow */
      -1px 1px 0 #000,  /* Bottom-left shadow */
      1px 1px 0 #000    /* Bottom-right shadow */
    `,
              color: '#fff', // Set the text color
              fontSize: '5vw', // Relative to the container size
              whiteSpace: 'nowrap', // Prevent wrapping
              overflow: 'hidden', // Ensure no overflow
              textAlign: 'center', // Center the text
            }}
            className="10 absolute z-10 w-full font-black"
          >
            {mainWords[2]}
          </div>
          <img
            className="h-full max-h-full w-full max-w-full rounded-lg object-cover opacity-70"
            src={placeholder2}
            alt="Description of the image"
          />
        </div>
      </div>

      <img
        className="pointer-events-none absolute h-full w-full object-cover opacity-20"
        src={camoBackGroundImage}
        alt="Description of the image"
      />
    </div>
  );
};

export default AuthComponent;
//climb
//5432

/*

Installation Directory: /Library/PostgreSQL/16
Server Installation Directory: /Library/PostgreSQL/16
Data Directory: /Library/PostgreSQL/16/data
Database Port: 5432
Database Superuser: postgres
Operating System Account: postgres
Database Service: postgresql-16
Command Line Tools Installation Directory: /Library/PostgreSQL/16
pgAdmin4 Installation Directory: /Library/PostgreSQL/16/pgAdmin 4
Stack Builder Installation Directory: /Library/PostgreSQL/16
Installation Log: /tmp/install-postgresql.log


--

http://localhost:5074/api/Maps/User/201
*/
