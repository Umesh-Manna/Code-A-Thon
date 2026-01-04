import React from 'react'

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

            <section id='question_card'>
              <div></div>
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
