
export interface iTeacher {
  created_at?: Date;
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
  imageUrl?: string; 
  birthday?: string;
  role?: string;
  class?: string;
}

export interface iStudent {
  created_at?: Date;
  id?: string;
  firstName?: string;
  lastName?: string;
  parentsContact?: string;
  gender?: string;
  class?: string;
  email?: string;
  imageUrl?: string;
  birthday?: string;
  role?: string;
  age?: string;
}

export interface iObserver {
  pLabel: string; // parent label
  cLabel: string; // child label
  direction: string; // direction of scroll 
}

export interface iStudentState {
  members: iStudent[];
  rendered: iStudent[];
  selected: iStudent;
  searched: iStudent[];
  searchTerm: string;
}

export interface iUpload {
  path: string;
  name: string;
  file: string;
  type: string;
}

export interface iGlobalState {
  fromRoute: string;
  toRoute: string;
}