export interface UserType {
  id: string;
  name: string;
  email: string;
}

export interface FormSubmissionType {
  id: string;
  name: string | null;
  email: string | null;
  twitter: string | null;
  website: string | null;
  message: string | null;
  forminfoId: string;
}

export interface UserSigninType {
  email: string;
  password: string;
}

export interface UserSignupType extends UserSigninType {
  name: string;
}

export interface UserFormType {
  name: string;
  ownerId: string;
  fields: string;
}
