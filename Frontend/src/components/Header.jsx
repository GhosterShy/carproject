import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";



export default function Header() {
    const [searchParams] = useSearchParams();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div className="container">
      <a className="navbar-brand fw-bold text-primary" href="#">
        <i className="fas fa-car me-2"></i>CarShare
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link active" href="#">Автомобили</a></li>
          <li className="nav-item"><a className="nav-link" href="#">О нас</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Контакты</a></li>
        </ul>
      </div>
    </div>
  </nav>
    )

}