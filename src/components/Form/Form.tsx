import { useContext, useState } from "react";
import { field } from "../../interfaces/Interface";
import Fields from "../Fields/Fields";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ThemeContext from "../ThemeContext/ThemeContext";
import { validation } from "../Fields/FieldsHelper";

const Form = (props: {
  fields: field[],
  hanleChanges: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void,
  handleSubmit: () => void,
  addMessege: string,
  idList: number[],
  setIsClickedOnce:React.Dispatch<React.SetStateAction<boolean>>
  setFieldsList: React.Dispatch<React.SetStateAction<field[]>>
}) => {

  let { fields, hanleChanges, handleSubmit, addMessege, idList, setIsClickedOnce, setFieldsList} = props;
  const [fieldList, setFieldList] = useState<field[]>(fields);

  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: blueMode,
  };

  const isValid = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    event.preventDefault();
    setIsClickedOnce(true)
    let isValid= validation(fields, idList);
    setFieldsList(fields);
    setFieldList(fields)
    if (isValid)
      handleSubmit()
    else 
      addMessege="";
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        width="200px"
      >
        <Fields fields={fieldList} hanleChanges={hanleChanges}/>
        <Button
          style={themeStyles}
          variant="contained"
          onClick={(event) => isValid(event)}
        >
          add
        </Button>
        <br />
        <span style={{ color: "green" }}>{addMessege}</span>
      </Box>
    </div>
  );
};

export default Form;
