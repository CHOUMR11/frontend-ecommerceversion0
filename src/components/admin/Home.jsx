import Carousel from 'react-bootstrap/Carousel';

function Home() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img className="d-block w-100" src="https://img.freepik.com/photos-gratuite/boutique-e-commerce-ligne-concept-vente-page-accueil_53876-127542.jpg?t=st=1734600673~exp=1734604273~hmac=fde94aabe30401111b26e099c7558be8f59e1d1bb57487800c09dda8f3e656e0&w=996" alt="First slide"/>
        
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="https://img.freepik.com/photos-gratuite/montrant-panier-chariot-shopping-ligne-signe-graphique_53876-133967.jpg?semt=ais_hybrid" alt="Second slide" />
        
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="https://cdn.pixabay.com/photo/2021/11/22/20/20/online-6817350_640.jpg"  alt="Third slide"/>
        
        
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;