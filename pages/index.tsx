import React from "react";
import { unmock } from "unmock";
import ErrorComponent from "../components/error-component";
import ProjectsComponent from "../components/projects-component";
import { getProjectsAndComments } from "./util";

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
    return (
      <div>
        {err && <ErrorComponent err={err} />}
        {!err && <ProjectsComponent projects={projects} comments={comments} />}
      </div>
    );
  }
}

export default MainComponent;
