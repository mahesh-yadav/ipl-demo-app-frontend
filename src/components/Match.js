import React from 'react';
import { getFormattedDateString, getWinnerString } from '../helpers/helpers';

function Match({ matchData, showMatchDetails, themeColor }) {
  return (
    <div className='col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 mb-4'>
      <div
        className='card mb-3'
        onClick={() => showMatchDetails(matchData.id)}
        style={{ height: '100%' }}
      >
        <div
          className='card-header text-white  font-weight-bold'
          style={{ backgroundColor: themeColor }}
        >
          {getFormattedDateString(matchData.date)}
        </div>
        <div className='card-body row justify-content-center align-items-center py-2'>
          <div className='col-4 p-1'>
            <img
              src={require(`../logos/${matchData.team1
                .split(' ')
                .pop()
                .toLowerCase()}.png`)}
              alt={matchData.team1}
              className='img-fluid'
            ></img>
          </div>
          <div className='col-3 h4 font-weight-bold text-center'>v/s</div>
          <div className='col-4 p-1'>
            <img
              src={require(`../logos/${matchData.team2
                .split(' ')
                .pop()
                .toLowerCase()}.png`)}
              alt={matchData.team2}
              className='img-fluid'
            ></img>
          </div>
        </div>
        <div
          className='card-footer text-center text-white  font-weight-bold'
          style={{ backgroundColor: themeColor }}
        >
          {getWinnerString(
            matchData.winner,
            matchData.win_by_runs,
            matchData.win_by_wickets
          )}
        </div>
      </div>
    </div>
  );
}

export default Match;
