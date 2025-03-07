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
            Crewmates assigns chores like a fair captain! No one'll escape
            scrubbin' dishes 🍽️⚔️ or wringin&apos rags... or they&aposll face
            the Responsibility Kraken! With CrewMates, chores become a crew
            feast, not a mutiny! Yarrr, cleaning&aposs never been this fun... or
            at least less hateful! 🏴☠️✨
          </p>
          <p>
            <b>In other words</b>, Crewmates is an app that assigns chores to
            you and your household members on a weekly basis. Weeks start on a
            Monday (the earliest) and always end on a Friday.
          </p>
        </div>
        <div className="LandingPage__h2-content">
          <h2 className="LandingPage__h2-title">How can I join?</h2>
          <p>
            Assemble yer crew with those scallywags sharing yer deck (be they
            family or flatmates) and mark &apos;em like treasures on yer map!
          </p>
          <p>
            <b>In other words</b>, Crewmates is an app that assigns chores to
            you and your household members on a weekly basis.
          </p>
        </div>

        <div className="LandingPage__h2-content">
          <h2 className="LandingPage__h2-title">How does it work?</h2>
          <p>
            Organize tasks with lists shinier than a chest overflowing with
            doubloons, and make sure every scallywag pulls their weight... or
            ye'll make &aposem walk the plank (metaphorically, aye)!
          </p>
          <p>
            <b>In other words</b>, all you need to do is input your recurring
            house chores and every Monday just click on "Create week" and
            Crewmates will randomly assign tasks to the members of your crew.
            It's random, but it distributes chores as equally as possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
