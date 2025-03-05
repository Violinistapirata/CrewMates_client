import "./NewUserDashboard.css";
import GroupAssignment from "./GroupAssignment";
import GroupCreation from "./GroupCreation";

function NewUserDashboard() {
  return (
    <div className="NewUserDashboard">
      <div className="NewUserDashboard__title-with-parrot">
        <h1 className="NewUserDashboard__title">Welcome to crewmates!</h1>
        <img src="../src/assets/parrot-standing.png" alt="parrot-standing" className="NewUserDashboard__parrot"/>
      </div>
      <div className="NewUserDashboard__create-or-join">
        <GroupAssignment />
        <p className="NewUserDashboard__or">OR</p>
        <GroupCreation />
      </div>
    </div>
  );
}

export default NewUserDashboard;
