import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function OutlinedCard(props: {title: string, subTitle: string, link: string, linkLabel: string}) {
  return (
    <Box marginBottom={4}>
      <Card variant="outlined">
        <CardContent style={{paddingBottom: 2}}>
          <Typography variant="h4" component="div">
            {props.title}
          </Typography>
          <Typography color="text.secondary">
            {props.subTitle}
          </Typography>
        </CardContent>
        <CardActions style={{paddingTop: 2}}>
          <Button size="small" component={Link} to={props.link}>{props.linkLabel}</Button>
        </CardActions>
      </Card>
    </Box>
  );
}