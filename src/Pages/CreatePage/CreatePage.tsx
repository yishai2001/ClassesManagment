import AddClass from "../../components/AddClass/AddClass";
import AddStudent from "../../components/AddStudent/AddStudent";
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