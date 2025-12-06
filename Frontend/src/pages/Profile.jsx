import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import api from "../api";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const token = localStorage.getItem("authToken");

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api("auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setUser(data.user[0]); 
        setAuthorized(true);
        console.log(data.user[0]);
      } catch (error) {
        if (error.response?.status === 401) {
          setAuthorized(false);
          console.log("Не авторизован");
       
        } else {
          console.error("Ошибка загрузки профиля:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
      setAuthorized(false);
    }
  }, [token]);

  
  if (loading) {
    return <Loading />;
  }

  if (!authorized || !user) {
    return (
      <div className="container py-5 text-center">
        <h3>Доступ запрещён</h3>
        <p>Пожалуйста, войдите в систему.</p>
      </div>
    );
  }

  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-5">


              <div className="text-center mb-5">
                <div className="avatar-container position-relative d-inline-block">
                  <img
                    src={user.avatar || "https://cdn-icons-png.flaticon.com/512/219/219983.png"}
                    alt="Avatar"
                    className="rounded-circle"
                    width="150"
                    height="150"
                    style={{ objectFit: "cover" }}
                  />
                  <label className="camera-overlay position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-3 cursor-pointer">
                    <i className="bi bi-camera-fill"></i>
                    <input type="file" accept="image/*" className="d-none" />
                  </label>
                </div>
                <div className="mt-3">
                  <button className="btn btn-primary btn-sm me-2">Upload New</button>
                  <button className="btn btn-outline-secondary btn-sm">Delete</button>
                </div>
              </div>

              <form>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={user.firstName}
                      defaultValue={user.firstName || " "}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={user.lastName || ""}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      placeholder="Email "
                      type="email"
                      className="form-control"
                      defaultValue={user.email || ""}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text">{" "}
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        defaultValue={user.phone || ""}
                 
                      />
                    </div>
                  </div>

                 

                </div>

                <div className="text-center mt-5">
                  <button type="button" className="btn btn-primary btn-lg px-5">
                    Сохранить изменения
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;