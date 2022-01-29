import {field} from "../../interfaces/Interface"
import {invalidNameStrings, invalidNumberStrings} from "../Fields/FieldsHelper"

export const fields:field[] = [
    {   
        type: "number",
        value: "",
        classValue: "id",
        name:"ID",
        currentError: "",
        missingError: "please enter the student ID",
        isId: "longId",
        clearError: "",
        preventStrings: invalidNumberStrings,
    },
    {   
        value: "",
        classValue: "firstName",
        name:"first name",
        currentError: "",
        missingError: "please enter the first name",
        clearError: "",
        preventStrings: invalidNameStrings
    },
    {   
        value: "",
        classValue: "lastName",
        name:"last name",
        currentError: "",
        missingError: "please enter the last name",
        clearError: "",
        preventStrings: invalidNameStrings
    },
    {   
        type: "number",
        value: "",
        classValue: "age",
        name:"age",
        currentError: "",
        missingError: "please enter the age",
        clearError: "",
        preventStrings: invalidNumberStrings,
    },
    {   
        value: "",
        classValue: "profession",
        name:"profession",
        currentError: "",
        missingError: "please enter your profession",
        clearError: "",
        preventStrings: invalidNameStrings
    },
]
