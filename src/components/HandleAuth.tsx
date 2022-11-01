import * as React from 'react';

import { getAuth, onAuthStateChanged, Unsubscribe } from "firebase/auth";

const auth = getAuth();

interface Props {
  isSignedIn: JSX.Element;
  isNotSignedIn: JSX.Element;
  loading: JSX.Element;
}

interface State {
  isSignedIn: boolean|null;
}

export default class HandleAuth extends React.Component<Props, State> {
  private unsubscribeToAuth?: Unsubscribe;

  constructor(props: Props) {
    super(props);

    this.state = {
      isSignedIn: null
    }
  }

  componentDidMount(): void {
    this.unsubscribeToAuth = onAuthStateChanged(auth, (user) => {
      this.setState({
        isSignedIn: user != null
      })
    });
  }

  componentWillUnmount(): void {
    this.unsubscribeToAuth && this.unsubscribeToAuth();
  }

  render() {
    switch (this.state.isSignedIn) {
      case null:
        return this.props.loading;
      case false:
        return this.props.isNotSignedIn;
      case true:
        return this.props.isSignedIn;
    }
  }
}