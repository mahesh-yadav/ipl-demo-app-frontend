import React, { Component } from 'react';
import Match from './Match';

class Listmatches extends Component {
  showMatchDetails = (matchId) => {
    this.props.history.push(`/match/${matchId}`);
  };

  render() {
    const { matches } = this.props;
    const { data, isLoading, error } = matches;

    return (
      <div className='container'>
        <div className='row p-1 justify-content-center'>
          {isLoading && (
            <div className='d-flex align-items-center text-primary my-5'>
              <span className='font-weight-bold'>Loading Data</span>
              <span className='spinner-border ml-4'></span>
            </div>
          )}
          {error && (
            <div className='text-danger my-5' style={{ fontSize: '32px' }}>
              <span className='font-weight-bold'>{error.name}</span>
              {': '}
              <span>{error.message}</span>
            </div>
          )}
          {data.map((match) => {
            return (
              <Match
                key={match.id}
                matchData={match}
                showMatchDetails={this.showMatchDetails}
                themeColor={this.props.themeColor}
              ></Match>
            );
          })}
        </div>
        <div className='row'>
          <div className='col-12 d-flex justify-content-between'>
            <button
              className='btn btn-outline-secondary px-4 ml-3'
              disabled={this.props.currentPage === 1}
              onClick={this.props.goToPrevPage}
              style={{
                color: this.props.themeColor,
                borderColor: this.props.themeColor,
              }}
            >
              Prev
            </button>
            <button
              className='btn btn-outline-secondary px-4 mr-3'
              disabled={this.props.currentPage >= this.props.lastPage}
              onClick={this.props.goToNextPage}
              style={{
                color: this.props.themeColor,
                borderColor: this.props.themeColor,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Listmatches;
