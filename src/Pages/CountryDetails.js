import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CountryDetails = ({ match }) => {
  const history = useHistory();
  const params = match.params;
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const initData =
      await axios.get(`https://restcountries.eu/rest/v2/name/${params.name}?fullText=true
    `);
    setData(initData.data[0]);
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div
        style={{ justifyContent: "unset", padding: "40px 24px" }}
        className="header"
      >
        {/* eslint-disable-next-line */}
        <a
          onClick={() => {
            history.push("/");
          }}
          className="button button1"
        >
          <i class="fas fa-long-arrow-alt-left"></i> &nbsp;&nbsp;Back
        </a>
      </div>
      <div className="content">
        <div className="image">
          <img src={data.flag} alt="flag" />
        </div>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>{data.name}</h1>

        <div className="text">
          <div>
            <p>
              <span>
                <strong>Native Name: </strong>
              </span>
              {data.nativeName}
            </p>
            <p>
              <span>
                <strong>Population: </strong>
              </span>
              {data.population}
            </p>
            <p>
              <span>
                <strong>Region: </strong>
              </span>
              {data.region}
            </p>
            <p>
              <span>
                <strong>Sub Region: </strong>
              </span>
              {data.subregion}
            </p>
            <p>
              <span>
                <strong>Capital: </strong>
              </span>
              {data.capital}
            </p>
          </div>
          <div>
            {" "}
            <p>
              <span>
                <strong>Top Level Domain: </strong>
              </span>
              {data.topLevelDomain[0]}
            </p>
            <p>
              <span>
                <strong>Currency: </strong>
              </span>
              {data.currencies.map((item, index) => (
                <span>{(index ? ", " : " ") + item.name}</span>
              ))}
            </p>
            <p>
              <span>
                <strong>Languages: </strong>
              </span>
              {data.languages.map((item, index) => (
                <span>{(index ? ", " : " ") + item.name}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
