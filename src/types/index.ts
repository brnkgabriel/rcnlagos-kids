
export interface iUi {
  mainline?: string;
  subline?: string;
  grayText?: string;
  breadcrumb?: string;
  logo?: string;
  bottomNavLink?: string;
  bottomNavLinkIcon?: string;
  homeNavLink?: string;
  center?: string;
  input?: string;
}

export interface iStudent {
  created_at?: Date;
  id?: string;
  firstName?: string;
  lastName?: string;
  parentContact?: string;
  gender?: string;
  imageUrl?: string;
  imageFile?: string;
  birthday?: string;
  role?: string;
  prefix?: string;
  age?: string;
}

export interface iMeeting {
  created_at?: Date;
  id?: string;
  date?: string;
  desc?: string;
  ministers?: string;
  name?: string;
  duration?: string;
  type?: string;
  imageUrl?: string;
  mediaUrl?: string;
  mediaType?: string;
  address?: string;
  map?: string;
}

export interface iCombined extends iStudent, iMeeting { }

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