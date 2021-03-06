import React, {useState, useEffect} from "react";
import Navbar from "../Components/Navbar";
import {  Link } from "react-router-dom";
import axios from 'axios';


interface Props {
  match : {
    params : {
      name : string
    };
  };
};

interface IItem {
  name : string,
};

interface IData {
  name : string,
  flag : string,
  nativeName : string,
  population : string,
  region : string,
  subregion : string,
  capital : string,
  topLevelDomain : string,
  currencies : Array<IItem>,
  languages : Array<IItem>,
};



const defaulData : IData = {
  name : '',
  flag : '',
  nativeName : '',
  population : '',
  region : '',
  subregion : '',
  capital : '',
  topLevelDomain : '',
  currencies : [{
    name : ''
  }],
  languages : [{
    name : ''
  }],
};
const CountryDetails :React.FC<Props> = ({match}) => {
  
  const params = match.params;
  const paramName : string =  params.name;
  const [data, setData] = useState<IData>(defaulData);
  const [loading, setLoading ] = useState<boolean>(true);
  useEffect(() => {
    const getData = async() : Promise<void> => {
      try {
        const initData = await axios.get(`https://restcountries.com/v2/name/${paramName}?fullText=true`);
        await setData(initData.data[0]);
        await setLoading(false);
      } catch(error) {
        setLoading(false);
        console.error(error);
      };
    }
    getData()
  }, [paramName]);
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  };
  return (
    <div>
      <Navbar />
      <div
        style={{ justifyContent: "unset", padding: "40px 24px" }}
        className="header"
      >
        <Link to='/' className='button button1'>
          <i className="fas fa-long-arrow-alt-left"></i> &nbsp;&nbsp;Back
        </Link>
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
              {data.topLevelDomain}
            </p>
            <p>
              <span>
                <strong>Currency: </strong>
              </span>
              {data.currencies.map((item, index) => (
                <span key={index}>{(index ? ", " : " ") + item.name}</span>
              ))}
            </p>
            <p>
              <span>
                <strong>Languages: </strong>
              </span>
              {data.languages.map((item, index) => (
                <span key={index}>{(index ? ", " : " ") + item.name}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
