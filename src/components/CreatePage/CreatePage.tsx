import AddClass from "../AddClass/AddClass";
import AddStudent from "../AddStudent/AddStudent";
import Styles from './CreatePage.module.css'

const CreatePage=()=>{

    return (
        <div className={Styles.body}>
        <AddStudent/>
        <AddClass/>
      </div>
      )
 }
 export default CreatePage;