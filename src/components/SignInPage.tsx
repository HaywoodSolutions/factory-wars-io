import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function LoadingPage() {
  const signInWithGoogle = () => {
    const auth = getAuth();

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }

  return (
    <div style={{backgroundColor: 'black', width: '100vw', height: '100vh'}}>
      <Dialog open={true}>
        <DialogTitle>Clash of Factories - Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To play, you will need to sign up. Use one of our sign in providers below.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          <IconButton aria-label="Google" size="large" onClick={signInWithGoogle}>
            <GoogleIcon fontSize="inherit" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}