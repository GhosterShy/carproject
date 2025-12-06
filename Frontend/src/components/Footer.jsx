import  React from 'react';

export default function Footer() {
    return(
         <footer className="text-center text-lg-start">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <h5><i className="fas fa-car me-2"></i>CarShare</h5>
          <p>Аренда премиум автомобилей в Москве и области</p>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <h6>Контакты</h6>
          <p><i className="fas fa-phone me-2"></i>+7 (999) 123-45-67</p>
          <p><i className="fas fa-envelope me-2"></i>info@carshare.ru</p>
        </div>
        <div className="col-lg-4 col-md-12">
          <h6>Мы в соцсетях</h6>
          <a href="#" className="text-white me-3"><i className="fab fa-telegram fa-2x"></i></a>
          <a href="#" className="text-white me-3"><i className="fab fa-vk fa-2x"></i></a>
          <a href="#" className="text-white"><i className="fab fa-instagram fa-2x"></i></a>
        </div>
      </div>
      <div className="text-center p-3 border-top border-secondary">
        © 2025 CarShare. Все права защищены.
      </div>
    </div>
  </footer>
    )
}