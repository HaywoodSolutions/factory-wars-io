import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Card from '../components/mainPage/Card';

export default function MainMenu() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'black', alignItems: 'center' }}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card
          title='Sandbox'
          subTitle='A safe world where you can build, design and test'
          linkLabel='Join'
          link='/sim'
        />
        <Card
          title='World'
          subTitle='A real time enviroment to compete with others'
          linkLabel='Join'
          link='/map'
        />
      </Container>
    </Box>
  );
}