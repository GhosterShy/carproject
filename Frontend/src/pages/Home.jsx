import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard.jsx";
import CarFilter from "../components/CarFilter.jsx";
import Loading from "../components/Loading.jsx";
import api from "../api.js";

export default function Home() {
  const [cars, setCars] = useState([]);              
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState([]);

  const token = localStorage.getItem('authToken');

 
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await api('cars/get_all_cars', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });


        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setCars(data.cars || []);
        setFilteredCars(data.cars || []);
      } catch (error) {
        console.error('Ошибка загрузки машин:', error);
        if (error.message.includes('401') || error.response?.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [token, navigate]); 



  const handleFilter = ({ brand, minPrice, maxPrice, status }) => {
    let result = [...cars]; 

    if (brand && brand !== "all") {
      result = result.filter(car => car.brand === brand);
      console.log(result);
    }


    if (minPrice) {
      result = result.filter(car => car.pricePerDay >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter(car => car.pricePerDay <= Number(maxPrice));
    }

    if (status && status !== "all") {
      const isAvailable = status === "true";
      result = result.filter(car => car.available === isAvailable);
    }

    setFilteredCars(result);
    console.log(filteredCars);
  };


 
  const handleReset = () => {
    setFilteredCars(cars);
  };

  if (loading) return <Loading />;

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Аренда автомобилей премиум класса
          </h1>
          <p className="lead mt-3">
            Выберите идеальный автомобиль для вашей поездки из нашего современного парка.<br />
            Удобная аренда с гибкими условиями.
          </p>
        </div>
      </section>

      <div className="container my-5">
        <CarFilter onFilter={handleFilter} onReset={handleReset} />

        <p className="text-muted">
          Найдено автомобилей: <strong>{filteredCars.length}</strong>
          {filteredCars.length !== cars.length && (
            <button className="btn btn-link p-0 ms-3" onClick={handleReset}>
              Сбросить фильтры
            </button>
          )}
        </p>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          
          {loading ? (
            <Loading />
          ) : filteredCars.length > 0 ? (
            filteredCars.map(car => <CarCard key={car.id} car={car} />)
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">Автомобили не найдены.</p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}