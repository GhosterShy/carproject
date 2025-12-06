import React from "react";
import "../Styles/Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import CarCard from "../components/CarCard.jsx";
import CarFilter from "../components/CarFilter.jsx";
import Loading from "../components/Loading.jsx";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || ""; 
    const [authorized, setAuthorized] = useState(true);
    const token = localStorage.getItem('authToken');

    const [filteredCars, setFilteredCars] = useState([]);


    useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://74713bf48bcf197a.mokky.dev/cars',{
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
        setCars(response.data);
        setAuthorized(true);
        setFilteredCars(response.data);


      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAuthorized(false);
          console.log('Пользователь не авторизован. Пожалуйста, войдите в систему.');
        } else
        console.error('Ошибка загрузки новостей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);






  const handleFilter = ({ brand, minPrice, maxPrice, status }) => {
    let filtered = cars;

    if (brand !== "all") {
      filtered = filtered.filter((car) => car.brand === brand);
    }

    if (minPrice) {
      filtered = filtered.filter((car) => car.pricePerDay >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((car) => car.pricePerDay <= maxPrice);
    }

    if (status !== "all") {
      if (status === "available") {
        filtered = filtered.filter((car) => car.available === true);
      } else {
        filtered = filtered.filter((car) => car.available === false);
      }
    }

    setFilteredCars(filtered);
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

                {/* Фильтры */}
                <CarFilter onFilter={handleFilter} />


                <p className="text-muted">
                    Найдено автомобилей: <strong id="car-count">{filteredCars.length}</strong>
                </p>

                <div 
                    className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4" 
                    id="cars-container"
                >

                    {/* Автомобиль */}
                     {filteredCars.map(item => (
                        <CarCard key={item.id} car={item} />
                    ))}

                </div>
            </div>
        </main>
    );
}
