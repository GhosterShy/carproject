import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import api from "../api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [inputUrl, setInputUrl] = useState(""); // поле ввода ссылки
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api("auth/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        setUser(data.user[0]);
        setAuthorized(true);
      } catch (error) {
        if (error.response?.status === 401 || error.message.includes("401")) {
          setAuthorized(false);
        } else {
          console.error("Ошибка загрузки профиля:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUser();
    else {
      setLoading(false);
      setAuthorized(false);
    }
  }, [token]);

  const handleSaveAvatar = async () => {
    if (!inputUrl.trim()) {
      alert("Вставьте ссылку на изображение!");
      return;
    }

    try {
      const response = await api("auth/upload-avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // <--- обязательно!
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          avatarUrl: inputUrl.trim()
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Ошибка сервера");
      }

      const data = await response.json();
      setUser({ ...user, avatar: data.avatar });
      setInputUrl("");

      alert("Аватар успешно обновлён!");
    } catch (err) {
      console.error("Ошибка сохранения аватара:", err);
      alert(err.message);
    }
  };





  if (loading) return <Loading />;


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
                <div className="position-relative d-inline-block">
                  <img
                    src={user.avatar || "https://cdn-icons-png.flaticon.com/512/219/219983.png"}
                    alt="Аватар"
                    className="rounded-circle shadow-lg border border-4 border-white"
                    width="150"
                    height="150"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=Нет+аватара";
                    }}
                  />

                 
                  <div
                    className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-3 shadow-lg"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#avatarUrlCollapse"
                    title="Вставить ссылку на аватар"
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                  </svg>
                  </div>
                </div>

             
                <div className="collapse mt-4" id="avatarUrlCollapse">
                  <div className="card card-body bg-light">
                    <h6 className="mb-3">
                      Вставьте прямую ссылку на изображение
                    </h6>
                    <div className="input-group mb-2">
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://example.jpg"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveAvatar()}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={handleSaveAvatar}
                        disabled={!inputUrl.trim()}
                      >
                        Сохранить
                      </button>
                    </div>
                    <small className="text-muted">
                      Работает с Imgur, Discord, Telegram, GitHub, picsum.photos и т.д.
                    </small>
                  </div>
                </div>
              </div>

              
              <form>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={user.firstName || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={user.lastName || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={user.email || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text">+234</span>
                      <input
                        type="tel"
                        className="form-control"
                        defaultValue={user.phone || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-5">
                  <button type="button" className="btn btn-primary btn-lg px-5" disabled>
                    Сохранить изменения
                  </button>
                  <p className="text-muted mt-2">
                    <small>Редактирование профиля временно недоступно</small>
                  </p>
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