import React from 'react';
import './Home.css';
import '../components/footer/Footer.css';
import Cards from '../components/cards/Cards';
import Footer from '../components/footer/Footer';


const Home = () => {
  return (
    <div>
      <div className="cards__box">
        <Cards />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
