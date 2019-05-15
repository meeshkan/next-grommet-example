import { Grid } from "grommet";
import React from "react";
import { getProject } from "../util/behance";
import { ProjectAndComments, ProjectDetails } from "../util/types";
import CommentsOpenModal from "./comments-open-modal";
import DescriptionModal from "./description-open-modal";
import ProjectBox from "./project-box";

interface IProps {
  projectsWithComments: ProjectAndComments[];
}

interface ProjectsById {
  [id: number]: ProjectAndComments;
}

interface ProjectIdAndDetails {
  id: number;
  details: ProjectDetails;
}

/* Comments open or not, either project ID or undefined*/
type CommentsOpenState = number | undefined;

/* Project details open or not, either project details or undefined */
type ProjectDetailsState = ProjectIdAndDetails | undefined;

const ProjectsGrid = (props: IProps) => {
  const { projectsWithComments } = props;

  /**
   * Collect all projects in a map by id for easy access
   */
  const projectsById: ProjectsById = projectsWithComments.reduce((acc, val) => {
    acc[val.project.id] = val;
    return acc;
  }, {});

  /**
   * Define React hooks for managing modals
   */
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
      {projectsWithComments.map((projectWithComments, i) => (
        <ProjectBox
          project={projectWithComments.project}
          onOpenDescription={onOpenDescriptionForProjectId(
            projectWithComments.project.id
          )}
          onOpenComments={onOpenCommentsForProjectId(
            projectWithComments.project.id
          )}
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

export default ProjectsGrid;
