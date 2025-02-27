import { useState } from "react";
const Stats = ({ percentage = 75 }) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const needleAngle = (clampedPercentage / 100) * 180 - 90;
  const [year, setYear] = useState("");
  const [round, setRound] = useState("");
  const [raceData, setRaceData] = useState(null);
  const [error, setError] = useState("");

  const fetchRaceData = async () => {
    if (!year || !round) {
      setError("Please enter both year and round.");
      return;
    }

    try {
      const response = await fetch(
        `https://ergast.com/api/f1/${year}/${round}/results.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const race = data.MRData.RaceTable.Races[0];

      if (!race) {
        setError("No race data found for the given year and round.");
        setRaceData(null);
        return;
      }

      setRaceData(race);
      setError("");
    } catch (err) {
      setError("Error fetching data. Please check your inputs and try again.");
      setRaceData(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchRaceData();
    }
  };

  const getSpeedBasedStyles = (speed) => {
    if (speed >= 190 && speed <= 194) {
      return {
        line: { x1: 58, y1: 49, x2: 30, y2: 25 },
        pathStroke: "#fffe3a",
      };
    } else if (speed >= 140 && speed <= 189) {
      return {
        line: { x1: 58, y1: 49, x2: 45, y2: 15 },
        pathStroke: "#80b918",
      };
    } else if (speed >= 195 && speed <= 199) {
      return {
        line: { x1: 58, y1: 49, x2: 45, y2: 15 },
        pathStroke: "#fdcb11",
      };
    } else if (speed >= 200 && speed <= 205) {
      return {
        line: { x1: 58, y1: 49, x2: 75, y2: 20 },
        pathStroke: "#f4781e",
      };
    } else if (speed >= 205 && speed <= 210) {
      return {
        line: { x1: 58, y1: 49, x2: 75, y2: 20 },
        pathStroke: "#af2916",
      };
    } else {
      return {
        line: { x1: 58, y1: 49, x2: 75, y2: 20 },
        pathStroke: "#630304",
      };
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
          rounds.
        </p>
        <div className="flex flex-wrap w-full justify-between h-20 mt-4 items-center mb-10">
          <input
            style={{ fontFamily: "bold" }}
            className="border-2 border-text rounded-full text-lg flex text-center w-1/4 h-full text-text outline-none focus:border-crimson focus:border-4"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            style={{ fontFamily: "bold" }}
            className="border-2 border-text tracking-wide rounded-full text-lg text-center w-1/4 text-text h-full outline-none focus:border-crimson focus:border-4"
            placeholder="Round"
            value={round}
            onChange={(e) => setRound(e.target.value)}
          />

          <button
            style={{ fontFamily: "bold" }}
            className="bg-crimson text-cream text-center w-1/5 h-full border-3 border-text rounded-full duration-300 hover:bg-cream tracking-widest hover:text-text text-lg"
            onClick={fetchRaceData}
          >
            Search
          </button>
          <button
            style={{ fontFamily: "bold" }}
            className="bg-text text-cream text-center w-1/5 h-full border-3 border-text rounded-full duration-300 hover:bg-cream tracking-widest hover:text-text text-lg"
          >
            Fastest
          </button>
        </div>
      </div>
      {error && (
        <p className="text-crimson text-xl tracking-wide mt-4">{error}</p>
      )}
      {raceData && (
        <>
          <div className="h-1/4 mt-12 flex flex-row w-full justify-center items-center">
            <p
              style={{ fontFamily: "bold" }}
              className="w-1/6 text-text text-center tracking-widest text-2xl"
            >
              {raceData.date}
            </p>
            <p
              style={{ fontFamily: "bold" }}
              className="w-4/6 text-center text-outline text-text tracking-wider text-5xl"
            >
              {raceData.raceName}
            </p>
            <div className="flex flex-row justify-center w-1/7 items-center">
              <span
                style={{ fontFamily: "bold" }}
                className="w-1/6 text-right text-text tracking-widest text-2xl"
              >
                {raceData.round}
              </span>
            </div>
          </div>

          <div className="w-full min-h-screen my-10">
            {raceData.Results.map((result, index) => {
              const speed = parseFloat(result.FastestLap?.AverageSpeed.speed);
              const { line, pathStroke } = getSpeedBasedStyles(speed);
              return (
                <div
                  key={index}
                  className="w-full h-56 border-3 mt-12  border-text rounded-5xl flex flex-row justify-between items-center p-4 mb-6"
                >
                  <div className="flex h-full w-1/3 flex-col justify-between items-center">
                    <p
                      style={{ fontFamily: "bold" }}
                      className="text-text text-4xl tracking-wide"
                    >
                      {result.Driver.givenName} {result.Driver.familyName}
                    </p>
                    <p
                      style={{ fontFamily: "reg" }}
                      className="text-text text-xl tracking-wide"
                    >
                      {result.Constructor.name}
                    </p>
                    <div className="flex flex-row justify-between w-3/4 items-center">
                      <p
                        style={{ fontFamily: "reg" }}
                        className="text-text text-xl tracking-wide"
                      >
                        Total laps
                      </p>
                      <p
                        style={{ fontFamily: "bold" }}
                        className="text-text text-2xl tracking-wide"
                      >
                        {result.laps}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between w-3/4 items-center">
                      <p
                        style={{ fontFamily: "reg" }}
                        className="text-text text-xl tracking-wide"
                      >
                        Status
                      </p>
                      <p
                        style={{ fontFamily: "bold" }}
                        className="text-crimson text-2xl tracking-wide"
                      >
                        {result.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-full w-1/5 flex-col justify-center items-center">
                    <p
                      style={{ fontFamily: "bold" }}
                      className="text-border text-9xl tracking-wide"
                    >
                      {result.position}
                    </p>
                  </div>
                  <div className="flex h-full w-1/3 flex-col justify-between items-center">
                    <p
                      style={{ fontFamily: "reg" }}
                      className="text-text text-xl tracking-wide"
                    >
                      Fastest Lap
                    </p>
                    <div className="flex flex-row w-3/4 justify-between items-center">
                      <p
                        style={{ fontFamily: "reg" }}
                        className="text-text text-lg tracking-wide"
                      >
                        Lap:
                      </p>
                      <p
                        style={{ fontFamily: "bold" }}
                        className="text-border text-2xl tracking-wide"
                      >
                        {result.FastestLap?.lap}
                      </p>
                      <p
                        style={{ fontFamily: "bold" }}
                        className="text-text text-3xl tracking-wide"
                      >
                        {result.FastestLap?.Time.time}
                      </p>
                    </div>
                    <div className="flex flex-row w-3/4 justify-between items-center">
                      <p
                        style={{ fontFamily: "reg" }}
                        className="text-text text-lg tracking-wide"
                      >
                        Fastest Lap Rank:
                      </p>
                      <p
                        style={{ fontFamily: "bold" }}
                        className="text-text text-4xl tracking-wide"
                      >
                        {result.FastestLap?.rank}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-full w-1/3 flex-col justify-between items-center">
                    <p
                      style={{ fontFamily: "reg" }}
                      className="text-text text-xl tracking-wide"
                    >
                      Average Speed / kph
                    </p>
                    <p
                      style={{ fontFamily: "bold" }}
                      className="text-text text-xl tracking-widest"
                    >
                      {result.FastestLap?.AverageSpeed.speed}
                    </p>
                    <div className="relative inline-block h-full w-1/3">
                      {" "}
                      <svg viewBox="0 0 100 40" className="w-full h-full">
                        {" "}
                        <path
                          d={`M 6 59 A 45 50 0 ${
                            clampedPercentage > 50 ? 1 : 0
                          } 1 ${
                            55 +
                            65 * Math.cos((clampedPercentage / 100) * Math.PI)
                          } ${
                            40 +
                            45 * Math.sin((clampedPercentage / 100) * Math.PI)
                          }`}
                          stroke={pathStroke} // Tailwind's green-500
                          strokeWidth="5"
                          fill="transparent"
                        />{" "}
                        <line
                          x1={line.x1}
                          y1={line.y1}
                          x2={line.x2}
                          y2={line.y2}
                          stroke="black"
                          stroke-opacity="0.7"
                          strokeWidth="5"
                          stroke-linecap="round"
                          transform={`rotate(${needleAngle} 50 45)`}
                        />{" "}
                      </svg>{" "}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default Stats;
