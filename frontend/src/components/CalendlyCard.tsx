import mjIdle from "../assets/MJ_MOSCOT/MJ_IDLE.png";

export default function CalendlyCard() {

  const openCalendly = () => {

    window.open(
      "https://calendly.com/saxluyz/new-meeting",
      "_blank"
    );

  };

  return (

    <div
      className="
  fixed
  bottom-3
  right-3
  sm:bottom-6
  sm:right-6
  z-[99999]
"
    >

      <div
        className="
         w-[320px]
sm:w-[355px]
          sm:w-[355px]

          h-[70px]
          sm:h-[78px]

          rounded-full
          px-2

          flex
          items-center
          justify-between

          bg-gradient-to-br
          from-slate-950
          via-slate-900
          to-slate-800

          shadow-[0_20px_50px_rgba(15,23,42,0.35)]

          backdrop-blur-xl
        "
      >

        {/* LEFT SIDE */}
        <div
          className="
            flex
            items-center
            gap-3
            ml-1
          "
        >

          <img
            src={mjIdle}
            alt="profile"
            className="
              w-[44px]
              h-[44px]
              sm:w-[52px]
              sm:h-[52px]

              rounded-full
              object-cover
              border
              border-white/10
            "
          />

          <div className="flex flex-col">

            <h3
              className="
                text-white
                text-[16px]
                sm:text-[18px]

                font-bold
                leading-none
              "
            >

              SAM

            </h3>

            <p
              className="
                text-white/70
                text-[10px]
                sm:text-[12px]

                mt-[2px]
              "
            >

              Growth & Strategy

            </p>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={openCalendly}
          className="
            min-w-[120px]
            sm:min-w-[145px]

            h-[48px]
            sm:h-[58px]

            px-4
            sm:px-0

            rounded-full

            bg-white
            text-slate-900

            text-[13px]
            sm:text-[15px]

            font-semibold

            flex
            items-center
            justify-center
            gap-2

            transition-all
            duration-300

            hover:scale-[1.02]
            hover:-translate-y-[2px]
          "
        >

          Book a call

          <span className="text-[16px] sm:text-[18px]">

            →

          </span>

        </button>

      </div>

    </div>

  );

}