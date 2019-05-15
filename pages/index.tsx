import React from "react";
import { unmock } from "unmock";
import ErrorComponent from "../components/error-component";
import ProjectsGrid from "../components/projects-grid";
import { getProjectsAndComments } from "../util/behance";
import { Comment, Project } from "../util/types";

interface Props {
  comments: Array<{ comments: Comment[] }>;
  projects: Project[];
  err?: string;
}

class MainComponent extends React.Component<Props> {
  public static async getInitialProps(): Promise<Props> {
    /* Initialize unmock in server-side */
    await unmock({ ignore: "story", token: process.env.UNMOCK_TOKEN });
    console.log("Fetching initial props...");
    try {
      return await getProjectsAndComments();
    } catch (err) {
      console.error("Failed loading data", err.message);
      return { projects: [], comments: [], err: err.message };
    }
  }
  public async componentDidMount() {
    if (process.env.UNMOCK_TOKEN) {
      console.log("Initializing unmock with token");
    } else {
      console.warn("No UNMOCK_TOKEN provided, initializing without token!");
    }
    await unmock({
      token: process.env.UNMOCK_TOKEN,
    });
  }
  public render() {
    const { err, projects, comments } = this.props;
    return (
      <div>
        {err && <ErrorComponent err={err} />}
        {!err && <ProjectsGrid projects={projects} comments={comments} />}
      </div>
    );
  }
}

export default MainComponent;
