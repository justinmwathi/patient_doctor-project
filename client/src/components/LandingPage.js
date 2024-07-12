import React from 'react';

import '../styles/LandingPage.css';
import About from './About';
import Carousel from './Carousel';


function LandingPage() {
    return (
       <>
            <main className="landing-main">
        
                <h2>Welcome to MediCare+</h2>
                <p>Your one-stop solution for managing doctor appointments and medical records.</p>
                <Carousel/>
            </main>
      <About/>
      </>
    );
}

export default LandingPage;


