import { useEffect, useState } from "react";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    fetch("https://ergast.com/api/f1/2024/drivers.json")
      .then((response) => response.json())
      .then((data) => {
        const fetchedDrivers = data.MRData.DriverTable.Drivers.map(
          (driver) => ({
            driverId: driver.driverId, // Keep original driver ID
            permanentNumber: driver.permanentNumber || "00", // Use real number or fallback
            code: driver.code || "N/A", // Use real driver code
            givenName: driver.givenName,
            familyName: driver.familyName,
            dateOfBirth: driver.dateOfBirth,
            nationality: driver.nationality || "unknown",
          })
        );
        setDrivers(fetchedDrivers);
      })
      .catch((error) => console.error("Error fetching drivers:", error));
  }, []);

  const getFlagSrc = (nationality) => {
    return `/Flags/${nationality}.svg`;
  };
  return (
    <>
      <div>
        saeed
      </div>
      <div className="min-h-screen grid grid-cols-4 justify-between gap-12 my-6 mx-10">
        {drivers.map((driver, index) => (
          <div
            key={index}
            className="relative w-full h-48 shadow-[inset_0_3px_10px_rgba(0,0,0,0.4)] rounded-3xl border-3 border-text p-4 flex flex-col justify-between"
          >
            {/* Top Section: Number & Name */}
            <div className="flex justify-between items-center">
              <div
                style={{ fontFamily: "bold" }}
                className="text-text text-4xl"
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
            {/* Middle Section: Birthdate */}
            <div
              style={{ fontFamily: "reg" }}
              className="flex justify-between items-center"
            >
              <div className="text-text text-md">{driver.dateOfBirth}</div>
              <img
                src={getFlagSrc(driver.nationality)}
                alt={driver.nationality}
                className="w-8 h-8 mr-2"
              />
            </div>
            {/* Bottom Section: Code Name & Custom Text */}
            <div
              style={{ fontFamily: "reg" }}
              className="flex justify-between items-center"
            >
              <div className="text-text text-md uppercase">Code Name</div>
              <div
                style={{ fontFamily: "bold" }}
                className="text-text tracking-wide text-md"
              >
                {driver.driverId}
              </div>
            </div>

            {/* Background Large Code Name (Low Opacity) */}
            <div
              style={{ fontFamily: "wide" }}
              className="absolute text-text text-6xl top-0 left-0 h-full w-full flex items-center justify-center tracking-widest opacity-20"
            >
              {driver.code}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Drivers;
