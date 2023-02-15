export interface User{
    /**
     * Primary Key of User
     */
    id: string,

    /**
     * Email address of user
     */
    email: string,

    /**
     * Name of user
     */
    name: string,

    /**
     * Hashed password stored for user
     */
    password: string,
}