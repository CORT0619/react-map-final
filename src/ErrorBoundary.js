import React, { Component } from 'react';

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(err) {
    return { hasError: true};
  }


  componentDidCatch(err, info) {
    // console.log('caught');
    // this.setState({
    //   hasError: true
    // });
    console.log('err ', err);
    console.log('msg ', info);
  }

  render() {
    if (this.state.hasError) {
      // return <h1>Something went really wrong.</h1>;
      return alert('Somethign is really wrong');
    }
    return this.props.children;
  }
}

export default ErrorBoundary;