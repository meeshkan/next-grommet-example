import { Box, Button, Grid, Heading, Layer } from "grommet";
import React from "react";
import { getProject } from "../pages/util";

interface IProps {
  projects: any;
  comments: any;
}

const ProjectsComponent = (props: IProps) => {
  const { projects, comments } = props;
  const [commentsOpen, setCommentsOpen] = React.useState(undefined);
  const [detailedProject, setDetailedProject] = React.useState(undefined);

  const closeComment = () => setCommentsOpen(undefined);
  const closeDescription = () => setDetailedProject(undefined);

  return (
    <Grid
      columns={{
        count: 3,
        size: "auto",
      }}
      gap="small"
    >
      {projects.map((project, i) => (
        <Box
          gap="small"
          direction="column"
          justify="center"
          pad="medium"
          elevation="small"
          key={`project_${i}`}
        >
          <Heading level="3">{project.name}</Heading>
          <img
            style={{ display: "block", width: "270px", height: "270px" }}
            src={project.covers["202"]}
          />
          <div>
            <Button
              margin={{ right: "small" }}
              primary
              onClick={async () => {
                const detailedProjectResult = await getProject(project.id);
                setDetailedProject({
                  details: detailedProjectResult,
                  id: project.id,
                });
              }}
              label="Description"
            />
            <Button
              onClick={() => {
                setCommentsOpen(project.id);
              }}
              label="Comments"
            />
          </div>
          {project.id === commentsOpen && (
            <Layer
              position="center"
              modal
              onClickOutside={closeComment}
              onEsc={closeComment}
            >
              <Box pad="medium" flex overflow="auto">
                <Heading level="3">Comments about {project.name}</Heading>
                <div>
                  {comments[i].comments.map((comment, j) => (
                    <div key={`comment_${i}_${j}`}>
                      <strong>{comment.user.first_name} said </strong>
                      {comment.comment}
                      <hr />
                    </div>
                  ))}
                </div>
              </Box>
            </Layer>
          )}
          {detailedProject && detailedProject.id === project.id && (
            <Layer
              position="center"
              modal
              onClickOutside={closeDescription}
              onEsc={closeDescription}
            >
              <Box pad="medium" flex overflow="auto">
                <Heading level="3">Say hi to {project.name}</Heading>
                <div>{detailedProject.details.description}</div>
              </Box>
            </Layer>
          )}
        </Box>
      ))}
    </Grid>
  );
};

export default ProjectsComponent;
