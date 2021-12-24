import Class from "../Class/Class";
import Styles from "./ClassPage.module.css";

const ClassPage = () => {
  return (
    <div >
      <div style={{ display:'flex'}}>
      <Class className="one" outOf={30} placesLeft={2} />
      <Class className="two" outOf={20} placesLeft={8} />
    </div>
    </div>
    
  );
};
export default ClassPage;
