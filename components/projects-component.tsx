import { Grid } from "grommet";
import React from "react";
import { getProject } from "../pages/util";
import CommentsOpenModal from "./comments-open-modal";
import DescriptionModal from "./description-open-modal";
import ProjectBox from "./project";

interface IProps {
  projects: any;
  comments: any;
}

type ProjectAndComments = {
  project: any;
  comments: any[];
};

type ProjectsById = {
  [id: number]: ProjectAndComments;
};

type ProjectDetails = {
  id: number;
  details: any;
};

type CommentsOpenState = number | undefined;
type ProjectDetailsState = ProjectDetails | undefined;

const ProjectsComponent = (props: IProps) => {
  const { projects, comments } = props;

  /**
   * Collect all projects in a map by id
   */
  const projectsById: ProjectsById = projects.reduce((acc, val, index) => {
    acc[val.id] = { project: val, comments: comments[index].comments };
    return acc;
  }, {});

  const [
    commentsOpenForProjectId,
    setCommentsOpenForProjectId,
  ] = React.useState(undefined as CommentsOpenState);

  const [projectDetailsOpenForId, setProjectDetailsOpenForId] = React.useState(
    undefined as ProjectDetailsState
  );

  const closeComment = () => setCommentsOpenForProjectId(undefined);
  const closeDescription = () => setProjectDetailsOpenForId(undefined);

  const onOpenDescriptionForProjectId = (projectId: number) => async () => {
    const detailedProjectResult = await getProject(projectId);
    setProjectDetailsOpenForId({
      details: detailedProjectResult,
      id: projectId,
    });
  };

  const onOpenCommentsForProjectId = (projectId: number) => () =>
    setCommentsOpenForProjectId(projectId);

  return (
    <Grid
      columns={{
        count: 3,
        size: "auto",
      }}
      gap="small"
    >
      {/* Project boxes */}
      {projects.map((project, i) => (
        <ProjectBox
          project={project}
          onOpenDescription={onOpenDescriptionForProjectId(project.id)}
          onOpenComments={onOpenCommentsForProjectId(project.id)}
          key={`project_${i}`}
        />
      ))}
      {/* Project details modal */}
      {projectDetailsOpenForId && (
        <DescriptionModal
          projectAndComments={projectsById[projectDetailsOpenForId.id]}
          details={projectDetailsOpenForId.details}
          close={closeDescription}
        />
      )}
      {/* Comments modal */}
      {commentsOpenForProjectId && (
        <CommentsOpenModal
          projectAndComments={projectsById[commentsOpenForProjectId]}
          closeComment={closeComment}
        />
      )}
      )}
    </Grid>
  );
};

export default ProjectsComponent;
