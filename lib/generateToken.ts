import jwt from 'jsonwebtoken';

interface TokenDataType {
  id: String;
  email: String;
}

export default function generateToken({ id, email }: TokenDataType) {
  const secret: string = <string>process.env.JWT_PRIVATE;
  const token = jwt.sign(
    {
      id,
      email,
    },
    secret,
    {
      expiresIn: '48hr',
    }
  );
  return token;
}
