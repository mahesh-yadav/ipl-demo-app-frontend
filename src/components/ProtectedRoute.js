import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({
  component: Component,
  user,
  getUserDetails,
  onFavTeamChange,
  themeColor,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return user.accessToken ? (
          <Component
            {...routeProps}
            user={user}
            getUserDetails={getUserDetails}
            onFavTeamChange={onFavTeamChange}
            themeColor={themeColor}
          ></Component>
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: {
                from: routeProps.location,
              },
            }}
          ></Redirect>
        );
      }}
    ></Route>
  );
}

export default ProtectedRoute;
