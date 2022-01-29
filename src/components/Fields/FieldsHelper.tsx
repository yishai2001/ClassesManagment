import {field} from "../../interfaces/Interface"

export const invalidNumberStrings =["e", "E", "+", "-"];

export const invalidNameStrings =["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const clearErrors = (fields:field[]): void =>{
    fields.filter( field => {
      field.currentError = field.value.length ? '' : field.missingError
        if (field.value.length === 0)
          field.currentError= field.missingError;
        else
           field.currentError="";
    })
}

export const validation = (fields:field[], idList: number[]) => {
    let isValid = true;
    fields.filter( field => {
    if (field.value.length === 0){
      field.currentError= field.missingError;
      isValid=false;
    }
      else
      {
        if (field.type === "number"){
          if (isNaN(+field.value) || +field.value < 1){
            field.currentError="please enter a valid number";
            isValid=false;
        }
          else if (field.isId !== undefined){
            if (field.isId === "longId" && field.value.length !== 9)
                field.currentError="please enter a valid id with nine digits";
            if ( idList.includes(+field.value))
            field.currentError="the id is already being used. please enter a diffrent id";
            isValid=false;
          }
            else
              field.currentError="";
        }
      }
  })
  
  return isValid;
}