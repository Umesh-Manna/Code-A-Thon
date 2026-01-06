import React from "react";
/* Quiz section: */
//space explorer
import arrow_1 from "../assets/quiz_section/Space_explorer/arrow_1.svg";
import planet_13 from "../assets/quiz_section/Space_explorer/planet_13.svg";
import planet_1 from "../assets/quiz_section/Space_explorer/planet_1.svg";

//World wonder
import image_1 from "../assets/quiz_section/World_wonder/image_1.svg";
import image_2 from "../assets/quiz_section/World_wonder/image_2.svg";
import image_3 from "../assets/quiz_section/World_wonder/image_3.svg";

//Time travel
import image_6 from "../assets/quiz_section/Time_travel/image_6.svg";
import image_10 from "../assets/quiz_section/Time_travel/image_10.svg";
import image_13 from "../assets/quiz_section/Time_travel/image_13.svg";

//Space_science
import ss1 from "../assets/quiz_section/Space_science/ss1.svg";
import ss2 from "../assets/quiz_section/Space_science/ss2.svg";
import ss3 from "../assets/quiz_section/Space_science/ss3.svg";

//Mix_master_quiz
import mm1 from "../assets/quiz_section/Mix_master_quiz/mm1.svg";
import mm2 from "../assets/quiz_section/Mix_master_quiz/mm2.svg";
import mm3 from "../assets/quiz_section/Mix_master_quiz/mm3.svg";

/* info section */
import image1 from "../assets/info_section/image1.png";


const cardData = [
  {
    title: "Space Explorers",
    description:
      "Travel beyond Earth!: Discover planets, stars, astronauts, and amazing space facts.",
    icons: [
      arrow_1,
      planet_13,
      planet_1,
    ],
    coins: 50,
  },
  {
    title: "World Wonder",
    description:
      "Explore our amazing earth: Mountains, Oceans, Earth, Countries and Maps await You.",
    icons: [image_1, image_2, image_3,],
    coins: 50,
  },
  {
    title: "Time Travel",
    description:
      "Stories from past: Learn about kings, queens, heroes, and ancient times.",
    icons: [image_6, image_10, image_13],
    coins: 50,
  },
  {
    title: "Space Science",
    description:
      "How things work in Space: Rockets, Satellites, and Space inventions.",
    icons: [ss1, ss2, ss3],
    coins: 50,
  },

  {
    title: "Mix Master Quiz",
    description:
      "A little Bit of everything: Space, Planet, Geography, History, and Science.",
    icons: [mm1, mm2, mm3],
    coins: 50,
  },
];

const Card = ({ title, description, icons, coins }) => {
  return (
    <div className="flex flex-col rounded-2xl bg-gradient-to-b ${gradient} p-4 text-white shrink-0 w-[323px] h-[360px] bg-yellow-300">
      {/* Icon strip */}
      {/* <div className="mb-3 flex gap-2 rounded-xl bg-indigo-900 p-2"> */}
      <div className="grid grid-flow-col auto-cols-fr items-center gap-6 bg-indigo-900 p-4 rounded-xl mb-3">
        {icons.map((icon, i) => (
          <img
            key={i}
            src={icon}
            alt="icon"
            className="h-24 w-24 object-contain"
          />
        ))}
      </div>

      {/* Text content */}
      <h3 className="text-lg font-bold text-black">{title}</h3>
      <p className="mt-1 text-sm text-black/80">{description}</p>   

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-1 text-sm font-semibold">
          🪙 {coins}
        </div>

        <button className="rounded-full bg-indigo-900 px-4 py-1 text-sm font-semibold text-white">
          ▶ Play
        </button>
      </div>
    </div>
  );
};

const spaceData = [
  {
    id: 1,
    title: "Humble Beginnings",
    description:
      "ISRO was founded in 1969 and started with scientists transporting rocket parts on bicycles—from humble beginnings to global glory. ISRO has launched satellites for over 30 countries, earning global trust.",
    image: [image1],
    gradient: "from-blue-700 to-cyan-500",
  },
  {
    id: 2,
    title: "Europa Clipper",
    description:
      "Europa Clipper is the first mission designed to conduct a detailed study of Jupiter’s moon Europa. The spacecraft will travel 1.8 billion miles to reach Jupiter in April 2030.",
    image: "/images/europa-clipper.jpg",
    gradient: "from-purple-700 to-pink-500",  
  },
  {
    id: 3,
    title: "PSLV Reliability",
    description:
      "PSLV is known as the “workhorse of ISRO” and has one of the highest success rates globally. In 2017, PSLV launched 104 satellites in a single mission, a world record.",
    image: "/images/pslv.jpg",
    gradient: "from-green-700 to-lime-500",
  },

  {
    id: 4,
    title: "GSAT Connectivity",
    description:
      "GSAT satellites enable TV broadcasting, internet, weather forecasting, and disaster management across India, essentially acting as a space-based relay system.",
    image: "/images/gsat.jpg",
    gradient: "from-red-700 to-red-500",
  },
  {
    id: 5,
    title: "Hubble Legacy",
    description:
      "NASA’s Hubble Space Telescope began its groundbreaking mission in 1990, forever changing the way we understand our universe. 35 years later, Hubble’s science continues to inspire.",
    image: "/images/hubble.jpg",
    gradient: "from-orange-600 to-pink-400",
  },
  {
    id: 6,
    title: "NavIC Navigation",
    description:
      "NavIC is India’s satellite navigation system that provides accurate positioning and timing services over India and surrounding regions.",
    image: "/images/navic.jpg",
    gradient: "from-yellow-500 to-amber-400",
  },
  {
    id: 7,
    title: "Aditya-L1 Mission",
    description:
      "Aditya-L1 is India’s first solar mission, studying the Sun from a special orbit. ISRO missions use eco-friendly fuels, reducing environmental impact.",
    image: "/images/aditya-l1.jpg",
    gradient: "from-gray-700 to-gray-400",
  },
  
];

const InfoCard = ({ title, description, image, gradient }) => {
  return (
    <div
    //322.333×359.35
      className={`flex flex-col rounded-2xl bg-gradient-to-b ${gradient} p-4 text-white shrink-0 w-[323px] h-[360px]`}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl border border-black">
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      </div>

      {/* Content */}
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed opacity-90">{description}</p>
      </div>
    </div>
  );
};

const Astrolab = () => {
  return (
    //focusing on Page semantics first

    <main className="min-h-screen bg-gradient-to-br from-[#5B7CFA] to-[#9B5DE5] flex items-center justify-center">
      <div
        id="main_content"
        className="pt-8 bg-gradient-to-br from-[#1D2671] via-[#C33764] to-[#7A306A] w-[85vw] h-[90vh] rounded-[30px] flex flex-col items-center overflow-y-auto"
      >
        <section
          id="quiz_section"
          className="w-[90%] flex flex-col gap-4 min-h-full"
        >
          <section
            id="user_overview_bar"
            className="flex flex-row justify-between  bg-amber-100 rounded-lg overflow-hidden"
          >
            <div
              id="user_details"
              className="flex flex-row gap-16 bg-red-400 rounded-lg"
            >
              <div id="username_col">
                <h2>Hi! Yugal</h2>
                <p>Let's Start your Quiz now..</p>
              </div>

              <div id="Ranking_col">
                {/* icon */}
                <div>
                  <h2>Ranking</h2>
                  <p>348</p>
                </div>
              </div>

              <div id="points_col">
                {/* icon */}
                <div>
                  <h2>Points</h2>
                  <p>1209</p>
                </div>
              </div>
            </div>

            <div
              id="leaderboard"
              className="bg-blue-500 flex flex-row rounded-lg"
            >
              <div>
                {/* icon */}
                <p>Leaderboard</p>
              </div>
            </div>
          </section>

          <section
            id="question_carousel"
            className="flex flex-col justify-between bg-[#F7F8FF] h-[85%] rounded-lg "
          >
            <section
              id="lets_play_section"
              className="flex flex-row justify-between bg-red-400 h-[50px] rounded-lg px-16 py-4"
            >
              <div>
                <h1>Let's play!</h1>
              </div>

              <div className="flex flex-row justify-between">
                <p>Explore Category</p>
                {/* logo */}
              </div>
            </section>

            <section id="question_card" className="max-w-full px-2 h-full overflow-y-auto">
                <div className="flex shrink-1 gap-6 overflow-x-auto px-6">
                  {cardData.map((card, i) => (
                    <Card key={i} {...card} />
                  ))}
                </div>
            </section>
              
          </section>
        </section>

        {/* infographic section */}
        <section></section>

        {/* space explorer section */}
        <section
          id="space_explorer"
          className="w-[90%] flex flex-col gap-4 min-h-full"
        >
          <section
            id="info_carousel"
            className="flex flex-col justify-between bg-[#F7F8FF] h-[85%] rounded-lg overflow-hidden"
          >
            <section
              id="recommend_for_you_section"
              className="flex flex-row justify-between bg-red-400 h-[50px] rounded-lg px-16 py-4"
            >
              <div>
                <h1>Recommended for you</h1>
              </div>

              <div className="flex flex-row justify-between">
                <p>Explore more!</p>
                {/* logo */}
              </div>
            </section>

            <section id="info_cards" className="max-w-full px-2 h-full overflow-y-auto">

              <div className="flex shrink-1 gap-6 overflow-x-auto px-6">
                {spaceData.map((item) => (
                  <InfoCard key={item.id} {...item} />
                ))}
              </div>

            </section>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Astrolab;
