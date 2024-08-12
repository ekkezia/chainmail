import React from "react";
import styled from "styled-components";
import { STORY_WIDTH } from "../shared";
import { supabaseUrl } from "../supabase/supabase";

const Container = styled.div`
  font-family: Arial;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${STORY_WIDTH.xl.width};
  height: ${STORY_WIDTH.xl.height};
  @media (max-width: 1200px) {
    width: ${STORY_WIDTH.lg.width};
    height: ${STORY_WIDTH.lg.height};
  }
  @media (max-width: 900px) {
    width: ${STORY_WIDTH.md.width};
    height: ${STORY_WIDTH.md.height};
  }
  @media (max-width: 600px) {
    width: ${STORY_WIDTH.sm.width};
    height: ${STORY_WIDTH.sm.height};
  }
  @media (max-width: 425px) {
    width: ${STORY_WIDTH.xs.width};
    height: ${STORY_WIDTH.xs.height};
  }
`;
const StoryImage = styled.img`
  border-radius: 16px;
  width: ${STORY_WIDTH.xl.width};
  height: ${STORY_WIDTH.xl.height};
  @media (max-width: 1200px) {
    width: ${STORY_WIDTH.lg.width};
    height: ${STORY_WIDTH.lg.height};
  }
  @media (max-width: 900px) {
    width: ${STORY_WIDTH.md.width};
    height: ${STORY_WIDTH.md.height};
  }
  @media (max-width: 600px) {
    width: ${STORY_WIDTH.sm.width};
    height: ${STORY_WIDTH.sm.height};
  }
  @media (max-width: 425px) {
    width: ${STORY_WIDTH.xs.width};
    height: ${STORY_WIDTH.xs.height};
  }
`;

const STORAGE_URL =
  supabaseUrl + "/storage/v1/object/public/chainmail/ChainMail-ekezia-";

function Story({ imageNo, idx }) {
  const imageSrc = `${STORAGE_URL}${imageNo}.jpg`;
  if (imageNo !== idx) return <></>;
  return (
    <Container>
      <img
        src={imageSrc}
        style={{
          borderRadius: 24,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        alt={`chainmail-${imageNo}`}
      />
    </Container>
  );
}

export default Story;
