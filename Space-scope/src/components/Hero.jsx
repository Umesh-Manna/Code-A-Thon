import { Link } from 'react-router-dom';
export default function Hero() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Space Background */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/1962279c25d14e203fc39cbc3f92536fe92e9c1d?width=3800"
        alt="Space Background"
        className="absolute inset-0 w-full h-full object-cover brightness-90"
      />

      {/* Sign Up/In Button - Top Right */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <Link to="/login">
          <button
            className="relative flex items-center justify-center gap-2 rounded-full border border-white px-6 py-3 transition-transform hover:scale-105 cursor-pointer"
            style={{
              background:
                'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(94deg, #8C67E2 1.69%, #946DF0 10.23%, #E87DB3 54%, #F2AB7F 91.36%, #FFC899 99.83%)',
            }}
          >
            <span className="font-roboto-mono text-base md:text-lg font-bold text-[#0C173D] underline">
              SIGN UP/IN
            </span>
          </button>
        </Link>
      </div>

      {/* Earth Planet - Top Right with animation */}
      <div className="absolute top-8 right-[-10px] 
                md:top-16 md:right-[-40px] 
                lg:right-[-120px] 
                w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64  animate-spin-slow">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/e50428c17f7c248c9267aff30fd54ce441e50ec5?width=868"
          alt="Earth"
          className="w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 4px 136px #67539E)' }}
        />
      </div>

      {/* Cloud - Floating */}
      <div className="absolute top-140 right-68 md:top-132 md:right-170 w-48 h-32 md:w-64 md:h-40 lg:w-80 lg:h-48 animate-cloud-slide opacity-80">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/f408867937e11815d3f6718492c499dbadf10641?width=1056"
          alt="Cloud"
          className="w-full h-full object-contain -rotate-[7deg]"
          style={{ filter: 'drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-16">
        {/* Astronaut - Center with animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]
                w-80 h-[40rem]
        md:w-[32rem] md:h-[48rem]
        lg:w-[38rem] lg:h-[56rem] animate-astro-tilt">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/21a4d991cb44c1d79739b13cb7d4ce16e1a412da?width=1461"
            alt="Astronaut"
            className="w-full h-full object-contain -rotate-[15deg]"
            style={{ filter: 'drop-shadow(0 5.653px 192.219px rgba(0, 184, 255, 0.8))' }}
          />
        </div>


<div className="relative inline-block mb-6">

  {/* Filled text */}
  <h1 className="font-poppins font-bold text-white leading-none text-[12rem]">
    SPACE
  </h1>

  {/*Hollow Stroke text */}
  <h1 className="
      absolute inset-0 font-poppins font-bold leading-none
      text-[12rem] pointer-events-none
      text-stroke-white-6
  ">
    SPACE
  </h1>

</div>



          <div className="relative inline-block">
  <h2 className="font-orbitron font-bold text-white leading-none
                 text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[10rem]">
    SCOPE
  </h2>

  <h2 className="absolute inset-0 font-orbitron font-bold leading-none
                 text-transparent stroke-4 stroke-white
                 text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[10rem]">
    SCOPE
  </h2>
</div>



        {/* Rock - Bottom Right with float animation */}
        <div className="absolute bottom-32 right-8 md:bottom-60 md:right-16 lg:bottom-30 lg:right-50 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 animate-frock-float">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ff62cccfdfd096a9f03b7809c715a47cf640b4e0?width=490"
            alt="Floating Rock"
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 3.905px 132.761px #888686)' }}
          />
        </div>

        {/* Get Started Button */}
        <div className="absolute bottom-12 md:bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2">
          <button
            className="relative px-12 py-4 md:px-16 md:py-5 lg:px-20 lg:py-6 rounded-full border border-white/20 transition-transform hover:scale-105"
            style={{
              background: 'rgba(9, 9, 32, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span
              className="font-poppins text-2xl md:text-3xl lg:text-4xl font-semibold"
              style={{
                background: 'linear-gradient(90deg, #0C0C28 0%, #1E0673 56.73%, #0000FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Get started
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
