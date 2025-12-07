import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import "../Styles/Detail.css";
import api from "../api";


export default function CarDetail() {
   
    const { id } = useParams();
    const location = useLocation();
    const carDataFromState = location.state;
    const [carData, setcarData] = useState(carDataFromState || null);
    const [loading, setLoading] = useState(!carDataFromState);

    console.log(id);


    useEffect(() => {
        if (!carDataFromState) {
        const fetchcarData = async () => {
            try {
            const response = await api(`/cars/${id}`);

            
            setcarData(response.data.car);
            } catch (error) {
            console.error("Ошибка загрузки:", error);
            } finally {
            setLoading(false);
            }
        };
        fetchcarData();
        }
  }, [id, carDataFromState]);

  if (!carData) {
    return <Loading />;
  }


  

    return (
        <div className="container py-5">
            
            <Link to={'/'} className="back-btn mb-4 d-inline-flex">
                <i className="fas fa-arrow-left"></i> Назад к списку
            </Link>

           
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="row g-0">
                    
                    <div className="col-lg-6 position-relative">

                        
                        <img 
                            src={carData.image}
                            alt={`${carData.brand} ${carData.model} ${carData.year}`} 
                            className="w-100 car-image" 
                        />
                        
                        
                        <div className={`badge-availability badge ${carData.available ? 'bg-success' : 'bg-danger'} text-white`}>
                            <i className={`fas ${carData.available ? 'fa-check-circle' : 'fa-times-circle'} me-2`}></i>
                            {carData.available ? 'Доступно' : 'Не доступно'}
                        </div>
                    </div>

                  
                    <div className="col-lg-6 p-5 p-lg-8 d-flex flex-column justify-content-between">
                        <div>
                            <h1 className="display-5 fw-bold mb-2">{carData.brand} {carData.model}</h1>
                            <p className="text-muted fs-4 mb-4">
                                <i className="far fa-calendar-alt me-2"></i>{carData.year} год
                            </p>

                            <p className="text-secondary lead mb-5">
                                {carData.description}
                            </p>

                          
                            <div className="row g-4 mb-5">
                                <div className="col-6">
                                    <div className="spec-box">
                                        <i className="fas fa-cog fa-2x text-primary mb-3"></i>
                                        <p className="small text-muted mb-1">Трансмиссия</p>
                                        <p className="fw-bold">{carData.transmission}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="spec-box">
                                        <i className="fas fa-gas-pump fa-2x text-primary mb-3"></i>
                                        <p className="small text-muted mb-1">Топливо</p>
                                        <p className="fw-bold">{carData.fuelType}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="spec-box">
                                        <i className="fas fa-users fa-2x text-primary mb-3"></i>
                                        <p className="small text-muted mb-1">Мест</p>
                                        <p className="fw-bold">{carData.seats}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="spec-box">
                                        <i className="fas fa-tachometer-alt fa-2x text-primary mb-3"></i>
                                        <p className="small text-muted mb-1">Мощность</p>
                                        <p className="fw-bold">{carData.power}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                       
                        <div className="border-top pt-5">
                            <div className="d-flex justify-content-between align-items-end">
                                <div>
                                    <p className="text-muted mb-1">Цена аренды</p>
                                    <div className="price-big">
                                        {carData.pricePerDay} T
                                        <span className="fs-5 text-muted fw-normal">/ день</span>
                                    </div>
                                </div>
                                <button 
                                    className="btn btn-primary btn-lg btn-booking shadow-lg"
                                    disabled={!carData.available}
                                >
                                    {carData.available ? 'Забронировать' : 'Не доступно'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    
            <div className="mt-5 bg-white rounded-3xl shadow-xl p-5 p-lg-8">
                <h2 className="h3 fw-bold mb-5">Условия аренды</h2>
                <div className="row text-center text-lg-start">
                    {/* {rentalConditions.map((condition, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <h5 className="fw-bold">{condition.title}</h5>
                            <p className="text-secondary">{condition.value}</p>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );  
}