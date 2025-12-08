import React, { useState } from "react";

export default function CarFilter({ onFilter }) {
  const [brand, setBrand] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [status, setStatus] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({
      brand,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      status,
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <h4 className="mb-4">Фильтры</h4>

      <div className="row g-3">

 
        <div className="col-md-3 col-12">
          <label className="form-label">Марка</label>
          <select
            className="form-select"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="all">Все марки</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
            <option value="Porsche">Porsche</option>
          </select>
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
