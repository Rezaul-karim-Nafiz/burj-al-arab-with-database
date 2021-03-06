import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../App';

const PrivetRouter = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                   loggedInUser.email ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default PrivetRouter;