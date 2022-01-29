import {field} from "../../interfaces/Interface"
import {invalidNameStrings, invalidNumberStrings} from "../Fields/FieldsHelper"

export const fields:field[] = [
    {   
        type: "number",
        value: "",
        classValue: "classId",
        name:"ID",
        currentError: "",
        missingError: "please enter the class ID",
        isId: "shortId",
        clearError: "",
        preventStrings: invalidNumberStrings,
    },
    {   
        value: "",
        classValue: "name",
        name:"name",
        currentError: "",
        missingError: "please enter the class name",
        clearError: "",
        preventStrings: invalidNameStrings
    },
    {   
        type: "number",
        value: "",
        classValue: "maxSeats",
        name:"max seats",
        currentError: "",
        missingError: "please enter the max seats",
        clearError: "",
        preventStrings: invalidNumberStrings,
    },
]
