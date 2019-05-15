import axios from "axios";
import { Project, ProjectAndComments, ProjectDetails } from "./types";

export const getProjectsWithComments: () => Promise<
  ProjectAndComments[]
> = async () => {
  let projects: Project[] = [];
  try {
    const projectsResponse = await axios.get(
      "https://www.behance.net/v2/projects?api_key=u_n_m_o_c_k_200"
    );
    // ;
    projects = projectsResponse.data.projects;
    console.log(`Got ${projects.length} projects`);
  } catch (err) {
    console.error("Failed loading projects:", err.message);
    throw err;
  }

  try {
    return await Promise.all(
      projects.map(project =>
        axios
          .get(
            `https://www.behance.net/v2/projects/${
              project.id
            }/comments?api_key=u_n_m_o_c_k_200`
          )
          .then(x => ({ project, comments: x.data.comments }))
      )
    );
  } catch (err) {
    console.error("Failed loading comments:", err.message);
    throw err;
  }
};

export const getProject = async (id: number): Promise<ProjectDetails> =>
  axios
    .get(`https://www.behance.net/v2/projects/${id}?api_key=u_n_m_o_c_k_200`)
    .then(x => x.data);
