import jwt from 'jsonwebtoken';

interface TokenDataType {
  id: string;
  email: string;
  name: string;
}

export default function generateToken({ id, email, name }: TokenDataType) {
  const secret: string = <string>process.env.JWT_PRIVATE;
  const token = jwt.sign(
    {
      id,
      email,
      name,
    },
    secret,
    {
      expiresIn: '48hr',
    }
  );
  return token;
}
