import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";

// interface for search filtering

interface CountryInterface {
  name : string,
};

// interface for data fetched from API
interface IData {
  name : string,
  flag : string,
  population : string,
  region : string,
  capital : string,
};

// CountryHolder : Component
const CountryHolder : React.FC = () => {
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState<IData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const initData = await axios.get("https://restcountries.eu/rest/v2/all");
      setData(initData.data);
      setLoading(false);
    } catch(error) {
      setLoading(false);
      console.error(error);
    };
  };
  const filteredData = data.filter((country : CountryInterface) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );
  const Header = () => {
    return (
      <div className={"header"}>
        <div className="input-holder">
          <input
            autoFocus={true}
            value={search}
            type={"text"}
            placeholder="Search for a country..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <img src="https://img.icons8.com/material-outlined/24/000000/search--v1.png" alt='search icon'/>
        </div>
      </div>
    );
  };
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  if (filteredData.length === 0) {
    return (
      <div>
        <Header />
        <div className="error-banner">
          <i className="fas fa-exclamation-circle"></i>
          <p>No Results Found</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className={"country-holder"}>
        {filteredData.map((item, index) => (
          <CountryCard
            key={index}
            countryName={String(index + 1) + ". " + item.name}
            imgSource={item.flag}
            population={item.population}
            region={item.region}
            capital={item.capital}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryHolder;
