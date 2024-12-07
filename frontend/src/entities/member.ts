export interface Member {
  id: number;
  name: string;
  email: string;
  dob: string;
  roleId: number;
  role: { name: string };
  profilePicture?: string;
}
