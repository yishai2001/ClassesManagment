export interface IStudent{
    id:  string
    firstName: string
    lastName: string
    age: string | number
    profession: string
}

export interface IClass{
    classId: number | string
    name: string
    maxSeats: number | string
    currentCapacity: number | string 
}