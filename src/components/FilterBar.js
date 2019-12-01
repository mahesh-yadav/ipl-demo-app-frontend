import React, { Component } from 'react';
import styles from '../styles/filterbar.module.css';

const SEASONS = [
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
];

const VALUES = [
  'Sunrisers Hyderabad',
  'Mumbai Indians',
  'Gujarat Lions',
  'Royal Challengers Bangalore',
  'Rising Pune Supergiant',
  'Kolkata Knight Riders',
  'Delhi Daredevils',
  'Kings XI Punjab',
  'Chennai Super Kings',
  'Rajasthan Royals',
  'Deccan Chargers',
  'Kochi Tuskers Kerala',
  'Pune Warriors',
  'Delhi Capitals',
];

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      filterValue: 'ALL',
      showSuggestions: false,
      filteredSearchSuggestions: [],
    };

    this.searchInputRef = React.createRef();
  }

  onSearchChange = (e) => {
    let show = e.target.value.length > 0 ? true : false;

    let values = VALUES.filter((value) => {
      return value.toLowerCase().includes(e.target.value);
    });

    this.setState({
      searchTerm: e.target.value,
      showSuggestions: show,
      filteredSearchSuggestions: values,
    });
  };

  setSearchTerm = (value) => {
    this.setState(
      {
        searchTerm: value,
        showSuggestions: false,
      },
      () => {
        this.searchInputRef.current.focus();
      }
    );
  };

  onSearchSubmit = (e) => {
    e.preventDefault();

    let values = VALUES.filter((value) => {
      return value.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    });

    let value;
    if (values.length === 0 || !this.state.searchTerm) {
      value = '';
    } else if (values.length > 0) {
      value = values[0];
    }

    this.setState(
      {
        showSuggestions: false,
        filteredSearchSuggestions: [],
      },
      () => this.props.getSearchResults(value)
    );
  };

  onFilterChange = (e) => {
    this.setState(
      {
        filterValue: e.target.value,
      },
      () => this.props.setSeasonFilter(this.state.filterValue)
    );
  };

  render() {
    return (
      <div className='container'>
        <div className='row p-3 justify-content-center mx-n2'>
          <div
            className='card col-12 col-sm-10 col-md-8 col-lg-12 col-xl-10'
            style={{
              borderColor: this.props.themeColor,
            }}
          >
            <div className='row'>
              <div className='col-12 col-lg-6 p-1'>
                <form onSubmit={this.onSearchSubmit}>
                  <div className='form-group position-relative'>
                    <label htmlFor='search' className='col'>
                      Search by team:
                    </label>
                    <input
                      id='search'
                      type='text'
                      className='form-control col-10 mx-auto border rounded-pill'
                      value={this.state.searchTerm}
                      onChange={this.onSearchChange}
                      ref={this.searchInputRef}
                    ></input>
                    {this.state.showSuggestions && (
                      <ul
                        className='list-group col-10 mx-auto mt-2 position-absolute'
                        style={{
                          left: '10%',
                          zIndex: 10,
                        }}
                      >
                        {this.state.filteredSearchSuggestions.map((value) => {
                          return (
                            <li
                              key={value}
                              className={`list-group-item py-1 px-2 ${styles.listitem}`}
                              onClick={() => this.setSearchTerm(value)}
                            >
                              {value}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </form>
              </div>
              <div className='col-12 col-lg-6 p-1 pt-2'>
                <form>
                  <div className='form-group'>
                    <label htmlFor='season' className='col'>
                      Filter by season:
                    </label>
                    <select
                      id='season'
                      className='form-control col-5 mx-auto'
                      value={this.state.filterValue}
                      onChange={this.onFilterChange}
                    >
                      <option value='ALL'>ALL</option>
                      {SEASONS.map((season) => {
                        return (
                          <option key={season} value={season}>
                            {season}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterBar;
