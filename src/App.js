import React, { Component } from 'react';
import UpcomingMatchCreate from "./Containers/UpcomingMatchCreate/UpcomingMatchCreate";
import UpcomingRugbyMatches from "./Containers/UpcomingMatches/UpcomingRugbyMatches";
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

const asyncUpcomingRugbyMatches = asyncComponent(() => {
    return import('./Containers/UpcomingMatches/UpcomingRugbyMatches');
});

const asyncCompletedMatches = asyncComponent(() => {
    return import('./Containers/CompletedMatches/CompletedMatches');
});

const asyncAuth = asyncComponent(() => {
    return import('./Containers/Auth/Auth');
});

const asyncAggregatePredictionResults = asyncComponent(() => {
    return import('./Containers/AggregatePredictionResults/AggregatePredictionResults');
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
           <Route path="/upcominggames" component={asyncUpcomingRugbyMatches}/>
           <Route path="/addupcomingmatch" component={UpcomingMatchCreate}/>
           <Route path="/predictionResults" component={asyncAggregatePredictionResults}/>
           <Route path="/auth" component={asyncAuth}/>
           <Redirect to="/" />
       </Switch>
   );

   if(this.props.isAuthenticated && (this.props.admin === false)) {
       routes = (
           <Switch>
               <Route path="/" exact component={Home}/>
               <Route path="/upcomingmatches" component={asyncUpcomingMatches}/>
               <Route path="/upcominggames" component={asyncUpcomingRugbyMatches}/>
               <Route path="/predictionResults" component={asyncAggregatePredictionResults}/>
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
                  <Route path="/upcominggames" component={asyncUpcomingRugbyMatches}/>
                  <Route path="/addupcomingmatch" component={UpcomingMatchCreate}/>
                  <Route path="/predictionResults" component={asyncAggregatePredictionResults}/>
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
