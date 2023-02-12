import { User } from "../models/user.model";

export default class UserService{

    public async getUser(id: string): Promise<User>{
        console.log("Get User with ID: ", id);
        const example: User = {id: 'id', name: 'name', email: 'email', password: 'password'}

        /**
         * In reality we will access the DB from the service layer.
         */

        return example;
    }

    
}