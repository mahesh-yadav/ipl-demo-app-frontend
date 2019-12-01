import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ListMatches from './components/ListMatches';
import MatchDetails from './components/MatchDetails';
import {
  fetchMatches,
  fetchMatch,
  setSearchTerm,
  setSeasonFilter,
  setCurrentPage,
} from './store/actions/matches';
import {
  setAccessTokenId,
  fetchUserDetails,
  setFavTeam,
  signout,
} from './store/actions/users';
import FilterBar from './components/FilterBar';
import { getLastPage } from './helpers/helpers';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/UserProfile';

const THEME_COLORS = {
  None: 'black',
  'Sunrisers Hyderabad': '#ee380a',
  'Mumbai Indians': '#083f88',
  'Gujarat Lions': '#f42415',
  'Royal Challengers Bangalore': 'red',
  'Rising Pune Supergiant': '#c920e5',
  'Kolkata Knight Riders': '#6e1aaa',
  'Delhi Daredevils': '#3246b8',
  'Kings XI Punjab': 'red',
  'Chennai Super Kings': '#fcb412',
  'Rajasthan Royals': '#1a63a7',
  'Deccan Chargers': '#3e5da9',
  'Kochi Tuskers Kerala': '#f24033  ',
  'Pune Warriors': '#1c1b1b',
  'Delhi Capitals': '#0758a4',
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(
      fetchMatches(this.props.searchTerm, this.props.seasonFilter)
    );
  }

  fetchMatchDetails = (matchId) => {
    this.props.dispatch(fetchMatch(matchId));
  };

  getUserDetails = (userId, token) => {
    this.props.dispatch(fetchUserDetails(userId, token));
  };

  getSearchResults = (searchTerm) => {
    this.props.dispatch(setCurrentPage(1));
    this.props.dispatch(setSearchTerm(searchTerm));
    this.props.dispatch(
      fetchMatches(
        searchTerm,
        this.props.seasonFilter,
        0,
        this.props.matchesPerPage
      )
    );
  };

  setSeasonFilter = (filter) => {
    this.props.dispatch(setCurrentPage(1));
    this.props.dispatch(setSeasonFilter(filter));
    this.props.dispatch(
      fetchMatches(this.props.searchTerm, filter, 0, this.props.matchesPerPage)
    );
  };

  goToPrevPage = () => {
    this.props.dispatch(
      fetchMatches(
        this.props.searchTerm,
        this.props.seasonFilter,
        (this.props.currentPage - 2) * this.props.matchesPerPage,
        this.props.matchesPerPage
      )
    );
    this.props.dispatch(setCurrentPage(this.props.currentPage - 1));
  };

  goToNextPage = () => {
    this.props.dispatch(
      fetchMatches(
        this.props.searchTerm,
        this.props.seasonFilter,
        this.props.currentPage * this.props.matchesPerPage,
        this.props.matchesPerPage
      )
    );
    this.props.dispatch(setCurrentPage(this.props.currentPage + 1));
  };

  setAccessToken = ({ token, userId }) => {
    this.props.dispatch(setAccessTokenId(token, userId));
  };

  onFavTeamChange = (team) => {
    this.props.dispatch(setFavTeam(team));
  };

  onSignOut = () => {
    this.props.dispatch(signout());
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            render={(routeProps) => (
              <Header
                {...routeProps}
                accessToken={this.props.user.accessToken}
                onSignOut={this.onSignOut}
                themeColor={THEME_COLORS[this.props.user.favTeam]}
              ></Header>
            )}
          ></Route>
          <ProtectedRoute
            path='/user'
            component={UserProfile}
            user={this.props.user}
            getUserDetails={this.getUserDetails}
            onFavTeamChange={this.onFavTeamChange}
            themeColor={THEME_COLORS[this.props.user.favTeam]}
          ></ProtectedRoute>
          <Route
            exact
            path='/'
            render={() => (
              <FilterBar
                getSearchResults={this.getSearchResults}
                setSeasonFilter={this.setSeasonFilter}
                themeColor={THEME_COLORS[this.props.user.favTeam]}
              ></FilterBar>
            )}
          ></Route>
          <Switch>
            <Route
              path='/'
              exact
              render={(routeProps) => {
                return (
                  <ListMatches
                    {...routeProps}
                    matches={this.props.matches}
                    searchTerm={this.props.searchTerm}
                    currentPage={this.props.currentPage}
                    lastPage={getLastPage(
                      this.props.matchesCount,
                      this.props.matchesPerPage
                    )}
                    goToNextPage={this.goToNextPage}
                    goToPrevPage={this.goToPrevPage}
                    themeColor={THEME_COLORS[this.props.user.favTeam]}
                  ></ListMatches>
                );
              }}
            ></Route>
            <Route
              path='/match/:matchId'
              render={(routeProps) => {
                return (
                  <MatchDetails
                    {...routeProps}
                    matchDetails={this.props.matchDetails}
                    fetchMatchDetails={this.fetchMatchDetails}
                    themeColor={THEME_COLORS[this.props.user.favTeam]}
                  ></MatchDetails>
                );
              }}
            ></Route>
            <Route
              path='/signup'
              render={(routeProps) => (
                <SignUp
                  {...routeProps}
                  themeColor={THEME_COLORS[this.props.user.favTeam]}
                  accessToken={this.props.user.accessToken}
                ></SignUp>
              )}
            ></Route>
            <Route
              path='/signin'
              render={(routeProps) => (
                <SignIn
                  {...routeProps}
                  setAccessToken={this.setAccessToken}
                  themeColor={THEME_COLORS[this.props.user.favTeam]}
                  accessToken={this.props.user.accessToken}
                ></SignIn>
              )}
            ></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    matchDetails: state.match,
    searchTerm: state.searchTerm,
    seasonFilter: state.seasonFilter,
    currentPage: state.pagination.currentPage,
    matchesCount: state.matches.count,
    matchesPerPage: state.pagination.matchesPerPage,
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
