import "./App.css";
import { useState, useEffect } from "react";
import { getConcerts } from "./services/concertsService";

const App = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    getConcerts().then((res) => {
      setConcerts(res.concerts);
    });
  }, []);

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
        <Landing concerts={concerts} />
      </main>
    </div>
  );
};

const Landing = ({ concerts }) => (
  <div>
    <h1>Checkout these amazing concerts in Graz.</h1>
    <div className="cards">
      {concerts.map(concert => {
        return (
            concert.shows.map((show, key) => (
              <button className="card" key={key}>
                <div className="card-top">
                {`${("0" + new Date(show.start).getDate()).slice(-2)}/${
                  "0" + (new Date(show.start).getMonth() + 1)
                }/${new Date(show.start).getFullYear()}`}
                <h2>{concert.artist}</h2>
                <h3>{concert.location.name}</h3>
                </div>
                <div className="card-bottom">
                  {/* {`${("0" + new Date(show.start).getHours()).slice(-2)}:${("0" + new Date(show.start).getMinutes()).slice(-2)}`} - {`${("0" + new Date(show.end).getHours()).slice(-2)}:${("0" + new Date(show.end).getMinutes()).slice(-2)}`} */}
                </div>
              </button>
            ))
        );
      })}
    </div>
  </div>
);

export default App;
