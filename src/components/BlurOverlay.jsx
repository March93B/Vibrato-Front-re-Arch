import React, { useEffect, useState } from "react";
import echolink from '../Styles/echolink.css';
import loading from '../Styles/loading3.gif';
function BlurOverlay({ duration }) {
    const [showOverlay, setShowOverlay] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowOverlay(false);
        document.body.style.overflow = "auto";
      }, duration);
  
   
      document.body.style.overflow = "hidden";
  
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto"; 
      };
    }, [duration]);
  
    return showOverlay ? (
      <div className="blur-overlay">
       
      </div>
    ) : null;
  }

export default BlurOverlay; 