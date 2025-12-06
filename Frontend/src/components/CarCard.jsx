import React from "react";
import { Link } from "react-router-dom";

export default function CarCard({ car }) {
    return (
        <div className="col">
            <div className="card h-100 border-0 shadow-sm overflow-hidden position-relative" style={{ borderRadius: "20px" }}>
                <div className="position-relative">
                    <img 
                        src={car.image} 
                        className="card-img-top" 
                        alt={`${car.brand} ${car.model}`} 
                        style={{ height: "220px", objectFit: "cover" }}
                    />
                    <span 
                        className={`position-absolute top-0 end-0 m-3 badge px-3 py-2 ${car.available ? "bg-success" : "bg-danger"} text-white`} 
                        style={{ borderRadius: "30px", fontSize: "0.9rem" }}
                    >
                        {car.available ? "Доступно" : "Не доступно"}
                    </span>
                </div>
                <div className="card-body p-4">
                    <h5 className="card-title mb-1 fw-bold">{car.brand} {car.model}</h5>
                    <p className="text-muted mb-3" style={{ fontSize: "1.1rem" }}>{car.year}</p>
                    
                    <div className="d-flex align-items-center gap-3 text-secondary mb-4">
                        <span><i className="fas fa-cog me-1"></i> {car.transmission}</span>
                        <span><i className="fas fa-gas-pump me-1"></i> {car.fuelType}</span>
                        <span><i className="fas fa-user-friends me-1"></i> {car.seats}</span>
                    </div>

                    <p className="text-muted mb-3 small">{car.description}</p>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="text-muted small">Цена</div>
                            <div className="car_price" style={{ fontWeight: "100",color: "#1c6db8ff" }}>
                                {car.pricePerDay.toLocaleString()}т
                                <small className="text-muted fs-6">/день</small>
                            </div>
                        </div>
                        <Link to={`/car/${car.id}`} className="btn btn-primary rounded-pill px-4 py-2 shadow-sm" style={{ fontWeight: "600" }}>
                            Подробнее
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}