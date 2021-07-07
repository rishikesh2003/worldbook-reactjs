import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  countryName : string,
  imgSource : string,
  population : string,
  region : string, 
  capital : string,
}

const CountryCard :React.FC<Props> = (props) => {
  const history = useHistory();
  return (
    <div
      onClick={() => {
        history.push(`/country-details/${props.countryName}`);
      }}
      className="country-card"
    >
      <img src={props.imgSource} alt="flag" />
      <div className={"main-text"}>
        <p className={"name"}>{props.countryName}</p>
        <p>
          <span>
            <strong>Population: </strong>
          </span>
          {props.population}
        </p>
        <p className="middle">
          <span>
            <strong>Region: </strong>
          </span>
          {props.region}
        </p>
        <p>
          <span>
            <strong>Capital: </strong>
          </span>
          {props.capital}
        </p>
      </div>
    </div>
  );
};
export default CountryCard;
