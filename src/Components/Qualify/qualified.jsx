import React, { useState } from "react";
const Qualified = () => {
  const [year, setYear] = useState("");
  const [round, setRound] = useState("");
  const [raceName, setRaceName] = useState("Race");
  const [date, setDate] = useState("0000.00.00");
  const [roundNumber, setRoundNumber] = useState("0");
  const [qualifyingData, setQualifyingData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://ergast.com/api/f1/${year}/${round}/qualifying.json`
      );
      const data = await response.json();
      const raceData = data.MRData.RaceTable.Races[0];

      setRaceName(raceData.raceName);
      setDate(raceData.date);
      setRoundNumber(raceData.round);
      setQualifyingData(raceData.QualifyingResults);
      setYear("");
      setRound("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="flex flex-col mt-6 mx-10 items-center">
      <div className="w-3/4 flex items-center flex-col h-96  justify-between">
        <p
          style={{ fontFamily: "reg" }}
          className="text-text text-2xl tracking-widest h-[50%] text-justify leading-8"
        >
          This section is all about the information regarding the drivers in
          only and only qualifying rounds you can search by only year or if you
          are willing to go a little bit deeper, you can search by year and
          rounds. But keep in mind that searching by year only will not give you the information you need due to the fact the API requires specific search.
        </p>
        <div className="flex flex-wrap w-full justify-between h-20 mt-4 items-center mb-10">
          <input
            style={{ fontFamily: "bold" }}
            className="border-2 border-text rounded-full text-lg flex text-center w-1/3 h-full text-text outline-none focus:border-crimson focus:border-4"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            style={{ fontFamily: "bold" }}
            className="border-2 border-text tracking-wide rounded-full text-lg text-center w-1/3 text-text h-full outline-none focus:border-crimson focus:border-4"
            placeholder="Round"
            value={round}
            onKeyDown={handleKeyDown}
            onChange={(e) => setRound(e.target.value)}
          />

          <button
            style={{ fontFamily: "bold" }}
            className="bg-crimson text-cream text-center w-1/4 h-full border-3 border-text rounded-full duration-300 hover:bg-cream tracking-widest hover:text-text text-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {qualifyingData && (
        <>
          <div className="h-1/4 mt-12 flex flex-row w-full justify-center items-center">
            <p
              style={{ fontFamily: "bold" }}
              className="w-1/6 text-text text-center tracking-widest text-2xl"
            >
              {date}
            </p>
            <p
              style={{ fontFamily: "bold" }}
              className="w-4/6 text-center text-outline text-text tracking-wider text-5xl"
            >
              {raceName}
            </p>
            <div className="flex flex-row justify-center w-1/7 items-center">
              <span
                style={{ fontFamily: "bold" }}
                className=" w-1/6 text-right text-text tracking-widest text-2xl"
              >
                {" "}
                {roundNumber}
              </span>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 justify-between gap-4 min-h-screen my-10">
            {qualifyingData.map((driver, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center h-80 bg-text rounded-4xl"
              >
                <div className="flex flex-row justify-center w-full h-1/3 items-center">
                  <span
                    style={{ fontFamily: "bold" }}
                    className="text-cream text-5xl text-center w-1/5 opacity-40 h-full items-center justify-center flex"
                  >
                    {driver.position}
                  </span>
                  <div className="flex flex-col justify-between items-center h-full py-5 w-3/5">
                    <p
                      style={{ fontFamily: "reg" }}
                      className="text-cream tracking-widest text-2xl"
                    >
                      {driver.Driver.givenName} {driver.Driver.familyName}
                    </p>
                    <p
                      style={{ fontFamily: "reg" }}
                      className="text-fast tracking-wider text-lg"
                    >
                      {driver.Constructor.name}
                    </p>
                  </div>
                  <span
                    style={{ fontFamily: "reg" }}
                    className="text-cream opacity-40 text-3xl h-full tracking-wider items-center flex w-1/5"
                  >
                    {driver.Driver.code}
                  </span>
                </div>
                <div className="flex flex-col justify-center w-full h-2/3 items-center">
                  <div className="flex flex-row w-full h-1/3 justify-between px-4 items-center">
                    <p
                      style={{ fontFamily: "reg" }}
                      className="h-full w-1/6 tracking-wider items-center justify-center text-cream text-xl flex"
                    >
                      Q1
                    </p>
                    <p
                      style={{ fontFamily: "wide" }}
                      className="h-full w-3/6 tracking-widest text-cream text-2xl items-center justify-center flex"
                    >
                      {driver.Q1}
                    </p>
                  </div>
                  <div className="flex flex-row w-full h-1/3 justify-between px-4 items-center">
                    <p
                      style={{ fontFamily: "reg" }}
                      className="h-full w-1/6 tracking-wider items-center justify-center text-cream text-xl flex"
                    >
                      Q2
                    </p>
                    <p
                      style={{ fontFamily: "wide" }}
                      className="h-full w-3/6 tracking-widest text-cream text-2xl items-center justify-center flex"
                    >
                      {driver.Q2 || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-row w-full h-1/3 justify-between px-4 items-center">
                    <p
                      style={{ fontFamily: "reg" }}
                      className="h-full w-1/6 tracking-wider items-center justify-center text-cream text-xl flex"
                    >
                      Q3
                    </p>
                    <p
                      style={{ fontFamily: "wide" }}
                      className="h-full w-3/6 tracking-widest text-cream text-2xl items-center justify-center flex"
                    >
                      {driver.Q3 || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Qualified;
