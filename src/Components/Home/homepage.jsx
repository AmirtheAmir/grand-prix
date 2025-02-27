import teams from "../../Data/database.json";
import Group49 from "../../../public/Tracks/Group 49.svg";
import mainlogo from "../../../public/Tracks/mainlogo.svg";
import { FaGithub, FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { useState,useEffect } from "react";

const HomePage = () => {
  const [lap, setLap] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLap((prevLap) => {
        if (prevLap < 52) {
          return prevLap + 1;
        } else {
          clearInterval(interval);
          return prevLap;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex justify-between flex-col mt-6 mx-10">
      <div className="flex flex-row p-0 m-0 w-full h-full">
        <div className="h-fit w-1/6">
          <div
            style={{ fontFamily: "wide" }}
            className="flex items-center justify-between h-12 space-x-2"
          >
            <img src={mainlogo} alt="mainlogo" className="h-full w-auto" />
            <span className="text-text text-2xl tracking-wide">
              RACE
            </span>
          </div>
          {/* Lap Counter */}
          <div  className="flex items-center justify-between h-16 ">
            <span  style={{ fontFamily: "reg" }} className="text-text text-3xl">LAP</span>
            <span  style={{ fontFamily: "bold" }} className="text-text text-3xl tracking-wider">
              <span className="text-text">{lap}</span>/
              <span className="text-stone-500">52</span>
            </span>
          </div>
          {teams.teams.map((team) => (
            <div
              key={team.number}
              className="flex items-center justify-between bg-text text-cream py-1.5 w-full h-[42px]"
            >
              <div
                style={{ fontFamily: "bold" }}
                className={`flex h-full items-center w-1/6 justify-center text-sm border-r-3 border-stone-500`}
              >
                {team.number}
              </div>
              <div
                style={{ fontFamily: "bold" }}
                className="flex items-center w-2/6 justify-center text-sm tracking-wider"
              >
                {team.shortName}
              </div>
              <div
                style={{ fontFamily: "reg" }}
                className="flex items-center w-2/6 justify-center text-sm tracking-widest"
              >
                {team.time}
              </div>
              <div
                style={{ fontFamily: "bold", color: team.color }}
                className="flex items-center w-1/6 justify-center h-full text-lg"
              >
                {team.wheel}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-5/6 ml-6">
          <div className="w-full h-2/3 flex flex-col justify-between border-r-4  border-text">
            <div
              style={{ fontFamily: "reg" }}
              className="text-3xl  leading-normal text-justify pr-4"
            >
              Welcome to Grand Prix Exprience, your ultimate destination for
              comprehensive Formula One information. Stay updated with live
              standings, driver stats, race qualifications, car performance
              details, and the complete race schedule. Dive deep into the world
              of motorsport with exquisite data, detailed analysis, and insights
              that keep you connected to every Grand Prix.
            </div>
            <div
              style={{ fontFamily: "wide" }}
              className="text-[160px] text-crimson leading-tight w-full tracking-widest"
            >
              Formula One
            </div>
          </div>
          <div className="w-full h-1/3  rounded-3xl mt-6 shadow-xl shadow-stone-400 flex justify-end bg-cream overflow-hidden">
            <div className="marquee flex flex-row space-x-90 w-auto h-full p-4 loop-scroll">
              <img src={Group49} alt="Group 49" className="h-full w-auto" />
              <img src={Group49} alt="Group 49" className="h-full w-auto" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" my-8 w-full h-56 flex flex-row justify-between ">
          {/* About Me Section */}
          <div className="w-3/4 justify-center items-center">
            <h2
              style={{ fontFamily: "bold" }}
              className="text-4xl tracking-wider text-text w-full  text-center"
            >
              About Me
            </h2>
            <p
              style={{ fontFamily: "reg" }}
              className="text-text leading-normal text-justify text-2xl mt-6"
            >
              I'm a passionate front-end developer, designer, and long-time
              Formula One enthusiast. I've built this platform to bring the
              thrill of F1 to life. At Crimson Grid, my goal is to provide fans
              with a seamless hub for all things Formula One. Here you can find
              your detailed information about basically anything that you have
              in mind.
            </p>
          </div>
          {/* Contact Me Section */}
          <div className="w-1/4 ml-12 border-b-4 border-r-4 border-text rounded-br-3xl">
            <h2
              style={{ fontFamily: "bold" }}
              className="text-4xl tracking-wider text-text w-full text-center"
            >
              Contact Me
            </h2>
            <div className="flex h-1/2 justify-between px-16 w-full items-center mt-6 text-red-600">
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={36} />
              </a>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={36} />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={36} />
              </a>
              <a
                href="https://discord.com/users/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord size={36} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
