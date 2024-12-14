import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Profile from './components/profile-picture';
import StoryBars from './components/story-bars';
import Story from './components/story';
import ShareStoryForm from './components/share-story-form';
import { STORY_WIDTH } from './shared';
import LeaderBoard from './components/leaderboard';
import DescriptionBoard from './components/description-board';
import { CircularProgress } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { getSubmission } from './actions/get-submissions';
import { subscribeSubmission } from './actions/subscribe-submissions';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: black;
`;
const Container = styled.div`
  background-color: rgba(100, 100, 100, 0.5);
  position: relative;
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

const PseudoContainer = styled.div`
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 999;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:nth-child(1) {
    left: 0;
    justify-content: flex-start;
  }
  &:nth-child(2) {
    right: 0;
    justify-content: flex-end;
  }
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledChevronLeft = styled(ChevronLeft)`
  color: black;
  background: grey;
  border-radius: 999px;
  margin-right: 8px;
  cursor: pointer;
  width: 8px;
  height: 8px;
  &:hover {
    background: white;
  }
`;

const StyledChevronRight = styled(ChevronRight)`
  color: black;
  background: grey;
  border-radius: 999px;
  margin-left: 8px;
  cursor: pointer;
  width: 8px;
  height: 8px;
  &:hover {
    background: white;
  }
`;

const TOTAL_IMAGES = 64;

function Page() {
  const [imageNo, setImageNo] = useState(1);
  const [users, setUsers] = useState();
  const [fetchLoading, setFetchLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [isiPhone, setIsiPhone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsiPhone(/iPhone/i.test(window.navigator.userAgent));
    }
  }, []);

  async function fetchUsers() {
    setFetchLoading(true);
    try {
      const res = await getSubmission();
      setUsers(res);
      console.log('res', res);
      setFetchLoading(false);
    } catch {
      console.log('error');
    }
  }

  function refreshOnSubmit() {
    fetchUsers().then(() => {
      setLoading(false);
      setOpen(false);
      setImageNo(users.length + 1);
    });
  }

  const timeout = 1 * 60 * 1000;
  useEffect(() => {
    subscribeSubmission();
    fetchUsers();
    setInterval(() => {
      fetchUsers();
    }, timeout);
  }, []);

  function handlePreviousImage() {
    if (imageNo === 1) setImageNo(1);
    else setImageNo((i) => i - 1);
  }

  function handleNextImage() {
    // only allow to go next if user has submitted
    if (users[imageNo]) {
      if (imageNo === TOTAL_IMAGES) setImageNo(TOTAL_IMAGES);
      else setImageNo((i) => i + 1);
    } else {
      // open form if there's no submission found
      setOpen(true);
    }
  }

  return (
    <Center>
      <StyledChevronLeft onClick={handlePreviousImage} />
      <Container
        className='story'
        style={{ transform: isiPhone && 'translateY(-8%)' }}
      >
        <PseudoContainer
          style={{ borderRadius: '16px 0px 16px 0px' }}
          onClick={handlePreviousImage}
        />
        <PseudoContainer
          style={{ borderRadius: '0px 16px 0px 16px' }}
          onClick={handleNextImage}
        />
        <Profile />
        <StoryBars numberOfBars={TOTAL_IMAGES} imageNo={imageNo} />
        {fetchLoading && users?.length > 0 ? (
          <LoadingContainer>
            <CircularProgress style={{ color: 'white' }} />
          </LoadingContainer>
        ) : (
          [...Array(users?.length)].map((_, idx) => {
            return (
              <>
                <Story imageNo={imageNo} key={idx} idx={idx + 1} />
              </>
            );
          })
        )}
      </Container>
      <StyledChevronRight onClick={handleNextImage} />

      <ShareStoryForm
        open={open}
        onClose={() => setOpen(false)}
        setOpen={setOpen}
        loading={loading}
        setLoading={setLoading}
        refreshOnSubmit={refreshOnSubmit}
      />
      <LeaderBoard imageNo={imageNo} users={users} />
      <DescriptionBoard users={users} />
    </Center>
  );
}

export default Page;
