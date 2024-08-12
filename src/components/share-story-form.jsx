import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { postSubmission } from '../actions/post-submission';
import { CircularProgress, Dialog } from '@mui/material';
import { CheckCircleOutline, Close, CopyAll } from '@mui/icons-material';

const Title = styled.div`
  font-family: Arial;
  font-size: 16px;
  color: black;
  padding: 8px;
`;

const UsernameInput = styled.input`
  width: 100%;
  font-family: Arial;
  font-size: 16px;
  background: none;
  padding: 8px;
  border-bottom: 1px solid grey;
  &:hover {
    background: none;
    border: none;
  }
`;

const CloseButton = styled.button`
    display: flex;
    position: absolute;
    top: 0; 
    right: 0;
    background: none;
    color: black;
    border: none;
    &:hover {
      background: black;
      color: white;
    }
`;

const SubmitButton = styled.button`
width: 100%;
height: 100%;
font-size: 16px;
    display: inline;
  font-family: Arial;
  background: none;
  color: black;
  padding: 8px;
  border: none;
  &:hover {
    background: black;
    color: white;
  }
  &:disabled {
    background: grey;
    color: #d9d9d9;
    cursor: not-allowed;
  }
`;

const ShareButton = styled.button`
width: 100%;
height: fit-content;
display: flex;
align-items: center;
justify-content: center;
border-radius: 8px;
border: 1px solid grey;
font-size: 16px;
font-weight: 700;
gap: 4px;
  font-family: Arial;
  background: none;
  color: black;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
  &:disabled {
    background: grey;
    color: #d9d9d9;
    cursor: not-allowed;
  }
`;



function ShareStoryForm(props) {
  const { onClose, open, loading, setLoading, refreshOnSubmit } = props;

  const userAlreadySubmitted = typeof window !== "undefined" ? localStorage.getItem('username_is_submitted') : false;

  const [copied, setCopied] = React.useState(false);
  const textToCopy = 'https://e-kezia.com/chainmail';

  async function submitUser(username) {
    setLoading(true);
    await postSubmission(username.toString());
    localStorage.setItem('username_is_submitted', true);
    setLoading(false);
  }

  function handleSubmit(username) {
    submitUser(username)
      .then(() => refreshOnSubmit());
  }

  const handleCopyButton = () => {
    // const instagramUrl = 'https://www.instagram.com/add/story/?url=' + encodeURIComponent('https://e-kezia.com/chain-mail');
    // window.open(instagramUrl, '_blank');
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(error => {
        console.error('Failed to copy text: ', error);
      });

  };

  return (
    <Dialog onClose={onClose} open={open}>
      <div container padding={{ xs: 1 }} style={{ width: '100%', height: '100%', background: 'rgba(100, 100, 100, 0.2)', backdropFilter: 'blur(4px)', padding: 16 }}>
        <div>
          {userAlreadySubmitted ?
            <>
              <Title>You have already submitted once. Maybe share to your friends to see the next photograph?</Title>
            </>
            : <Title>Share Your Instagram User to see the next photograph</Title>}
        </div>
        <div>
          <CloseButton onClick={onClose}><Close /></CloseButton>
        </div>
        <div>
          {userAlreadySubmitted ?
            <ShareButton onClick={handleCopyButton}>{copied ? <>Link copied, now go share! <CheckCircleOutline /></> : <>Copy Chainmail Link <CopyAll /></>}</ShareButton>
            :
            <Formik
              initialValues={{ username: '' }}
              validate={values => {
                const errors = {};
                if (!values.username) {
                  errors.username = 'Required';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values.username);
                let formattedUsername =
                  values.username.includes('@') ? values.username.split('@')[1] : values.username
                  ;
                handleSubmit(formattedUsername);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name="username">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }) => (
                      <div container>
                        <div item xs={9}>
                          <UsernameInput type="text" placeholder="@ekezia" {...field} />
                        </div>
                        <div item xs={3}>
                          <SubmitButton type="submit" disabled={!errors || isSubmitting}>
                            {loading ? <CircularProgress size="16" /> : 'Submit'}
                          </SubmitButton>
                        </div>
                      </div>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>

          }
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