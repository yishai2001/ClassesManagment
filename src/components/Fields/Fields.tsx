import TextField from "@mui/material/TextField";
import {field} from "../../interfaces/Interface"

const Fields = (props:{fields:field[], hanleChanges: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}) => {
  
    const {fields, hanleChanges}= props;


  return (
    <div>
        {fields.map((field, key) => 
          <TextField
          key ={key}
          required
          error={field.currentError.length > 0}
          type={field.type}
          id="outlined-required"
          label={field.name}
          placeholder={field.name}
          helperText={field.currentError}
          name={field.classValue}
          value={field.value}
          onChange={(elenent) => hanleChanges(elenent)} 
          onKeyDown={(e) =>
            field.preventStrings.includes(e.key) && e.preventDefault()}
        />
        )}
    </div>
  );
};

export default Fields;
