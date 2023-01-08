
export interface iTeacher {
  created_at?: Date;
  id?: string | number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
  imageUrl?: string; 
  birthday?: string;
  about?: string;
  role?: string;
  class?: string;
  duration?: string;
}

export interface iColor {
  100: string;
  200: string;
  600: string;
  700: string;
}

export interface iStudent {
  created_at?: Date;
  id?: string | number;
  firstName?: string;
  lastName?: string;
  parentsContact?: string;
  gender?: string;
  class?: string;
  email?: string;
  imageUrl?: string;
  birthday?: string;
  about?: string;
  role?: string;
  age?: string;
  duration?: string;
}


export interface iPerson extends iStudent {
  name: string;
}

export interface iMedia {
  created_at?: Date;
  id?: string | number;
  firstName?: string;
  lastName?: string;
  email?: string;
  mediaType?: string;
  mediaUrl?: string;
}

export interface iCombined extends iStudent, iTeacher {}

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

export interface iDataApiOptions {
  column: string;
  value: string;
  table: string;
  update?: any
}

export interface iGlobal {
  slides: iMedia[]
}