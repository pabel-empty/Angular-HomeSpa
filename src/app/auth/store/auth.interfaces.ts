// After Login Response
export interface LoginResponse {
  message: string,
  token: string,
  accountType: string,
  expiresIn: string
}

// Login Input Interface
export interface LoginState {
  email: string | null | undefined,
  password: string | null | undefined,
}

// Auth Interface
export interface AuthState {
  user: LoginResponse | null,
  errors: string | null,
  loggedIn: false | null,
  userCreated: false | null
}

// Signup Input Interface
export interface SignUpState {
  firstName:  string | null | undefined,
  lastName:  string | null | undefined,
  username:  string | null | undefined,
  email: string | null | undefined,
  password: string | null | undefined,
  gender:  string | null | undefined,
  userType: string | null | undefined,
}
