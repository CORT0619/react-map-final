import { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(err, msg) {
    this.setState({
      hasError: true
    });
    console.log('err ', err);
    console.log('msg ', msg);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return alert('error occurred!');
    }
    return this.props.children;
  }
}

export default ErrorBoundary;