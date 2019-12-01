import React, { Component } from 'react';
import { getFormattedDateString, getWinnerString } from '../helpers/helpers';
import lodash from 'lodash';

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

class MatchDetatils extends Component {
  componentDidMount() {
    this.props.fetchMatchDetails(this.props.match.params.matchId);
  }

  render() {
    const { matchDetails } = this.props;
    const { data, isLoading, error } = matchDetails;

    return (
      <div className='container'>
        {isLoading && (
          <div className='row p-1 justify-content-center'>
            <div className='d-flex align-items-center text-primary my-5'>
              <span className='font-weight-bold'>Loading Data</span>
              <span className='spinner-border ml-4'></span>
            </div>
          </div>
        )}
        {error && (
          <div className='row p-1 justify-content-center'>
            <div className='text-danger my-5' style={{ fontSize: '32px' }}>
              <span className='font-weight-bold'>{error.name}</span>
              {': '}
              <span>{error.message}</span>
            </div>
          </div>
        )}
        {!lodash.isEmpty(data) && (
          <div className='row p-1 justify-content-center'>
            <div className='col-12 col-md-10 col-lg-8 col-xl-6'>
              <div className='card' style={{ height: '100%' }}>
                <div
                  className='card-header text-center text-white font-weight-bold'
                  style={{
                    backgroundColor: this.props.themeColor,
                  }}
                >
                  {getFormattedDateString(data.date)}
                </div>
                <div className='card-body'>
                  <div
                    className='text-center border-bottom pb-2 font-weight-bold'
                    style={{
                      color: THEME_COLORS[data.winner],
                    }}
                  >
                    {getWinnerString(
                      data.winner,
                      data.win_by_runs,
                      data.win_by_wickets
                    )}
                  </div>
                  <div className='row justify-content-center align-items-center py-2'>
                    <div className='col-4 p-1'>
                      <img
                        src={require(`../logos/${data.team1
                          .split(' ')
                          .pop()
                          .toLowerCase()}.png`)}
                        alt={data.team1}
                        className='img-fluid'
                      ></img>
                    </div>
                    <div className='col-3 h4 font-weight-bold text-center'>
                      v/s
                    </div>
                    <div className='col-4 p-1'>
                      <img
                        src={require(`../logos/${data.team2
                          .split(' ')
                          .pop()
                          .toLowerCase()}.png`)}
                        alt={data.team2}
                        className='img-fluid'
                      ></img>
                    </div>
                  </div>
                  <div className='row mb-3 justify-content-between'>
                    <div className='col-5'>
                      <h5 className='text-center mt-3 d-none d-md-block'>
                        {data.team1}
                      </h5>
                    </div>
                    <div className='col-5'>
                      <h5 className='text-center mt-3 d-none d-md-block'>
                        {data.team2}
                      </h5>
                    </div>
                  </div>
                  <div className='text-center border-top pt-2'>
                    <i className='fas fa-map-marker-alt mr-3'></i>
                    {data.city}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-10 col-lg-8 col-xl-6 mt-3 mt-xl-0'>
              <div className='card' style={{ height: '100%' }}>
                <div
                  className='card-header text-center text-white font-weight-bold'
                  style={{
                    backgroundColor: this.props.themeColor,
                  }}
                >
                  Match Details
                </div>
                <div className='card-body'>
                  <p>
                    <span className='font-weight-bold'>Toss: </span>
                    {data.toss_winner}, who chose to {data.toss_decision}
                  </p>
                  <p>
                    <span className='font-weight-bold'>Man of the Match: </span>
                    {data.player_of_match}
                  </p>
                  <p>
                    <span className='font-weight-bold'>Venue: </span>
                    {data.venue}
                  </p>
                  <p>
                    <span className='font-weight-bold'>Umpires: </span>
                    {data.umpire1 +
                      ', ' +
                      data.umpire2 +
                      (data.umpire3 ? ', ' + data.umpire3 : '')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MatchDetatils;
