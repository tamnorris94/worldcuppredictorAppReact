import React, { Component } from 'react';
import UpcomingMatches from "./Containers/UpcomingMatches/UpcomingMatches";
import CompletedMatches from "./Containers/CompletedMatches/CompletedMatches";
import UpcomingMatchCreate from "./Containers/UpcomingMatchCreate/UpcomingMatchCreate";
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './Hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import AddResultsToCompletedMatches from "./Containers/AddResultsToCompletedMatches/AddResultsToCompletedMatches";
import { connect } from 'react-redux';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Layout>
              <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/upcomingmatches" component={UpcomingMatches} />
                  <Route path="/completedmatches" component={CompletedMatches} />
                  <Route path="/addupcomingmatch" component={UpcomingMatchCreate} />
                  <Route path="/addresultsforcompletedmatch" component={AddResultsToCompletedMatches} />
              </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
//export default withRouter( connect( App ) );
