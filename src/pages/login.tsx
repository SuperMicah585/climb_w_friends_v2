// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import HomeNavBar from './homeComponents/homeNavBar';
import camoBackGroundImage from './homeComponents/black_camo.jpeg';
const AuthComponent: React.FC = () => {
  return (

      <div className="absolute left-0 top-0 flex h-screen w-screen flex-col bg-zinc-800 overflow-y-scroll">
        
          <HomeNavBar />

      <img
          className="h-full w-full object-cover opacity-10 absolute pointer-events-none"
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
*/