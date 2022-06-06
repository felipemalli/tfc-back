import IUser from '../../interfaces/IUser';

const userResponse = {
  id: 1,
  username: 'User',
  role: 'admin',
  email: 'user@user.com',
  password: '$2a$12$VhoL7ueGxs9/GEGmKhNR4.YbIn6.szwW9uESALw/KMT/x0eL2OfGW', // 123456
}

const userCorrectInput = {
  email: 'user@user.com',
  password: '123456',
}

const userIncorrectInput = {
  email: 'wrong@wrong.com',
  password: '654321',
}

export default { userResponse, userCorrectInput, userIncorrectInput }