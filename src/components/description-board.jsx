import React from "react";
import styled from "styled-components";
import { STORY_WIDTH } from "../shared";

const DESCRIPTION_HEIGHT = 600;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(100, 100, 100, 0.5);
  backdrop-filter: blur(10px);
  font-family: Arial;
  position: fixed;
  border-radius: 0px 0px 16px 16px;
  padding: 12px 16px;
  top: ${(DESCRIPTION_HEIGHT - 32) * -1}px;
  left: 50%;
  transform: translateX(-50%);
  height: ${DESCRIPTION_HEIGHT}px;
  z-index: 10;
  color: white;
  transition: all 500ms;
  filter-backdrop: blur(4px);
  box-shadow: 0px 0px 10px 4px rgba(255, 255, 255, 0.1);
  & .DescriptionLinkContainer {
    opacity: 0.5;
  }
  &:hover {
    background-color: rgba(30, 30, 30, 0.9);
    cursor: pointer;
    top: 0px;
    transition: all 500ms;
    & .DescriptionLinkContainer {
      opacity: 1;
    }
    & .story {
      opacity: 0.5;
    }
  }
  width: ${STORY_WIDTH.xl.width};
  @media (max-width: 1200px) {
    width: ${STORY_WIDTH.lg.width};
  }
  @media (max-width: 900px) {
    width: ${STORY_WIDTH.md.width};
  }
  @media (max-width: 600px) {
    width: ${STORY_WIDTH.sm.width};
  }
  @media (max-width: 425px) {
    width: ${STORY_WIDTH.xs.width};
  }
`;
const OverflowContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: fit-content;
  width: 100%;
  margin-bottom: 24px;
  *::-webkit-scrollbar {
    display: none;
  }
`;
const DescriptionLinkContainer = styled.div`
  margin-bottom: 32px;
`;
const DescriptionLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: lightblue;
  font-size: 14px;
  margin-right: 4px;
`;
const Link = styled.a`
  text-decoration: none;
  color: lightblue;
  font-size: 14px;
`;
const Dragger = styled.div`
  position: absolute;
  bottom: 0;
  width: 100px;
  height: 8px;
  border-radius: 32px;
  background-color: grey;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 16px;
`;
const Text = styled.p`
  font-size: 14px;
  padding: 0;
`;

const TOTAL_PHOTOS = 64;

function DescriptionBoard({ users }) {
  if (users) {
    return (
      <DescriptionContainer className="Description" id="Description">
        <OverflowContainer>
          <Text>
            <b>Chainmail</b> is a project that requires the participation of
            online audiences in order to view the images. Each image will be
            unlocked when a web visitor/audience fills in the form with their
            Instagram username (or just leave anything honestly! I just need
            your proof of participation!!). Though the project is conceived by
            the photographer and the model, the unfolding of the events in the
            project is eventually completed by the viewers - YOU.
            <br />
            <br /> Synopsis
            <br />A young Hong Kong woman -{" "}
            <Link href="https://instagram.com/emmaa.tang" target="_blank">
              @emmaa.tang
            </Link>{" "}
            - is scouted by a photographer in Central. Her comp card soon will
            be travelling from one to another hand - from a local eccentric
            Auntie to a businesswoman on her way to catch a flight.
            <br />
            <br />
            Wardrobe by{" "}
            <Link
              href="https://instagram.com/somewherenowherestudio"
              target="_blank"
            >
              @somewherenowherestudio{" "}
            </Link>
            &{" "}
            <Link href="https://instagram.com/yanyanknits" target="_blank">
              @yanyanknits
            </Link>
            .
          </Text>
          <div>
            <Text>
              <b>
                {users.length} people has contributed.{" "}
                {TOTAL_PHOTOS - users.length} posts left to unlock.
              </b>
            </Text>
            <DescriptionLinkContainer className="DescriptionLinkContainer">
              {users &&
                users.map((user, idx) => {
                  return (
                    <DescriptionLink
                      href={`https://instagram.com/${user.name}`}
                      target="_blank"
                      key={idx}
                    >
                      @{user.name}
                    </DescriptionLink>
                  );
                })}
            </DescriptionLinkContainer>
          </div>
        </OverflowContainer>
        <Dragger />
      </DescriptionContainer>
    );
  }

  return null;
}

export default DescriptionBoard;
