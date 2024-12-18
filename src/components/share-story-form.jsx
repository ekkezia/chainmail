import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { postSubmission } from '../actions/post-submission';
import { CircularProgress, Dialog } from '@mui/material';
import { Check, CheckCircleOutline, Close, CopyAll } from '@mui/icons-material';

const TitleContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Title = styled.div`
  font-family: Arial;
  font-size: 16px;
  color: #2b2b2b;
  width: 100%;
  margin-bottom: 8px;
`;

const UsernameInput = styled.input`
  width: fit-content;
  font-family: Arial;
  font-size: 16px;
  background: #efefef;
  border: none;
  border-radius: 3px;
  padding: 8px;
  margin: 8px 0;
  width: calc(100% - 16px);
  &:hover {
    border: none;
  }
`;

const CloseButton = styled.button`
  background: #c7c7c7;
  color: white;
  border: none;
  border-radius: 999px;
  min-width: 16px;
  width: 16px;
  height: 16px;
  padding: 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 100%;
  font-size: 16px;
  display: inline;
  font-family: Arial;
  background: none;
  color: #ebebeb;
  padding: 8px;
  border: none;
  background: #efefef;
  font-weight: 700;
  letter-spacing: 0.1rem;
  border-radius: 3px;
  &:hover {
    background: #ebebeb;
    color: white;
  }
  &:disabled {
    color: #c7c7c7;
    cursor: not-allowed;
    &:hover {
      background: #efefef;
      color: #c7c7c7;
    }
  }
`;

const ShareButton = styled.button`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  gap: 4px;
  font-family: Arial;
  background: #efefef;
  color: #2b2b2b;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background: #ebebeb;
    color: #2b2b2b;
  }
  &:disabled {
    background: grey;
    color: #d9d9d9;
    cursor: not-allowed;
  }
`;

function ShareStoryForm(props) {
  const { onClose, open, loading, setLoading, refreshOnSubmit } = props;

  const userAlreadySubmitted =
    typeof window !== 'undefined'
      ? localStorage.getItem('username_is_submitted')
      : false;

  const [copied, setCopied] = React.useState(false);
  const textToCopy = 'https://e-kezia.com/chainmail';

  async function submitUser(username) {
    setLoading(true);
    await postSubmission(username.toString());
    localStorage.setItem('username_is_submitted', true);
    setLoading(false);
  }

  function handleSubmit(username) {
    submitUser(username).then(() => refreshOnSubmit());
  }

  const handleCopyButton = () => {
    // const instagramUrl = 'https://www.instagram.com/add/story/?url=' + encodeURIComponent('https://e-kezia.com/chain-mail');
    // window.open(instagramUrl, '_blank');
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      style={{ background: 'rgba(100, 100, 100, 0.2)' }}
    >
      <div
        style={{
          width: 'fit-content',
          height: '100%',
          backdropFilter: 'blur(4px)',
          padding: '16px',
          maxWidth: 300,
        }}
      >
        <TitleContainer>
          <Title>
            {userAlreadySubmitted
              ? 'You have already submitted once. Maybe share to your friends to see the next photograph?'
              : 'Share your Instagram Username to see the next photograph'}
          </Title>
          <CloseButton onClick={onClose}>
            <Close style={{ width: '12px', height: '12px' }} />
          </CloseButton>
        </TitleContainer>
        <div>
          {userAlreadySubmitted ? (
            <ShareButton onClick={handleCopyButton}>
              {copied ? (
                <>
                  <Check /> Link copied, now go share!
                </>
              ) : (
                <>
                  <CopyAll /> Copy Chainmail Link
                </>
              )}
            </ShareButton>
          ) : (
            <Formik
              initialValues={{ username: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = 'Required';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values.username);
                let formattedUsername = values.username.includes('@')
                  ? values.username.split('@')[1]
                  : values.username;
                handleSubmit(formattedUsername);
              }}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  <Field name='username'>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }) => (
                      <>
                        <UsernameInput
                          type='text'
                          placeholder='@ekezia'
                          {...field}
                          required
                        />
                        <SubmitButton
                          type='submit'
                          disabled={
                            !errors || isSubmitting || !isValid || !dirty
                          }
                        >
                          {loading ? (
                            <CircularProgress
                              size='16'
                              style={{ color: 'white' }}
                            />
                          ) : (
                            'SUBMIT'
                          )}
                        </SubmitButton>
                      </>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default ShareStoryForm;

ShareStoryForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
