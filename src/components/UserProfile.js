import React, { Component } from 'react';

const VALUES = [
  'None',
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

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favTeam: 'None',
      showSelect: false,
    };
  }

  onFavTeamChange = (e) => {
    this.setState(
      {
        favTeam: e.target.value,
        showSelect: false,
      },
      () => {
        localStorage.setItem(this.props.user.userId, this.state.favTeam);
        this.props.onFavTeamChange(this.state.favTeam);
      }
    );
  };

  toggleSelect = () => {
    this.setState({
      showSelect: !this.state.showSelect,
    });
  };

  componentDidMount() {
    this.props.getUserDetails(
      this.props.user.userId,
      this.props.user.accessToken
    );

    let favTeam = localStorage.getItem(this.props.user.userId);
    if (favTeam) {
      this.setState(
        {
          favTeam,
        },
        () => {
          this.props.onFavTeamChange(favTeam);
        }
      );
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className='container w-100'>
        {user.isLoading && (
          <div className='row p-1 justify-content-center'>
            <div className='d-flex align-items-center text-primary my-5'>
              <span className='font-weight-bold'>Loading Data</span>
              <span className='spinner-border ml-4'></span>
            </div>
          </div>
        )}
        {user.error && (
          <div className='row p-1 justify-content-center'>
            <div className='text-danger my-5' style={{ fontSize: '32px' }}>
              <span className='font-weight-bold'>{user.error.name}</span>
              {': '}
              <span>{user.error.message}</span>
            </div>
          </div>
        )}
        {!user.isLoading && !user.error && (
          <div className='row justify-content-center p-2'>
            <div className='col-12 col-md-8 col-lg-6 col-xl-4'>
              <div className='card'>
                <div
                  className='card-header text-center text-white font-weight-bold'
                  style={{ backgroundColor: this.props.themeColor }}
                >
                  User Details
                </div>
                <div className='card-body'>
                  <p>
                    <span className='font-weight-bold'>Name: </span>
                    {user.name}
                  </p>
                  <p>
                    <span className='font-weight-bold'>Email: </span>
                    {user.email}
                  </p>
                  <p>
                    <span className='font-weight-bold'>Favorite Team: </span>
                    {this.props.user.favTeam}
                  </p>

                  <div className='mt-5 border-top pt-3'>
                    <button
                      className='btn btn- btn-outline-secondary mb-4'
                      onClick={this.toggleSelect}
                      style={{
                        color: this.props.themeColor,
                        borderColor: this.props.themeColor,
                      }}
                    >
                      {this.state.favTeam === 'None'
                        ? 'Select Favorite Team'
                        : 'Change Favorite Team'}
                    </button>
                    {this.state.showSelect && (
                      <form>
                        <div className='form-group row justify-content-center'>
                          <select
                            value={this.state.favTeam}
                            onChange={this.onFavTeamChange}
                            className='form-control col-10 col-sm-8'
                          >
                            {VALUES.map((value) => {
                              return (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
