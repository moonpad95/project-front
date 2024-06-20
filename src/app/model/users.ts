export interface Users{
    _id: string;
    username: string;
    name: string;
    lastName: string;
    email:  string;
    phone:  string;
    password:  string;
    status: boolean;
    creationDate: Date;
    role: string;
    deleteDate: Date;
}