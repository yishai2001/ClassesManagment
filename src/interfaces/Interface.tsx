export interface Student{
    id:  string
    firstName: string
    lastName: string
    age: string | number | null
    profession: string
    classId: number | null
}

export interface Class{
    classId: number | string
    name: string
    maxSeats: number | string
    currentCapacity: number | string 
}

export interface field {
    value: string
    classValue: string
    name: string
    type?: string
    isId?: string
    currentError: string
    missingError: string
    clearError: string
    preventStrings: string[]
}
