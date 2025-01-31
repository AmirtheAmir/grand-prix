import teams from "../../Data/database.json";
import trackData from "../../Data/trackdb.json";
import { FaGithub, FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
const HomePage = () => {
  return (
    <div className="flex justify-between flex-col mt-6 mx-10">
      <div className="flex flex-row p-0 m-0 w-full h-full">
        <div className="h-fit w-1/6 border-l-4 border-text">
          {teams.teams.map((team) => (
            <div
              key={team.number}
              className="flex items-center justify-between bg-text text-cream w-full h-[50px]"
            >
              <div
                style={{ fontFamily: "bold", borderColor: team.color }}
                className={`flex h-full items-center w-1/5 justify-center  text-sm border-r-4`}
              >
                {team.number}
              </div>
              <div
                style={{ fontFamily: "reg" }}
                className="flex items-center w-3/5 justify-center h-full text-xs"
              >
                {team.name}
              </div>
              <div
                style={{ fontFamily: "reg" }}
                className="flex items-center w-1/5 justify-center text-xs"
              >
                {team.shortName}
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
              Welcome to Crimson Grid, your ultimate destination for
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
          <div className="w-full h-1/3 bg-text rounded-3xl mt-10 justify-center flex-row flex items-center text-cream overflow-hidden">
            <div className="marquee flex w-auto h-full items-center justify-between">
              {[...trackData.trackData, ...trackData.trackData].map(
                (track, index) => (
                  <div
                    key={index}
                    className="w-[160px] h-full items-center flex flex-col justify-between py-4 mx-4"
                  >
                    <img
                      src={track.svg_path}
                      alt={track.track_name}
                      className="h-2/3 flex w-full justify-center"
                    />
                    <h3
                      className="h-1/2 text-center text-xs tracking-wide flex items-center"
                      style={{ fontFamily: "reg" }}
                    >
                      {track.track_name}
                    </h3>
                    <p
                      style={{ fontFamily: "bold" }}
                      className="h-1/5 flex text-sm tracking-widest items-center"
                    >
                      {track.country}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <style jsx>{`
            .marquee {
              animation: marquee 20s linear infinite;
            }

            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(10%);
              }
            }
          `}</style>
        </div>
      </div>
      <div>
        <div className=" my-8 w-full h-56 flex flex-row justify-between ">
          {/* About Me Section */}
          <div className="w-3/4 justify-center items-center">
            <h2 style={{ fontFamily: "bold" }} className="text-4xl tracking-wider text-text w-full  text-center">About Me</h2>
            <p style={{ fontFamily: "reg" }} className="text-text leading-normal text-justify text-2xl mt-6">
              I'm a passionate front-end developer, designer, and long-time
              Formula One enthusiast. I've built this platform to bring the
              thrill of F1 to life. At Crimson Grid, my goal is to provide fans
              with a seamless hub for all things Formula One. Here you can find your detailed information about basically anything that you have in mind.
            </p>
          </div>
          {/* Contact Me Section */}
          <div className="w-1/4 ml-12 border-b-4 border-r-4 border-text rounded-br-3xl">
            <h2 style={{ fontFamily: "bold" }} className="text-4xl tracking-wider text-text w-full text-center">Contact Me</h2>
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
