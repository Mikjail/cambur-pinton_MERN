import React, { Component } from 'react';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentWillMount() {
      this.shouldNavigateAway();
    }

    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
        let order = localStorage.getItem("order");
        let user = localStorage.getItem("user");
        
      if (!user  || !order) {
        
        this.props.history.push('/order');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};