import React, { useState,useEffect } from "react";

export default function CarFilter({ onFilter, onSearch }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [status, setStatus] = useState("all");
  

  const [query, setQuery] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query.trim().toLowerCase());}, 400);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      status,
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <h4 className="mb-4">Фильтры</h4>

      <div className="row g-3">

 
       <div className=" col-md-12">
          <div className="position-relative">
            <i className="bi bi-search position-absolute top-50 start-4 translate-middle-y text-primary fs-5"></i>
            
            <input
              type="text"
              className="form-control form-control-lg ps-5 shadow-sm border-0"
              placeholder="Brand search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ 
                borderRadius: "16px", 
                height: "56px",
                backgroundColor:"#f8f9fb"
              }}
            />

        
            {query && (
              <button
                type="button"
                className="btn-close position-absolute top-50 end-0 translate-middle-y me-4"
                onClick={() => setQuery("")}
                aria-label="Очистить поиск"
              />
            )}
          </div>

        
          {query && (
            <div className="text-center mt-2">
              <small className="text-muted">
                Ищем: <strong>"{query}"</strong>
              </small>
            </div>
          )}
        </div>
          
          

        <div className="col-md-2 col-6">
          <label className="form-label">Мин. цена</label>
          <input
            type="number"
            className="form-control"
            placeholder="От"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>


        <div className="col-md-2 col-6">
          <label className="form-label">Макс. цена</label>
          <input
            type="number"
            className="form-control"
            placeholder="До"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>


        <div className="col-md-3 col-12">
          <label className="form-label">Доступность</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Все</option>
            <option value="true">Доступно</option>
            <option value="false">Занято</option>
          </select>
        </div>


        <div className="col-md-2 col-12 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Применить
          </button>
        </div>

      </div>
    </div>
  );
}
