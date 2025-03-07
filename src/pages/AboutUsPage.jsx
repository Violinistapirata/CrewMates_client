import "./AboutUsPage.css";
import Eric from "../assets/ericwindows-removebg-preview.png";
import Eleni from "../assets/eleniwindows-removebg-preview.png";
import Airam from "../assets/airamwindows-removebg-preview.png";
import Andrea from "../assets/Untitled_Project__2_-removebg-preview.png";
import Mónica from "../assets/monicawindow.png";
function AboutUsPage() {
  return (
    <>
      <div className="AboutUs-container">
        <h2 className="AboutUs-title"> Meet the Team </h2>

        <div className="AboutUs-Eric">
          <p className="About-text-Eric">
            <h3 className="AboutUs-Name">Èric</h3>
            I’ve been playing the violin for over 20 years, which has taught me
            discipline, teamwork skills, and an eye for detail. Today, my
            passion is web development: after completing Ironhack, I trained as
            a MERN Fullstack Developer, mastering HTML, CSS, JavaScript,
            Node.js, React, Git/GitHub, OOP, TDD, and MongoDB. I love continuing
            to learn and build new things. Outside of coding, I enjoy board
            games 🎲, anime 👘, Latin dances 💃, and baking 🍪.
          </p>
          <img src={Eric} alt="Èric Masip" />
        </div>

        <div className="AboutUs-Andrea">
          <img src={Andrea} alt="Andrea" />
          <p className="About-text-Andrea">
            <h3 className="AboutUs-Name">Andrea</h3>
            I’ve always loved technology. As a teenager, I learned languages,
            which led me to travel and, 7 years ago, to move from Italy to
            Spain. A year ago, I decided to pursue my passion and trained as a
            Fullstack MERN Developer at Ironhack. I love learning and creating
            high-quality solutions. I also enjoy video games 🎮, Italian cooking
            🍝, soccer ⚽, and traveling ✈️.
          </p>
        </div>

        <div className="AboutUs-Eleni">
          <p className="About-text-Eleni">
            <h3 className="AboutUs-Name">Eleni</h3>
            Eleni, a linguist by training, has built her IT career around
            incident management and technical product support, specializing in
            problem-solving and analyzing complex systems. She bridges
            linguistics and tech through pattern recognition. Passionate about
            teaching and learning, she currently instructs professionals in UX
            Research while studying web development to enhance her technical
            skills. Outside of work, she explores programming topics, reads,
            binge-watches series, travels, and hikes.
          </p>
          <img src={Eleni} alt="Eleni" />
        </div>

        <div className="AboutUs-Airam">
          <img src={Airam} alt="Airam" />
          <p className="About-text-Airam">
            <h3 className="AboutUs-Name">Airam</h3>
            Technology, and especially the world of video games, has always been
            a part of my life. Years ago, I studied massage therapy, but later
            realized it wasn’t fulfilling. It wasn’t until I moved to Barcelona
            from Tenerife about 4 years ago that I decided to pursue what I
            truly loved, which is why I made a career shift and began studying
            web development. Currently, I work and study while aiming to keep
            learning so I can dedicate myself to my passions: web development
            and traveling the world.
          </p>
        </div>

        <div className="AboutUs-Mónica">
          <p className="About-text-Mónica">
            <h3 className="AboutUs-Name">Mónica</h3>I am a Concept Artist,
            passionate about creating captivating visual worlds and
            conceptualizing characters and products that tell unique stories.
            Creative and innovative in problem-solving, I thrive in
            collaborative team environments.
          </p>
          <img src={Mónica} alt="mónica" />
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
