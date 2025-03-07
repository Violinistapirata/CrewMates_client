import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page__container">
      <h2 className="landing-page__title">Welcome to Crewmates!</h2>
      <div className="landing-page__sea--background">
        <div className="landing-page__text-container">
          <p className="landing-page__text">{`Ahoy, matey! Ready to join CrewMates, the ultimate treasure for taming
        household chores? Arrr, no need to walk the plank here! With CrewMates,
        signing up is quicker than a parrot swiping doubloons 🦜💰`}</p>
          <img
            className="landing-page__parrot-flying"
            src="src/assets/parrot-flying.png"
            alt=""
          />
        </div>
      <div className="landing-page__sea--background--2">
        {/* <img className="landing-page__sea--1" src="src/assets/sea-background.png" alt="sea" />
        <img className="landing-page__sea--2" src="src/assets/sea-background.png" alt="sea" /> */}

        <p className="landing-page__text">{`Assemble yer
        crew with those scallywags sharing yer deck (be they family or
        flatmates) and mark 'em like treasures on yer map! Assign chores like a
        fair captain! No one'll escape scrubbin' dishes 🍽️⚔️ or wringin' rags...
        or they'll face the Responsibility Kraken! `}</p>

        <p className="landing-page__text">{`Organize tasks with lists
        shinier than a chest overflowing with doubloons, and make sure every
        scallywag pulls their weight... or ye'll make 'em walk the plank
        (metaphorically, aye)! `}</p>

        <p className="landing-page__text">{`With CrewMates, chores become a crew feast, not a
        mutiny! Yarrr, cleaning's never been this fun... or at least less
        hateful! 🏴☠️✨`}</p>

        <p className="landing-page__text">{`Weigh anchor and sail toward a chaos-free home, or I'll
        make ye dance the hornpipe! Beware! If ye neglect it, dust'll pile
        high... and CrewMate's guardian parrot will come for yer dirty socks.
        🦜🧦🔥`}</p>
      </div>
      </div>
      {/* <p className="landing-page__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure odio sit, quod iusto ducimus libero reprehenderit nulla dignissimos necessitatibus quisquam esse minima sint aspernatur modi tenetur voluptate pariatur illo suscipit!</p>
            <p className="landing-page__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure odio sit, quod iusto ducimus libero reprehenderit nulla dignissimos necessitatibus quisquam esse minima sint aspernatur modi tenetur voluptate pariatur illo suscipit!</p>
            <p className="landing-page__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure odio sit, quod iusto ducimus libero reprehenderit nulla dignissimos necessitatibus quisquam esse minima sint aspernatur modi tenetur voluptate pariatur illo suscipit!</p>
            <p className="landing-page__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure odio sit, quod iusto ducimus libero reprehenderit nulla dignissimos necessitatibus quisquam esse minima sint aspernatur modi tenetur voluptate pariatur illo suscipit!</p>
            <p className="landing-page__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure odio sit, quod iusto ducimus libero reprehenderit nulla dignissimos necessitatibus quisquam esse minima sint aspernatur modi tenetur voluptate pariatur illo suscipit!</p>
            <p className="landing-page__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure odio sit, quod iusto ducimus libero reprehenderit nulla dignissimos necessitatibus quisquam esse minima sint aspernatur modi tenetur voluptate pariatur illo suscipit!</p> */}
      {/* <div className="landing-page__ship-container">
            <img className="landing-page__pirate-ship" src="src/assets/pirate-ship-and-sea.png" alt="pirate-ship-on-the-sea" />
            <img className="landing-page__sea" src="src/assets/sea-background.png" alt="pirate-ship-on-the-sea" />
            </div> */}
    </div>
  );
}

export default LandingPage;
