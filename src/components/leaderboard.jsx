import React from "react";
import styled from "styled-components";
import { STORY_WIDTH } from "../shared";
import { DESCRIPTION } from "../config/story-description";

const LEADERBOARD_HEIGHT = 250;
const LeaderboardContainer = styled.div`
  background-color: rgba(100, 100, 100, 0.5);
  backdrop-filter: blur(10px);
  font-family: Arial;
  position: fixed;
  border-radius: 16px 16px 0px 0px;
  padding: 12px 16px;
  bottom: ${(LEADERBOARD_HEIGHT - 32) * -1}px;
  left: 50%;
  transform: translateX(-50%);
  height: ${LEADERBOARD_HEIGHT}px;
  overflow-y: scroll;
  z-index: 10;
  color: white;
  transition: all 500ms;
  filter-backdrop: blur(4px);
  box-shadow: 0px 0px 10px 4px rgba(255, 255, 255, 0.1);
  & .leaderboardLinkContainer {
    opacity: 0.5;
  }
  &:hover {
    background-color: rgba(30, 30, 30, 0.9);
    cursor: pointer;
    bottom: 0px;
    transition: all 500ms;
    & .leaderboardLinkContainer {
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
const LeaderboardLink = styled.a`
  display: inline;
  text-decoration: none;
  color: lightblue;
`;
const DateContainer = styled.div`
  position: absolute;
  bottom: 12px;
  width: 300px;

  font-size: 14px;
  color: lightgrey;
`;
const Dragger = styled.div`
  position: relative;
  // top: 0;
  width: 100px;
  height: 8px;
  border-radius: 32px;
  background-color: grey;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 16px;
`;

const LeaderboardContentContainer = styled.div`
  padding-top: 20px;
`;

function LeaderBoard({ imageNo, users }) {
  const rewriteDescription = () => {
    console.log("desc", DESCRIPTION[imageNo - 1].split("emma"));

    const beforeEmma = DESCRIPTION[imageNo - 1].split("emma")[0];
    const afterEmma = DESCRIPTION[imageNo - 1].split("emma")[1];
    const fullSentence = (
      <>
        {beforeEmma}&nbsp;
        <LeaderboardLink
          href="https://instagram.com/emmaa.tang"
          target="_blank"
        >
          @emmaa.tang
        </LeaderboardLink>
        &nbsp;{afterEmma}
      </>
    );

    return fullSentence;
  };

  if (users) {
    const currentUserName = users[imageNo - 1].name;
    const currentUserDate = new Date(
      parseInt(users[imageNo - 1].time)
    ).toString();

    return (
      <LeaderboardContainer className="leaderboard" id="leaderboard">
        <Dragger />
        {users && (
          <LeaderboardContentContainer>
            <LeaderboardLink
              href={`https://instagram.com/${currentUserName}`}
              target="_blank"
            >
              <b>{currentUserName}</b>
            </LeaderboardLink>
            &nbsp;
            {rewriteDescription()}{" "}
            <LeaderboardLink
              href="https://www.instagram.com/explore/tags/chainmail/?hl=en"
              target="_blank"
            >
              #Chainmail
            </LeaderboardLink>
            <br />
            <DateContainer>{currentUserDate}</DateContainer>
            <br />
            <br />
          </LeaderboardContentContainer>
        )}
      </LeaderboardContainer>
    );
  }

  return null;
}

export default LeaderBoard;
