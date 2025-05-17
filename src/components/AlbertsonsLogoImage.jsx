import React from 'react';

const AlbertsonsLogoImage = () => {
  // Direct image with base64 - a simplified version of the Albertsons logo
  const logoUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjIiPgogIDxlbGxpcHNlIGN4PSIxMDAiIGN5PSIzMSIgcng9Ijg1IiByeT0iMzAiIGZpbGw9IiMwMDU1QTYiIC8+CiAgPHBhdGggZD0iTTY4LDIwIEw3NSw0NSBIODUgTDgzLDM4IEg5MyBMOTEsNDUgSDEwMSBMMTA4LDIwIEg5OCBMOTMsMzQgTDk1LDIwIEg4NSBMODAsMzUgTDgyLDIwIEg3MiBaIiBmaWxsPSJ3aGl0ZSIgLz4KICA8cGF0aCBkPSJNMTIwLDIwIEwxMTMsNDUgSDEyMyBMMTMwLDIwIFoiIGZpbGw9IndoaXRlIiAvPgo8L3N2Zz4=";
  
  return (
    <img 
      src={logoUrl} 
      alt="Albertsons Logo" 
      className="company-logo" 
    />
  );
};

export default AlbertsonsLogoImage;
