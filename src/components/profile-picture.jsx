import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  top: 24px;
  left: 8px;
  cursor: pointer;
  align-items: center;
  color: #ffffff;
  font-family: Arial;
  font-weight: 700;
  z-index: 1;
`;
const ImageContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  background: blue;
`;

const Title = styled.p``;

function Profile() {
  const imageSource = '/images/ek-profile.png';

  return (
    <a href='https://instagram.com/ekezia' target='_blank' rel='noreferrer'>
      <Container>
        <ImageContainer>
          <img
            src={imageSource}
            alt='ig-profile-picture'
            width={48}
            height={48}
            style={{
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          />
        </ImageContainer>
        <Title>ekezia</Title>
      </Container>
    </a>
  );
}

export default Profile;
