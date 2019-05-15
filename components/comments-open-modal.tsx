import { Box, Heading, Layer } from "grommet";
import React from "react";
import { ProjectAndComments } from "../util/types";

interface IProps {
  projectAndComments: ProjectAndComments;
  closeComment: () => void;
}

const CommentsOpenModal = (props: IProps) => {
  const { projectAndComments, closeComment } = props;
  return (
    <Layer
      position="center"
      modal
      onClickOutside={closeComment}
      onEsc={closeComment}
    >
      <Box pad="medium" flex overflow="auto">
        <Heading level="3">
          Comments about {projectAndComments.project.name}
        </Heading>
        <div>
          {projectAndComments.comments.map((comment, j) => (
            <div key={`comment_${j}`}>
              <strong>{comment.user.first_name} said </strong>
              {comment.comment}
              <hr />
            </div>
          ))}
        </div>
      </Box>
    </Layer>
  );
};

export default CommentsOpenModal;
