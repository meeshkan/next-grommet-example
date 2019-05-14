import axios from "axios";

export const getProjectsAndComments = async () => {
  let projects: any[] = [];
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

  let comments: any[] = [];

  try {
    comments = await Promise.all(
      projects.map(project =>
        axios
          .get(
            `https://www.behance.net/v2/projects/${
              project.id
            }/comments?api_key=u_n_m_o_c_k_200`
          )
          .then(x => x.data, () => ({ comments: [] }))
      )
    );
  } catch (err) {
    console.error("Failed loading comments:", err.message);
    throw err;
  }
  return { projects, comments };
};

export const getProject = async id => {
  const data = await axios
    .get(`https://www.behance.net/v2/projects/${id}?api_key=u_n_m_o_c_k_200`)
    .then(x => x.data, () => ({}));
  return data;
};
