import { Box, Heading, Layer } from "grommet";
import { ProjectAndComments, ProjectDetails } from "../util/types";

interface IProps {
  projectAndComments: ProjectAndComments;
  details: ProjectDetails;
  close: () => void;
}

const DescriptionModal = (props: IProps) => (
  <Layer
    position="center"
    modal
    onClickOutside={props.close}
    onEsc={props.close}
  >
    <Box pad="medium" flex overflow="auto">
      <Heading level="3">
        Say hi to {props.projectAndComments.project.name}
      </Heading>
      <div>{props.details.description}</div>
    </Box>
  </Layer>
);

export default DescriptionModal;
