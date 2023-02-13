import { withNProgress } from "@tanem/react-nprogress";
import React from "react";

import Bar from "./Bar";
import LoadingContainer from "./LoadingContainer";

const Progress: React.FC<{
  animationDuration: number;
  isFinished: boolean;
  progress: number;
}> = ({ isFinished, progress, animationDuration }) => (
  <LoadingContainer
    animationDuration={animationDuration}
    isFinished={isFinished}
  >
    <Bar animationDuration={animationDuration} progress={progress} />
  </LoadingContainer>
);

export default withNProgress(Progress);
