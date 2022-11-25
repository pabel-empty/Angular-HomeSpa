export interface UserInterface {
  social: Social;
  schedule: any;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  image: string;
  email: string;
  password: string;
  phoneNumber: any;
  userType: string;
  gender: string;
  religion: string;
  exp_level: string;
  address1: string;
  address2: string;
  country: string;
  country_state: string;
  country_code: string;
  availability: string;
  price: any;
  state: string;
  createdAt: string;
  __v: number;
  updatedAt: string;
}

export interface Social {
  facebook: string;
  twitter: string;
  linkedin: string;
  dribble: string;
}
