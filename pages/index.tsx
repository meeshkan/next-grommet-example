import { Box, Button, Grid, Heading, Layer } from "grommet";
import React from "react";
import { unmock } from "unmock";
import ErrorComponent from "../components/error-component";
import { getProject, getProjectsAndComments } from "./util";

interface IProps {
  comments: any;
  projects: any;
  err: string;
}

interface IState {
  detailedProjects: any;
  commentsOpen: any;
  descriptionOpen: any;
}

class MainComponent extends React.Component<IProps, IState> {
  public static async getInitialProps() {
    // Initialize unmock in server-side
    await unmock({ ignore: "story", token: process.env.UNMOCK_TOKEN });
    console.log("Fetching initial props...");
    try {
      return await getProjectsAndComments();
    } catch (err) {
      console.error("Failed loading data", err.message);
      return { err: err.message };
    }
  }
  public state: IState = {
    commentsOpen: {},
    descriptionOpen: {},
    detailedProjects: {},
  };
  public async componentDidMount() {
    console.log(`Initializing unmock`, process.env.UNMOCK_TOKEN);
    if (process.env.UNMOCK_TOKEN) {
      await unmock({
        token: process.env.UNMOCK_TOKEN,
      });
    }
  }
  public render() {
    const { err, projects, comments } = this.props;
    const { commentsOpen, descriptionOpen, detailedProjects } = this.state;
    const closeComment = id => () => {
      this.setState({ commentsOpen: { ...commentsOpen, [id]: false } });
    };
    const closeDescription = id => () => {
      this.setState({ descriptionOpen: { ...descriptionOpen, [id]: false } });
    };
    return (
      <div>
        {err && <ErrorComponent err={err} />}
        {!err && (
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
                      const detailedProject = await getProject(project.id);
                      this.setState({
                        descriptionOpen: {
                          ...descriptionOpen,
                          [project.id]: true,
                        },
                        detailedProjects: {
                          ...detailedProjects,
                          [project.id]: detailedProject,
                        },
                      });
                    }}
                    label="Description"
                  />
                  <Button
                    onClick={() => {
                      this.setState({
                        commentsOpen: { ...commentsOpen, [project.id]: true },
                      });
                    }}
                    label="Comments"
                  />
                </div>
                {commentsOpen[project.id] && (
                  <Layer
                    position="center"
                    modal
                    onClickOutside={closeComment(project.id)}
                    onEsc={closeComment(project.id)}
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
                {descriptionOpen[project.id] && (
                  <Layer
                    position="center"
                    modal
                    onClickOutside={closeDescription(project.id)}
                    onEsc={closeDescription(project.id)}
                  >
                    <Box pad="medium" flex overflow="auto">
                      <Heading level="3">Say hi to {project.name}</Heading>
                      <div>{detailedProjects[project.id].description}</div>
                    </Box>
                  </Layer>
                )}
              </Box>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

export default MainComponent;
