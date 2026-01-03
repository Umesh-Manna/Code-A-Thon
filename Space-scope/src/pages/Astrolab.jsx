import React from 'react'

const Astrolab = () => {
  return (
    //focusing on Page semantics first
    <main>
      <section id='quiz_section'>

        <section id='user_overview_bar'>
          
          <div id='user_details'>
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

          <div id='leaderboard'>
            <div>
              {/* icon */}
              <p>Leaderboard</p>
            </div>
            
          </div>

        </section>
        
        <section id='lets_play_section'>
          
        </section>

        <section id='question_card'>
        </section>


      </section>











      {/* infographic section */}
      <section>
        
      </section>

      {/* space explorer section */}
      <section>

      </section>
    </main>
  )
}

export default Astrolab
