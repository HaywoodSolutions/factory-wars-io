import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ButtonBase } from '@mui/material';
import { getAuth } from "firebase/auth";

export default function SideBarUser() {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <ButtonBase style={{width: "100%"}}>
      <Card elevation={0}>
        <CardContent style={{padding: 5}}>
          <Typography variant="h6" component="div" style={{fontSize: 14, marginTop: 1}}>
            {`Owner: ${user?.displayName}`}
          </Typography>
          <Typography variant="body2" style={{fontSize: 11, textAlign: 'left'}}>
            {`Nation: ${"United Kingdom"}`}
          </Typography>
          <Typography variant="body2" style={{fontSize: 11, textAlign: 'left'}}>
            {`Est: ${"23rd Oct 2028"}`}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}