import { User } from 'src/models/User'
import { UserAccess } from 'src/dataLayer/userAccess'
import { v4 as uuidv4 } from 'uuid';

const userAccess = new UserAccess();

export const createUser = async (username: string, email: string): Promise<User> => {
  return userAccess.createUser({
    id: uuidv4(),
    username: username,
    email: email,
    createdAt: new Date().toISOString(),
  } as User)
}

export const getUsers = async (): Promise<User[]> => {
  return userAccess.getAllUsers()
}