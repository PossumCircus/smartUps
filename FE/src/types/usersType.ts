export interface UserDataType {
  _id: string;
  username: string;
  email: string;
  themeMode: string;
  // fullName: string;
  // password: string;
  // googleId: string;
  role: "user" | "admin";
  // newNotificationsCount: number;
  profile: ProfileDataType;
}

export interface UsersStateType {
  entities: UserDataType[];
  loginUser: UserDataType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface ProfileDataType {
  headline: string;
  location: string;
  avatar: string;
  desiredJobTypes: string;
  experience : string;
}

export interface UserLoginDataType extends UserDataType {
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}


// Auth
export interface SignUpFormDataType {
  fullName: string;
  password: string;
  password_confirm: string;
  email: string;
  username: string;
  // job: string;
  // region: string;아직안씀
}

export interface LoginFormDataType {
  email: string;
  password: string;
}

