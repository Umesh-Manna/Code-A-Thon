import React from 'react'
import arrow_1 from '../assets/quiz_section/Space_explorer/arrow_1.svg'
import planet_13 from '../assets/quiz_section/Space_explorer/planet_13.svg'
import planet_1 from '../assets/quiz_section/Space_explorer/planet_1.svg'

const cardData = [
  {
    title: "Space Explorers",
    description: "Travel beyond Earth! Discover planets, stars, astronauts, and amazing space facts.",
    icons: ["🌑", "🪐", "⚛️"],
    coins: 50,
  },
  {
    title: "World Wonder",
    description: "Explore our amazing earth. Mountains, Oceans, Earth, Countries and Maps await You.",
    icons: ["🗺️", "🏛️", "🌍"],
    coins: 50,
  },
  {
    title: "Time Travel",
    description: "Stories from past. Learn about kings, queens, heroes, and ancient times.",
    icons: ["👑", "🦕", "🚜"],
    coins: 50,
  },
  {
    title: "Space Science",
    description: "How things work. Rockets, Satellites, and Space inventions.",
    icons: ["🚀", "🛰️", "🔭"],
    coins: 50,
  },
];

const Card = ({ title, description, icons, coins }) => {
  return (
    <div className="w-72 shrink-0 rounded-2xl bg-yellow-300 p-4 shadow-md">
      
      {/* Icon strip */}
      <div className="mb-3 flex gap-2 rounded-xl bg-indigo-900 p-2">
        {icons.map((icon, i) => (
          <span key={i} className="text-2xl">
            {icon}
          </span>
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


const Astrolab = () => {
  return (
    //focusing on Page semantics first
    
    <main className='min-h-screen bg-gradient-to-br from-[#5B7CFA] to-[#9B5DE5] flex items-center justify-center overflow-y-auto'>
      
      <div id='main_content' className='pt-8 bg-gradient-to-br from-[#1D2671] via-[#C33764] to-[#7A306A] w-[85vw] h-[90vh] rounded-[30px] flex flex-col items-center' >
        <section id='quiz_section' className='w-[90%] flex flex-col gap-4 h-full'>

          <section id='user_overview_bar' className='flex flex-row justify-between  bg-amber-100 rounded-lg'> 
            
             <div id='user_details' className='flex flex-row gap-16 bg-red-400 rounded-lg'>
              <div id='username_col'>
                <h2>Hi! Yugal</h2>
                <p>Let's Start your Quiz now..</p>
              </div>

              <div id='Ranking_col'>
                {/* icon */}
                <div>
                  <h2>Ranking</h2>
                  <p>348</p>
                </div>
              </div>

              <div id='points_col'>
                {/* icon */}
                <div>
                  <h2>Points</h2>
                  <p>1209</p>
                </div>
              </div>
            </div>

            <div id='leaderboard' className='bg-blue-500 flex flex-row rounded-lg'>
              <div>
                {/* icon */}
                <p>Leaderboard</p>
              </div>
              
            </div>

          </section>
          
          <section id='question_carousel' className='flex flex-col justify-between bg-[#F7F8FF] h-[85%] rounded-lg '>
            <section id='lets_play_section' className='flex flex-row justify-between bg-red-400 h-[50px] rounded-lg px-16 py-4'>
              <div>
                <h1>Let's play!</h1>
              </div>

              <div className='flex flex-row justify-between'>
                <p>Explore Category</p>
                {/* logo */}
              </div>
              
            </section>

            <section id='question_card' className='max-w-full px-2 h-full pt-8'>


               <div className="overflow-x-auto h-[90%]">
                  <div className="flex gap-4 p-4 h-full">
                      {cardData.map((card, i) => (
                        <Card key={i} {...card} />
                      ))}
                  </div>
                </div>


            </section>
          </section>


        </section>

        {/* infographic section */}
        <section>
          
          
        </section>

        {/* space explorer section */}
        <section>

        </section>

      </div>
    </main>
  )
}

export default Astrolab
