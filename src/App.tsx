import './firebase';
import HandleAuth from './components/HandleAuth';
import LoadingPage from './components/LoadingPage';
import SignInPage from './components/SignInPage';
import MainRouter from './router';

export const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  return (
    <HandleAuth
      isNotSignedIn={<SignInPage />}
      isSignedIn={<MainRouter />}
      loading={<LoadingPage />}
    />
  );
}