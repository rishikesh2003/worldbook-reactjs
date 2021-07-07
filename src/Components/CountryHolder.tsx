import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";

interface CountryInterface {
  name : string,
}

interface IData {
  name : string,
  flag : string,
  population : string,
  region : string,
  capital : string,
}
const CountryHolder : React.FC = () => {
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState<IData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const initData = await axios.get("https://restcountries.eu/rest/v2/all");
    setData(initData.data);
    setLoading(false);
  };
  const filteredData = data.filter((country : CountryInterface) =>
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
            setSearch(e.target.value);
          }}
        />
        {/* <a className="button" href="#">
          Filter By Region &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <i class="fas fa-caret-down"></i>
        </a> */}
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
