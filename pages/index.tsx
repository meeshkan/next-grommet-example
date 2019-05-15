import React from "react";
import { unmock as unmockNode } from "unmock-node";
import ErrorComponent from "../components/error-component";
import ProjectsGrid from "../components/projects-grid";
import { getProjectsWithComments } from "../util/behance";
import { ProjectAndComments } from "../util/types";

interface Props {
  projectsWithComments: ProjectAndComments[];
  err?: string;
}

class MainComponent extends React.Component<Props> {
  public static async getInitialProps(): Promise<Props> {
    /* Initialize unmock in server-side */
    await unmockNode({ token: process.env.UNMOCK_TOKEN });
    console.log("Fetching initial props...");
    try {
      const projectsWithComments = await getProjectsWithComments();
      return { projectsWithComments };
    } catch (err) {
      console.error("Failed loading data", err.message);
      return { projectsWithComments: [], err: err.message };
    }
  }
  public async componentDidMount() {
    const { unmock: unmockJSDom } = require("unmock-jsdom");

    if (process.env.UNMOCK_TOKEN) {
      console.log("Initializing unmock with token");
    } else {
      console.warn("No UNMOCK_TOKEN provided, initializing without token!");
    }
    await unmockJSDom({
      token: process.env.UNMOCK_TOKEN,
    });
  }
  public render() {
    const { err, projectsWithComments } = this.props;
    return (
      <div>
        {err && <ErrorComponent err={err} />}
        {!err && <ProjectsGrid projectsWithComments={projectsWithComments} />}
      </div>
    );
  }
}

export default MainComponent;
