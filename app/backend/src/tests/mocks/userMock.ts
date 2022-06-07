import ILoggedUser from '../../interfaces/ILoggedUser';
import IUser from '../../interfaces/IUser';

const userResponse: IUser = {
  id: 1,
  username: 'User',
  role: 'admin',
  email: 'user@user.com',
  password: '$2a$12$VhoL7ueGxs9/GEGmKhNR4.YbIn6.szwW9uESALw/KMT/x0eL2OfGW', // 123456
}

const userTokenResponse: ILoggedUser = {
  user: {...userResponse},
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NTQ1NjAwNjksImV4cCI6MTY1NDk5MjA2OX0.U-62mvJkZfKsYSFNQUc9WF7YxLhubXBJeK64r70Ih2Q',
}

const userCorrectInput = {
  email: 'user@user.com',
  password: '123456',
}

const userIncorrectInput = {
  email: 'wrong@wrong.com',
  password: '654321',
}

export default { userResponse, userTokenResponse, userCorrectInput, userIncorrectInput }