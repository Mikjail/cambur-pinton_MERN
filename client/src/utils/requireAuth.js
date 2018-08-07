import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
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
        
        console.log(!user)
        
      if (!user  || !order) {
        console.log("paso por aca")
        this.props.history.push('/order');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};