export interface Project {
  id: number;
  name: string;
  covers: { [key: string]: string };
}

export interface Comment {
  user: { firstname: string };
  comment: string;
}

export interface ProjectAndComments {
  project: Project;
  comments: any[];
}

export interface ProjectDetails {
  description: string;
}
