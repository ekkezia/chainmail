import React from 'react';
import styled from 'styled-components';
import { STORY_WIDTH } from '../shared';

const GAP = 2;

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 16px;
  left: 8px;
  z-index: 99;
`;
const Bar = styled.div`
  width: ${(p) =>
    `calc((${STORY_WIDTH.xl.width} - ${GAP * p.$numberOfBars}px - 16px) / ${
      p.$numberOfBars
    })`};
  height: 4px;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  background: ${(p) => (p.$active ? '#ffffff' : '#7a7a7a')};
  margin-right: ${GAP}px;
  @media (max-width: 1200px) {
    width: ${(p) =>
      `calc((${STORY_WIDTH.lg.width} - ${GAP * p.$numberOfBars}px) - 16px) / ${
        p.$numberOfBars
      })`};
  }
  @media (max-width: 900px) {
    width: ${(p) =>
      `calc((${STORY_WIDTH.md.width} - ${GAP * p.$numberOfBars}px - 16px) / ${
        p.$numberOfBars
      })`};
  }
  @media (max-width: 600px) {
    width: ${(p) =>
      `calc((${STORY_WIDTH.sm.width} - ${GAP * p.$numberOfBars}px - 16px) / ${
        p.$numberOfBars
      })`};
  }
  @media (max-width: 425px) {
    width: ${(p) =>
      `calc((${STORY_WIDTH.xs.width} - ${GAP * p.$numberOfBars}px - 16px) / ${
        p.$numberOfBars
      })`};
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
