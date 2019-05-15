export interface Project {
  id: number;
  name: string;
  covers: { [key: string]: string };
}

export interface Comment {
  user: { first_name: string };
  comment: string;
}

export interface ProjectAndComments {
  project: Project;
  comments: Comment[];
}

export interface ProjectDetails {
  description: string;
}
