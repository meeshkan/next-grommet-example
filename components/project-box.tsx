import { Box, Button, Heading } from "grommet";

interface IProps {
  project: any;
  onOpenDescription: () => void;
  onOpenComments: () => void;
}

const ProjectBox = (props: IProps) => (
  <Box
    gap="small"
    direction="column"
    justify="center"
    pad="medium"
    elevation="small"
  >
    <Heading level="3">{props.project.name}</Heading>
    <img
      style={{ display: "block", width: "270px", height: "270px" }}
      src={props.project.covers["202"]}
    />
    {/* Project box buttons */}
    <div>
      <Button
        margin={{ right: "small" }}
        primary
        onClick={props.onOpenDescription}
        label="Description"
      />
      <Button onClick={props.onOpenComments} label="Comments" />
    </div>
  </Box>
);

export default ProjectBox;
