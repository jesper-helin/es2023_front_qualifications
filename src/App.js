import "./App.css";
import { useState, useEffect } from "react";
import { getConcerts } from "./services/concertsService";

const App = () => {
  const [concerts, setConcerts] = useState([]);
  const [filteredConcerts, setFilteredConcerts] = useState([]);
  const [artistFilter, setArtistFilter] = useState("");
  const [locationFilterOptions, setLocationFilterOptions] = useState([])
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    getConcerts().then((res) => {
      setConcerts(res.concerts);
      setFilteredConcerts(res.concerts);
      setLocationFilterOptions(Array.from(new Set(res.concerts.map(concert => concert.location.name))))
    });
  }, []);

  useEffect(() => {
    if (artistFilter !== "") {
      setFilteredConcerts(
        concerts.filter((concert) => concert.artist === artistFilter)
      ); 
    } else {
      setFilteredConcerts(concerts);
    }
  }, [artistFilter, locationFilter]);

  return (
    <div className="App">
      <header>
        <div>EuroSkills Concerts</div>
        <div>
          <span>Already booked?</span>
          <button>Get Tickets</button>
        </div>
      </header>
      <main>
        <Landing
          concerts={concerts}
          filteredConcerts={filteredConcerts}
          locationFilterOptions={locationFilterOptions}
          setArtistFilter={setArtistFilter}
          setLocationFilter={setLocationFilter}
        />
      </main>
    </div>
  );
};

const Landing = ({
  concerts,
  filteredConcerts,
  locationFilterOptions,
  setArtistFilter,
  setLocationFilter,
}) => (
  <div>
    <h1>Checkout these amazing concerts in Graz.</h1>
    <div className="filters">
      <select
        className="filter"
        onChange={(e) => setArtistFilter(e.target.value)}
      >
        <option value="">Artist</option>
        {concerts.map((concert) => (
          <option value={concert.artist}>{concert.artist}</option>
        ))}
      </select>
      <select
        className="filter"
        onChange={(e) => setLocationFilter(e.target.value)}
      >
        <option value="">Location</option>
        {locationFilterOptions.map((location) => (
          <option value={location}>{location}</option>
          ))}
      </select>
    </div>
    <div className="cards">
      {filteredConcerts.map((concert) => {
        return concert.shows.map((show, key) => (
          <div className="card" key={key} tabIndex="0">
            <div className="card-top">
              {`${("0" + new Date(show.start).getDate()).slice(-2)}/${
                "0" + (new Date(show.start).getMonth() + 1)
              }/${new Date(show.start).getFullYear()}`}
              <h2>{concert.artist}</h2>
              <h3>{concert.location.name}</h3>
            </div>
            <div className="card-bottom">
              {`${("0" + new Date(show.start).getUTCHours()).slice(-2)}:${(
                "0" + new Date(show.start).getMinutes()
              ).slice(-2)}`}{" "}
              -{" "}
              {`${("0" + new Date(show.end).getUTCHours()).slice(-2)}:${(
                "0" + new Date(show.end).getMinutes()
              ).slice(-2)}`}
            </div>
          </div>
        ));
      })}
    </div>
  </div>
);

export default App;
