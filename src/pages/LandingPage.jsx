import "./LandingPage.css";
import shipWithWater from "../assets/pirate-ship-and-sea-short.png";

function LandingPage() {
  return (
    <div className="LandingPage__container">
      <div className="LandingPage__title-with-subtitle">
        <h1 className="LandingPage___title">Welcome to Crewmates!</h1>
        <p className="LandingPage___subtitle">
          Ahoy, matey! Ready to join CrewMates, the ultimate treasure for taming
          household chores? 🦜🧦🔥
        </p>
      </div>

      <img
        className="LandingPage_hero"
        src={shipWithWater}
        alt="A wooden pirate ship floating on an cloud of water"
      />

      <div className="LandingPage__text">
        <div className="LandingPage__h2-content">
          <h2 className="LandingPage__h2-title">What is crewmates?</h2>
          <p>
            Crewmates assigns chores like a fair captain! No one&apos;ll escape
            scrubbin&apos; dishes 🍽️ or sweeping floors🧹... or they&apos;ll
            face the Responsibility Kraken! Yarrr, cleaning&apos;s never been
            this fun... or at least less hateful! 🏴☠️✨
          </p>
        </div>

        <div className="LandingPage__h2-content">
          <h2 className="LandingPage__h2-title">How does it work?</h2>
          <p>
            📍To get started, create a group for you and your flatmates and list
            your recurring weekly house chores.
          </p>
          <p>
            📅 Every week, at the click of a button Crewmates will randomly
            assign all the tasks on your recurring tasks list for the week to
            your crew. It&apos;s random, but it distributes chores as equally as
            possible.
          </p>
          <p>
            ✅Finally, during the week just mark your tasks as done and
            that&apos;s it! 🧽🧼🫧✨
          </p>
          <p>
            You can start a week any day of the week, but weeks always end on a
            Friday. Also, you cannot create a new week before the current week
            is over.
          </p>
        </div>

        <div className="LandingPage__h2-content">
          <h2 className="LandingPage__h2-title">How can I join?</h2>
          <p>
            🏴‍☠️ Assemble yer crew with those scallywags sharing yer deck (be they
            family or flatmates) and mark &apos;em like treasures on yer map... 
            which pirate speak for all members need to sign up for Crewmates. Then{" "}
            <b>just one of you</b> should create a group and send the group code
            to the rest so that they can join.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
