import React, { Component } from 'react';
import UpcomingMatches from "./Containers/UpcomingMatches/UpcomingMatches";
import CompletedMatches from "./Containers/CompletedMatches/CompletedMatches";
import UpcomingMatchCreate from "./Containers/UpcomingMatchCreate/UpcomingMatchCreate";
import Auth from "./Containers/Auth/Auth";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './Hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './Store/actions/index';
import asyncComponent from './Hoc/asyncComponent/asyncComponent';

const asyncUpcomingMatches = asyncComponent(() => {
    return import('./Containers/UpcomingMatches/UpcomingMatches');
});

const asyncCompletedMatches = asyncComponent(() => {
    return import('./Containers/CompletedMatches/CompletedMatches');
});

const asyncAuth = asyncComponent(() => {
    return import('./Containers/Auth/Auth');
});


class App extends Component {
    componentDidMount () {
        this.props.onTryAutoSignup();
    }

  render() {

        console.log("isAuthenticated is " +this.props.isAuthenticated);

   let routes = (
       <Switch>
           <Route path="/upcomingmatches" component={asyncUpcomingMatches} />
           <Route path="/completedmatches" component={asyncCompletedMatches} />
           <Route path="/addupcomingmatch" component={UpcomingMatchCreate}/>
           <Route path="/auth" component={asyncAuth}/>
           <Redirect to="/" />
       </Switch>
   );

   if(this.props.isAuthenticated && (this.props.admin === false)) {
       routes = (
           <Switch>
               <Route path="/" exact component={Home}/>
               <Route path="/upcomingmatches" component={asyncUpcomingMatches}/>
               <Route path="/completedmatches" component={asyncCompletedMatches}/>
               <Route path="/logout" component={Logout} />
               <Route path="/auth" component={asyncAuth}/>
               <Redirect to="/" />
           </Switch>
       )
   }

      if(this.props.isAuthenticated && (this.props.admin === true)) {
          routes = (
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/upcomingmatches" component={asyncUpcomingMatches}/>
                  <Route path="/completedmatches" component={asyncCompletedMatches}/>
                  <Route path="/addupcomingmatch" component={UpcomingMatchCreate}/>
                  <Route path="/logout" component={Logout} />
                  <Route path="/auth" component={asyncAuth}/>
                  <Redirect to="/" />
              </Switch>
          )
      }

    return (
      <div className="App">
          <Layout>
              {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        admin: state.auth.admin
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
