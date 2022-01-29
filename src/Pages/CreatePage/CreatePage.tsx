import Grid from "@mui/material/Grid";
import AddClass from "../../components/AddClass/AddClass";
import AddStudent from "../../components/AddStudent/AddStudent";
import Styles from './CreatePage.module.css'

const CreatePage=()=>{

    return (
      <Grid item container direction="column" xs={12}>
      <div className={Styles.body}>
        <AddStudent/>
        <AddClass/>
      </div>
      </Grid>
      )
 }
 export default CreatePage;