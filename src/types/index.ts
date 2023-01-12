interface iCommon {
  created_at?: Date;
  id?: string | number;
}

export interface iMedia extends iCommon{
  firstName?: string;
  lastName?: string;
  student_email?: string;
  mediaType?: string;
  mediaUrl?: string;
}

export interface iTeacher extends iCommon {
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

export interface iStudent extends iCommon {
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
  media?: iMedia[]
}

export interface iEvent extends iCommon {
  event_type: string;
  event_name: string;
  event_date: string;
  string_id: string;
  image_url: string;
}

export interface iNote extends iCommon {
  student_firstname: string;
  student_lastname: string;
  student_email: string;
  note_title: string;
  note_description: string;
  teacher_firstname: string;
  teacher_lastname: string;
  teacher_contact: string;
  teacher_email: string;
  teacher_picture: string;
  event_string_id: string;
}

export interface iColor {
  100: string;
  200: string;
  600: string;
  700: string;
}

export interface iPerson extends iStudent {
  name: string;
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
  update?: any;
  foreignkey: string;
}

export interface iGlobal {
  slides: iMedia[];
  students: iStudent[];
  teachers: iTeacher[];
  media: iMedia[];
  notes: iNote[];
  events: iEvent[];
  renderedStudents: iStudent[];
  searchedStudents: iStudent[];
  
  // todo: create a searched property in iGlobal useState variable that can be manipulated outside the students variable
  // Adjust students as well as infinite scrolling with this searchedStudents variable
  // searchedStudents: iStudent[];
}

export interface iDynamicObject {
  // 👇️ key         value
  [key: string]: string | number;
}

export interface iSwitch {
  enabled: boolean;
  left: string;
  right: string;
}