import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import "../Styles/Detail.css";
import api from "../api";
import { format, differenceInDays } from 'date-fns';


export default function CarDetail() {
   
    const { id } = useParams();
    const location = useLocation();
    const carDataFromState = location.state;
    const [carData, setcarData] = useState(carDataFromState || null);
    const [loading, setLoading] = useState(!carDataFromState);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = localStorage.getItem('authToken');
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // console.log(id);


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

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const res = await api(`cars/${id}/comments`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (res.ok) {
              const data = await res.json();
              setComments(data);
            }
          } catch (error) {
            console.error('Ошибка загрузки комментариев:', error);
          }
        };
        fetchComments();
      }, [id, token]);


    const addComment = async (e) => { e.preventDefault();
        const res = await api(`cars/${id}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ text: newComment })
        });
        if (res.ok) {
          const comment = await res.json();
          setComments([comment, ...comments]);
          setNewComment('');
        }
    };


   const handleBooking = async () => {
    if (!startDate || !endDate) {
      alert('Выберите даты аренды');
      return;
    }

    const bookingData = {
      carId: carData._id,
      startDate,
      endDate,
      totalPrice,
    };

    try {
      const res = await api('rental/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const data = await res.json();
      if (data.success) {
        alert('Автомобиль успешно забронирован!');
        setShowModal(false);
        
        window.location.reload();
      } else {
        alert(data.message || 'Ошибка бронирования');
      }
    } catch (err) {
      alert('Ошибка сети');
    }
  };



  const handleDateChange = () => {
    if (startDate && endDate && endDate >= startDate) {
      const days = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
      setTotalPrice(days * carData.pricePerDay);
    } else {
      setTotalPrice(0);
    }
  };

  if (loading) {
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
                                    className={`btn btn-primary btn-lg btn-booking shadow-lg w-100 ${!carData.available ? 'btn-secondary' : ''}`}
                                    onClick={() => carData.available && setShowModal(true)}
                                    disabled={!carData.available}
                                >
                                    {carData.available ? 'Забронировать' : 'Не доступно'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  Бронирование: {carData.brand} {carData.model}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">Дата начала</label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      value={startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        handleDateChange();
                      }}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Дата окончания</label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      value={endDate}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        handleDateChange();
                      }}
                      required
                    />
                  </div>

                  {totalPrice > 0 && (
                    <div className="col-12 bg-light p-4 rounded-3 text-center">
                      <p className="mb-2 text-muted">Количество дней:</p>
                      <h3 className="text-primary mb-3">
                        {differenceInDays(new Date(endDate), new Date(startDate)) + 1}
                      </h3>
                      <p className="mb-0">
                        <strong className="h4 text-dark">{totalPrice} т</strong>
                        <small className="text-muted"> итого</small>
                      </p>
                      <small className="text-muted d-block mt-2">
                        {carData.pricePerDay} т × {differenceInDays(new Date(endDate), new Date(startDate)) + 1} дн.
                      </small>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg"
                  onClick={() => setShowModal(false)}
                >
                  Отмена
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-lg px-5"
                  onClick={handleBooking}
                  disabled={!startDate || !endDate || totalPrice === 0}
                >
                  Подтвердить бронь
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    
            <div className="mt-5 bg-white rounded-3xl shadow-xl p-5 p-lg-8">
                <div className="row text-center text-lg-start">
                    {/* Комментарии */}
          <section className="mt-5">
            <h2 className="fs-3 fw-bold mb-4">
              Комментарии ({comments.length})
            </h2>

            
            {user ? (
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <form onSubmit={addComment}>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Напишите ваш комментарий..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary px-5">
                      Отправить
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="alert alert-light border">
                <strong>Хотите оставить комментарий?</strong>{' '}
                <a href="/login" className="alert-link">Войдите</a> или{' '}
                <a href="/register" className="alert-link">зарегистрируйтесь</a>
              </div>
            )}

        
            <div className="row row-cols-1 g-4">
              {comments.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <h5>Пока нет комментариев</h5>
                  <p>Станьте первым!</p>
                </div>
              ) : (
                comments.map(comment => (
                  <div key={comment._id} className="col">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex align-items-start">
                          <div className="bg-success text-white rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center me-3"
                               style={{ width: '42px', height: '42px' }}>
                            {comment.author.avatar ? (
                              <img 
                                src={comment.author.avatar} 
                                alt={comment.author.firstName} 
                                className="rounded-circle" 
                                style={{ width: '42px', height: '42px', objectFit: 'cover' }} 
                              />
                            ) : (
                              <i className="fas fa-user"></i>
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <strong>{comment.author.firstName} {comment.author.lastName} </strong>
                            <small className="text-muted ms-2">
                              {new Date(comment.createdAt).toLocaleDateString('ru-RU')} в{' '}
                              {new Date(comment.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                            </small>
                            <p className="mt-2 mb-0">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>



                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}
        </div>
    );  
}