import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Moeda from "./Moeda";

function App() {
  const [moedas, setMoedas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setMoedas(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredMoedas = moedas.filter((moeda) =>
    moeda.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="moeda-app">
      <div className="moeda-search">
        <h1 className="moeda-text">CurrentCrypto</h1>
        <form>
          <input
            className="moeda-input"
            type="text"
            onChange={handleChange}
            placeholder="Exemplo: Bitcoin Cash"
          />
        </form>
      </div>
      {filteredMoedas.map((moeda) => {
        return (
          <Moeda
            key={moeda.id}
            name={moeda.name}
            price={moeda.current_price}
            symbol={moeda.symbol}
            marketcap={moeda.total_volume}
            volume={moeda.market_cap}
            image={moeda.image}
            priceChange={moeda.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}
export default App;
