import { useEffect, useState } from "react";
import { X } from "lucide-react";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Controls the popup visibilit // Stores driver data for popup

  const [selectedDriver, setSelectedDriver] = useState(null); // Stores driver data for popup
  const [sprintData, setSprintData] = useState([]); // Stores sprint data for the selected driver
  const fetchSprintData = (driverId) => {
    const apiUrl = `https://ergast.com/api/f1/2024/drivers/${driverId}/sprint.json`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const raceData = data.MRData?.RaceTable?.Races;
        if (!raceData || raceData.length === 0) {
          alert("No sprint data found.");
          return;
        }

        const sprintResults = raceData.map((race) => {
          const sprintResult = race.SprintResults[0];
          return {
            constructorName: sprintResult.Constructor.name,
            fastestLapTime: sprintResult.FastestLap?.Time.time || "N/A",
            position: sprintResult.position,
            raceName: race.raceName,
          };
        });

        setSprintData(sprintResults);
      })
      .catch((error) => {
        console.error("Error fetching sprint data:", error);
      });
  };

  const fetchDrivers = (year) => {
    setLoading(true);
    const apiUrl = `https://ergast.com/api/f1/${year}/drivers.json`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const fetchedDrivers = data.MRData.DriverTable.Drivers.map(
          (driver) => ({
            driverId: driver.driverId,
            permanentNumber: driver.permanentNumber || "00",
            code: driver.code || "N/A",
            givenName: driver.givenName,
            familyName: driver.familyName,
            dateOfBirth: driver.dateOfBirth,
            nationality: driver.nationality || "unknown",
          })
        );
        setDrivers(fetchedDrivers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDrivers("2016");
  }, []);

  const handleSearch = () => {
    let year = searchTerm;
    if (year.toLowerCase() === "current") {
      year = "2024";
    }
    fetchDrivers(year);
    setSearchTerm("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const getFlagSrc = (nationality) => {
    return `../../public/Flags/${nationality}.svg`;
  };

  return (
    <>
      <div className="flex items-center rounded-md my-6 mx-10 h-40">
        <p
          style={{ fontFamily: "reg" }}
          className=" leading-normal text-justify text-2xl flex items-center justify-center text-text w-[70%] h-full mr-24"
        >
          You can simply search by the year through the field to the right side or
          you can search the word “current” for the 2024 year information. by
          clicking on the driver you will find their results in SPRINT rounds but you have to search the year 2024 or the word "current" to be able to see the sprint result since we only provide the info for the current year so far.
        </p>
        <div className="flex items-center h-full border-l-3 border-text w-[30%] pl-16">
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
        <>
          {drivers.length > 0 && (
            <div className="my-6 mx-10">
              <div className="min-h-screen grid grid-cols-4 justify-between gap-6">
                {drivers.map((driver, index) => (
                  <div
                    onClick={() => {
                      setSelectedDriver(driver);
                      fetchSprintData(driver.driverId); // Fetch sprint data for the selected driver
                      setIsPopupOpen(true);
                    }}
                    key={index}
                    className="relative w-full h-48 rounded-3xl border-3 hover:border-crimson duration-300 border-text p-4 flex flex-col justify-between cursor-pointer"
                  >
                    <div className="flex justify-between items-center ">
                      <div
                        style={{ fontFamily: "bold" }}
                        className="text-text text-4xl "
                      >
                        {driver.permanentNumber}
                      </div>
                      <div
                        style={{ fontFamily: "bold" }}
                        className="text-text text-base tracking-wide"
                      >
                        {driver.givenName} {driver.familyName}
                      </div>
                    </div>
                    <div
                      style={{ fontFamily: "reg" }}
                      className="flex justify-between items-center"
                    >
                      <div className="text-text text-md">
                        {driver.dateOfBirth}
                      </div>
                      <img
                        src={getFlagSrc(driver.nationality)}
                        alt={driver.nationality}
                        className="w-8 h-8 mr-2"
                      />
                    </div>
                    <div
                      style={{ fontFamily: "reg" }}
                      className="flex justify-between items-center"
                    >
                      <div className="text-text text-md uppercase">
                        Code Name
                      </div>
                      <div
                        style={{ fontFamily: "bold" }}
                        className="text-text tracking-wide text-md"
                      >
                        {driver.driverId}
                      </div>
                    </div>
                    <div
                      style={{ fontFamily: "wide" }}
                      className="absolute text-stone-500 text-6xl top-0 left-0 h-full w-full flex items-center justify-center tracking-widest opacity-50 hover:text-crimson duration-300"
                    >
                      {driver.code}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {isPopupOpen && sprintData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center ">
              {/* Backdrop with blur */}
              <div
                className="absolute inset-0 bg-text/50 backdrop-blur-md"
                onClick={() => setIsPopupOpen(false)}
              ></div>
              {/* Popup content */}
              <div className="relative bg-cream p-4 rounded-3xl border-3 border-text w-xl overflow-y-auto modal-content h-96 ">
                <div className="flex justify-between flex-raw w-full h-16  items-center">
                  <h2
                    style={{ fontFamily: "bold" }}
                    className="text-6xl tracking-wider w-full text-left text-outline text-text"
                  >
                    SPRINT
                  </h2>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className=" text-stone-400 hover:text-crimson duration-300 text-2xl"
                  >
                    <X size={40} />
                  </button>
                </div>
                {sprintData.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center my-8 w-full h-28  rounded-br-2xl border-r-3 border-b-3 border-text"
                  >
                    <div className="flex flex-col w-1/4 h-full mr-2 ">
                      <p style={{ fontFamily: "reg" }} className="text-md text-text text-center w-full h-1/4">
                        Race Name
                      </p>
                      <p
                        style={{ fontFamily: "bold" }}
                        className="text-md h-3/4 text-text w-full text-center flex items-center"
                      >
                        {data.raceName}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/4 h-full mr-2">
                      <p
                        style={{ fontFamily: "reg" }}
                        className="text-md text-center w-full h-1/4 text-text"
                      >
                        Team Name
                      </p>
                      <p
                        style={{ fontFamily: "bold" }}
                        className="text-md h-3/4 text-text w-full text-center justify-center flex items-center"
                      >
                        {data.constructorName}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/4 h-full mr-2">
                      <p
                        style={{ fontFamily: "reg" }}
                        className="text-md text-center w-full h-1/4 text-text"
                      >
                        Fastest Lap
                      </p>
                      <p
                        style={{ fontFamily: "bold" }}
                        className="text-md tracking-wide h-3/4 text-text w-full text-center justify-center flex items-center"
                      >
                        {data.fastestLapTime}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/4 h-full">
                      <p
                        style={{ fontFamily: "reg" }}
                        className="text-md text-center w-full h-1/4 text-text"
                      >
                        Position
                      </p>
                      <p
                        style={{ fontFamily: "bold" }}
                        className="text-4xl tracking-wide h-3/4 text-crimson w-full text-center justify-center flex items-center"
                      >
                        {data.position}
                      </p>
                    </div>
                  </div>
                ))}
                {/* You can add more driver info using selectedDriver */}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Drivers;
