import React from "react";
import styled from "styled-components";
import { STORY_WIDTH } from "../shared";

const Container = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  top: 8px;
  left: 8px;
`;
const Bar = styled.div`
  width: ${(p) => `calc(${STORY_WIDTH.xl.width} / ${p.$numberOfBars} - 6px)`};
  height: 2px;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  background: ${(p) => (p.$active ? "#ffffff" : "#7a7a7a")};
  @media (max-width: 1200px) {
    width: ${(p) => `calc(${STORY_WIDTH.lg.width} / ${p.$numberOfBars} - 6px)`};
  }
  @media (max-width: 900px) {
    width: ${(p) => `calc(${STORY_WIDTH.md.width} / ${p.$numberOfBars} - 6px)`};
  }
  @media (max-width: 600px) {
    width: ${(p) => `calc(${STORY_WIDTH.sm.width} / ${p.$numberOfBars} - 6px)`};
  }
  @media (max-width: 425px) {
    width: ${(p) => `calc(${STORY_WIDTH.xs.width} / ${p.$numberOfBars} - 6px)`};
  }
`;
function StoryBars({ numberOfBars, imageNo }) {
  return (
    <Container>
      {[...Array(numberOfBars)].map((_, index) => (
        <Bar
          $numberOfBars={numberOfBars}
          $active={index + 1 <= imageNo}
          key={index}
        />
      ))}
    </Container>
  );
}

export default StoryBars;
