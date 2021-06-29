import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";

const CountryHolder = () => {
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const initData = await axios.get("https://restcountries.eu/rest/v2/all");
    setData(initData.data);
    setLoading(false);
  };
  const filteredData = data.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );
  const Header = () => {
    return (
      <div className={"header"}>
        <input
          autoFocus={true}
          value={search}
          type={"text"}
          placeholder="&#xF002;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Search for a country..."
          onChange={(e) => {
            setSearch((search) => e.target.value);
          }}
        />
        {/* eslint-disable-next-line */}
        <a className="button" href="#">
          Filter By Region &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <i class="fas fa-caret-down"></i>
        </a>
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
          <i class="fas fa-exclamation-circle"></i>
          <p>No Results Found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={"country-holder"}>
        {filteredData.map((item) => (
          <CountryCard
            countryName={item.name}
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
