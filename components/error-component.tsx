import { Heading } from "grommet";

interface IProps {
  err: string;
}

const ErrorComponent = ({ err }: IProps) => (
  <div>
    <Heading level="3">Well, this is embarassing...</Heading>
    <p>
      It looks like we couldn't fetch any projects. Please try again soon! Error
      message: {err}
    </p>
  </div>
);

export default ErrorComponent;
