import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      buttonHover: false
    }

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.displayName !== prevProps.user.displayName && (this.props.user.email !== "Guest Email")) {
      this.setState({ signedIn: true });
    }
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
    this.setState({ signedIn: false }, () => console.log("SIGNING OUT"));
    this.props.setUser({ displayName: "Guest", email: "Guest Email" });
  }

  mouseEnter() {
    this.setState({ buttonHover: true });
  }

  mouseLeave() {
    this.setState({ buttonHover: false });
  }

  render() {
    let button;
    if (!this.state.signedIn) {
      button = <button id="sign-in-button" onClick={this.signIn}>Sign-In</button>
    }
    else if (this.state.signedIn) {
      button = <button id="sign-out-button"
        onClick={this.signOut}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}>
        {(this.state.buttonHover) ? ("Sign-Out") : (this.props.user.displayName)}
      </button>
        }

    return (
      <div>{button}</div>
    )
  }
}

export default User;
