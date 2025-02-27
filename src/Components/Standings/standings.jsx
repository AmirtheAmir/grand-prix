import React, { useEffect, useState } from "react";

const Standings = () => {
  const [year, setYear] = useState("");
  const [round, setRound] = useState("");
  const [position, setPosition] = useState("");
  const [standings, setStandings] = useState([]);
  const [fastestLap, setFastestLap] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStandings = (apiUrl) => {
    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const fetchedStandings =
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
            (standing) => ({
              position: standing.position,
              wins: standing.wins,
              points: standing.points,
              givenName: standing.Driver.givenName,
              familyName: standing.Driver.familyName,
              constructorName: standing.Constructors[0].name,
            })
          );
        setStandings(fetchedStandings);
        setFastestLap(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (!year) {
      alert("Year is required");
      return;
    }

    let apiUrl = `https://ergast.com/api/f1/${year}/driverStandings.json`;

    if (round) {
      apiUrl = `https://ergast.com/api/f1/${year}/${round}/driverStandings.json`;
    }

    if (round && position) {
      apiUrl = `https://ergast.com/api/f1/${year}/${round}/driverStandings/${position}.json`;
    }

    fetchStandings(apiUrl);
    setYear("");
    setRound("");
    setPosition("");
  };

  const handleFastest = () => {
    if (!year || !round) {
      alert("Year and Round are required for the fastest lap search");
      return;
    }

    if (position) {
      alert("Fastest lap search requires only Year and Round");
      return;
    }

    const apiUrl = `https://ergast.com/api/f1/${year}/${round}/fastest/1/results.json`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const raceData = data.MRData?.RaceTable?.Races[0];
        if (!raceData || !raceData.Results || raceData.Results.length === 0) {
          alert("No fastest lap data found.");
          return;
        }

        const fastestResult = raceData.Results[0]; 
        const driver = fastestResult.Driver;
        const fastestLapTime = fastestResult.FastestLap?.Time.time || "N/A";
        const avgSpeed = fastestResult.FastestLap?.AverageSpeed.speed || "N/A";
        const constructorName = fastestResult.Constructor.name;

     
        setFastestLap({
          permanentNumber: driver.permanentNumber,
          givenName: driver.givenName,
          familyName: driver.familyName,
          constructorName: constructorName,
          fastestTime: fastestLapTime,
          averageSpeed: avgSpeed,
        });
        setStandings([]); // Clear standings when searching fastest lap
        
        // Clear input values when fastest is clicked
        setYear("");
        setRound("");
        setPosition("");
      })
      .catch((error) => {
        console.error("Error fetching fastest lap data:", error);
      });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div className="flex flex-col mt-6 mx-10 items-center">
      <div className="w-3/4 flex items-center flex-col h-88 justify-between ">
        <p
          style={{ fontFamily: "reg" }}
          className="text-text text-2xl tracking-wide text-justify leading-8"
        >
          Discover the latest and historical Formula 1 standings with ease. This
          page offers three ways to explore the data, You can search by year to
          view standings from any season in F1 history, delve into specific race
          results by round to see how the standings evolved, or focus on the
          performance of different teams in years and rounds. The system works
          based on your request, you can choose year + round + position, or year
          and round only or even year, but under no circumstances you can choose
          round + position together.
        </p>
        <div className="flex flex-row space-x-14 w-full justify-between h-20 mt-4 items-center mb-10">
          <input
            style={{ fontFamily: "bold" }}
            className="border-2 border-text text-lg rounded-full flex text-center w-1/5 h-full text-text outline-none focus:border-crimson focus:border-4"
            value={year}
            onKeyDown={handleKeyDown}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
          />
          <input
            style={{ fontFamily: "bold" }}
            className="border-2 border-text tracking-wide text-lg rounded-full text-center w-1/5 text-text h-full outline-none focus:border-crimson focus:border-4"
            value={round}
            onKeyDown={handleKeyDown}
            onChange={(e) => setRound(e.target.value)}
            placeholder="Round"
          />
          <input
            style={{ fontFamily: "bold" }}
            className="border-2 border-text tracking-wide text-lg rounded-full text-center w-1/5 text-text h-full outline-none focus:border-crimson focus:border-4"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
          />
          <button
            style={{ fontFamily: "bold" }}
            className="bg-text text-cream text-center text-lg w-1/5 tracking-widest h-full border-3 border-text rounded-full duration-300 hover:bg-cream hover:text-text"
            onClick={handleFastest}
          >
            Fastest
          </button>
          <button
            style={{ fontFamily: "bold" }}
            className="bg-crimson text-cream text-center text-lg w-1/5 h-full border-3 border-text rounded-full duration-300 hover:bg-cream tracking-widest hover:text-text "
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-6 border-solid border-crimson border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          {standings.map((standing, index) => (
            <div
              key={index}
              className="flex items-center w-3/4 justify-between my-2"
            >
              <div className="flex items-center justify-between h-20 text-text rounded-full p-1 border-3 border-border w-full">
                <div className="flex items-center bg-text h-full rounded-full w-5/7">
                  <div
                    style={{ fontFamily: "bold" }}
                    className="text-cream flex justify-center items-center h-full text-center text-2xl w-[20%]"
                  >
                    {standing.position}
                  </div>
                  <span
                    style={{ fontFamily: "wide" }}
                    className="text-xl tracking-widest flex justify-start items-center h-full text-center text-cream w-[80%]"
                  >
                    {standing.givenName} {standing.familyName}
                  </span>
                  <div className="flex items-center justify-between bg-cream px-2 text-text rounded-tr-4xl rounded-br-4xl border-2 border-text w-1/6 h-full">
                    <span
                      style={{ fontFamily: "reg" }}
                      className="tracking-wide"
                    >
                      wins
                    </span>
                    <span
                      style={{ fontFamily: "bold" }}
                      className="text-xl w-1/3 flex justify-center items-center"
                    >
                      {standing.wins}
                    </span>
                  </div>
                </div>
                <div
                  style={{ fontFamily: "reg" }}
                  className="text-text text-xl h-full text-center flex justify-center items-center w-2/7"
                >
                  {standing.constructorName}
                </div>
                <div className="text-text text-lg h-full text-center tracking-wider flex justify-center items-center border-2 border-text rounded-tr-4xl rounded-br-4xl w-1/7">
                  <span style={{ fontFamily: "bold" }}>
                    {standing.points} Pts
                  </span>
                </div>
              </div>
            </div>
          ))}
          {fastestLap && (
            <div className="flex items-center w-3/4 justify-between my-3">
              <div className="flex items-center justify-between h-18 text-text rounded-full p-1 border-3 border-text bg-fast w-full">
                <div className="flex items-center h-full rounded-full w-4/7 justify-center">
                  <span
                    style={{ fontFamily: "wide" }}
                    className="text-xl tracking-widest flex justify-center items-center h-full text-center text-text w-[70%]"
                  >
                    {fastestLap.givenName} {fastestLap.familyName}
                  </span>
                  <div
                    style={{ fontFamily: "bold" }}
                    className="text-text flex justify-center items-center h-full text-center text-2xl w-[30%]"
                  >
                    {fastestLap.permanentNumber}
                  </div>
                </div>
                <div
                  style={{ fontFamily: "reg" }}
                  className="text-cream text-lg h-full text-center tracking-widest flex justify-center items-center border-2 border-text bg-text w-1/7 rounded-tl-4xl rounded-bl-4xl"
                >
                  {fastestLap.constructorName}
                </div>
                <div
                  style={{ fontFamily: "bold" }}
                  className="text-cream text-lg h-full text-center tracking-widest flex justify-center items-center border-2 border-text bg-text mx-1 w-1/7"
                >
                  <span>{fastestLap.fastestTime} sec</span>
                </div>
                <div
                  style={{ fontFamily: "bold" }}
                  className="text-cream text-lg h-full text-center tracking-widest flex justify-center items-center bg-text border-2 border-text rounded-tr-4xl rounded-br-4xl w-1/7"
                >
                  <span>{fastestLap.averageSpeed} kph</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Standings;
