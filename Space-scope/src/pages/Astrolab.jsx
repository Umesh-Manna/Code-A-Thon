import React from 'react'
import arrow_1 from '../assets/quiz_section/Space_explorer/arrow_1.svg'
import planet_13 from '../assets/quiz_section/Space_explorer/planet_13.svg'
import planet_1 from '../assets/quiz_section/Space_explorer/planet_1.svg'

const Astrolab = () => {
  return (
    //focusing on Page semantics first
    
    <main className='min-h-screen bg-gradient-to-br from-[#5B7CFA] to-[#9B5DE5] flex items-center justify-center'>
      
      <div id='main_content' className=' bg-gradient-to-br from-[#1D2671] via-[#C33764] to-[#7A306A] w-[85vw] h-[90vh] rounded-[30px] flex flex-col items-center' >
        <section id='quiz_section' className='w-[90%]'>

          <section id='user_overview_bar' className='flex flex-row justify-between  bg-amber-100'> 
            
             <div id='user_details' className='flex flex-row gap-16 bg-red-400'>
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

            <div id='leaderboard' className='bg-blue-500 flex flex-row'>
              <div>
                {/* icon */}
                <p>Leaderboard</p>
              </div>
              
            </div>

          </section>
          
          <section id='question_carousel' className='flex flex-col'>
            <section id='lets_play_section' className='flex flex-row justify-between'>
              <div>
                <h1>Let's play!</h1>
              </div>

              <div className='flex flex-row justify-between'>
                <p>Explore Category</p>
                {/* logo */}
              </div>
              
            </section>

            <section id='question_card' className='max-w-full px-2'>

              <div id='horizontal_scroll' className='w-full overflow-x-auto overflow-y-hidden border border-blue-600'>

                <div className="flex gap-4 w-max py-2">
      
                  <div id='space_explorers' className='bg-[#FEE440] p-2 border rounded-[30px] w-[200px]'>
                  <div id='contents' className='flex flex-col gap-4'>
                      <div id='image_section' className='grid grid-cols-3 h-full items-center bg-[#0C173D] rounded-[30px] p-2'>
                        <img src={arrow_1} alt="" className='h-full max-h-full w-auto object-contain mx-auto' />
                        <img src={planet_13} alt="" className='h-full max-h-full w-auto object-contain mx-auto'/>
                        <img src={planet_1} alt="" className='h-full max-h-full w-auto object-contain mx-auto'/>
                      </div>
                      <div id='card_contents'>
                        <h4>Space Explorers</h4>
                        <p>Travel beyond earth</p>
                        <p>Discover Planets,stars, astronauts, and amazing space facts</p>
                      </div>
                      <div id='card_actions' className='flex'>
                        <div id='no_of_questions'>
                          <span>50 Q</span>
                        </div>
                        <button className='flex flex-col'>
                          <span>Play</span>
                        </button>
                      </div>
                  </div> 
                </div> 

                <div id='world_wonder'></div>
                <div id='time_travel'></div>
                <div id='space_science'></div>
                <div id='mix_master_quiz'></div>  
                
                
                

                
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
