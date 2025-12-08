import "../Styles/Rentels.css";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Rentels() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem('authToken');


  useEffect(() => {
    fetchMyRentals();
  }, []);



  const fetchMyRentals = async () => {
    try {
      if (!token) {
        setError("Пожалуйста, войдите в аккаунт");
        setLoading(false);
        return;
      }

      const res = await api("rental/getRental", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setRentals(data.rentals);
      } else {
        setError(data.message || "Не удалось загрузить аренды");
      }
    } catch (err) {
      setError("Ошибка соединения с сервером");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelRental = async (rentalId) => {
    try {
      const res = await api(`rental/${rentalId}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await res.json();
      if (data.success) {
    
        setRentals(rentals.filter((r) => r._id !== rentalId));
        alert("Аренда успешно отменена");
      } else {
        alert(data.message || "Не удалось отменить");
      }
    } catch (err) {
      alert("Ошибка при отмене");
    }
  };




  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  
  const getStatusText = (status) => {
    const map = {
      Active: { text: "Активна", color: "success" },
      Completed: { text: "Завершена", color: "secondary" },
      Cancelled: { text: "Отменена", color: "danger" },
    };
    return map[status] || { text: status, color: "secondary" };
  };

  if (loading) {
    return <Loading />;
  }


  return (
  <div className="container py-5">
      <h1 className="mb-4">Мои аренды</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {rentals.length === 0 && !error && (
        <div className="text-center py-5">
          <i className="bi bi-car-front display-1 text-muted"></i>
          <h3 className="mt-3 text-muted">У вас пока нет аренд</h3>
          <a href="/catalog" className="btn btn-primary btn-lg mt-3">
            Перейти в каталог
          </a>
        </div>
      )}

      <div className="row g-4">
        {rentals.map((rental) => {
          const car = rental.car;
          const status = getStatusText(rental.status);

          return (
            <div key={rental._id} className="col-lg-6">
              <div className="card rental-card shadow-sm h-100">
                <div className="row g-0">
                  <div className="col-md-5">
                    <img
                      src={car.image || "https://via.placeholder.com/400x300"}
                      className="img-fluid car-img w-100 h-100"
                      style={{ objectFit: "cover" }}
                      alt={`${car.brand} ${car.model}`}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">
                          {car.brand} {car.model}
                        </h5>
                        <span className={`badge bg-${status.color} status-badge`}>
                          {status.text}
                        </span>
                      </div>
                      <p className="text-muted small">
                        {car.year} г. • {car.fuelType} • {car.transmission}
                      </p>
                      <hr />

                      <div className="row text-muted small mb-3">
                        <div className="col-6">
                          <i className="bi bi-calendar3"></i> Период<br />
                          <strong>
                            {formatDate(rental.startDate)} —{" "}
                            {formatDate(rental.endDate)}
                          </strong>
                        </div>
                        <div className="col-6">
                          <i className="bi bi-geo-alt"></i> Описание<br />
                          <strong>{car.description}</strong>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <span className="price-day">{car.pricePerDay} т</span>
                            <small className="text-muted">/ день</small>
                          </div>
                          <strong className="text-dark">
                            Итого: {rental.totalPrice}т
                          </strong>
                        </div>

                        <div>
                          <Link state={car} to={`/car/${car._id}`}  className="btn btn-outline-primary btn-sm me-2">
                            Подробности
                          </Link>
                          {rental.status === "Active" && (
                            <button
                              onClick={() => cancelRental(rental._id)}
                              className="btn btn-danger btn-sm"
                            >
                              Отменить
                            </button>
                          )}
                          {rental.status === "Completed" && (
                            <button
                              onClick={() => (window.location.href = `/car/${car._id}`)}
                              className="btn btn-outline-success btn-sm"
                            >
                              Арендовать снова
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}