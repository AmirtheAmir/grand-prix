import canada from "../../../public/Tracks/Canada.svg";
import React, { useState } from "react";

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("Amir");
  const [races, setRaces] = useState([]);

  const handleSearch = async () => {
    let searchYear = searchTerm === "current" ? "2024" : searchTerm;
    setYear(searchYear);

    try {
      const response = await fetch(
        `https://ergast.com/api/f1/${searchYear}.json`
      );
      const data = await response.json();
      setRaces(data.MRData.RaceTable.Races);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setSearchTerm("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="flex items-center flex-col rounded-md my-6 mx-10">
      <div className="flex items-center justify-center w-full h-40">
        <div className="flex items-center h-full border-r-3 border-text w-[30%] pr-16">
          <input
            placeholder="2016"
            style={{ fontFamily: "bold" }}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-text text-cream text-lg h-[50%] tracking-wide text-center rounded-tl-full rounded-bl-full w-2/4 outline-none"
          />
          <div className=" w-2/4 h-[50%] bg-text flex items-center rounded-tr-full rounded-br-full p-1">
            <button
              style={{ fontFamily: "bold" }}
              onClick={handleSearch}
              className="bg-crimson text-cream tracking-wider w-full text-center h-full rounded-full text-lg hover:bg-cream hover:text-text transition-all duration-300"
            >
              Search
            </button>
          </div>
        </div>
        <p
          style={{ fontFamily: "reg" }}
          className=" leading-normal text-justify text-2xl flex items-center justify-center text-text w-[70%] h-full ml-24"
        >
          You can simply search by the year through the field to the right side
          or you can search the word “current” for the 2024 year information.
          You will see the info about the rounds and year with the picture of
          tracks.
        </p>
      </div>
      <div className="flex flex-row justify-center  items-center w-full mt-6 min-h-screen">
        <div className=" w-[30%] flex items-center justify-center">
          <div className="  flex items-center justify-center w-full h-full">
            <div
              style={{ fontFamily: "bold" }}
              className="text-[300px] text-text leading-0 text-center font-bold transform -rotate-90 whitespace-nowrap"
            >
              {year}
            </div>
            <div className="w-px h-full bg-gray-300 mt-2"></div>
          </div>
        </div>
        <div className=" w-[70%] grid grid-cols-2 justify-between gap-4">
          {races.map((race, index) => {
            const imagePath = `/Tracks/${race.Circuit.Location.country}.svg`;
            const fallbackImagePath = <img src={canada} alt="canada" />;
            return (
              <div
                key={index}
                className="h-64 border-text border-2 px-4 rounded-4xl items-end justify-center flex-col flex relative"
              >
                <div
                  style={{ fontFamily: "bold" }}
                  className="w-full tracking-wide h-2/6 text-text text-2xl items-center flex justify-center"
                >
                  <p>{race.raceName}</p>
                </div>
                <div
                  style={{ fontFamily: "reg" }}
                  className="w-[30%] h-1/6 tracking-wide text-text text-lg items-center flex justify-end"
                >
                  <p className="flex items-center justify-between  w-full">
                    Round{" "}
                    <span
                      style={{ fontFamily: "bold" }}
                      className="text-text text-3xl"
                    >
                      {race.round}
                    </span>
                  </p>
                </div>
                <div
                  style={{ fontFamily: "reg" }}
                  className="w-[40%] h-1/6 tracking-widest text-text text-xl items-center flex justify-end"
                >
                  <p>{race.date}</p>
                </div>
                <div
                  style={{ fontFamily: "wide" }}
                  className="w-[50%] h-1/6 tracking-wide text-text text-lg items-center flex justify-end"
                >
                  <p>{race.Circuit.Location.country}</p>
                </div>
                <div
                  style={{ fontFamily: "reg" }}
                  className="w-full h-1/6 tracking-wide text-text text-lg items-center flex justify-center"
                >
                  <p>{race.Circuit.circuitName}</p>
                </div>
                <img
                  src={imagePath || fallbackImagePath}
                  className="w-auto absolute top-16 left-4 h-36"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Schedule;
