import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/upcomingmatches">Upcoming matches</NavigationItem>
        <NavigationItem link="/upcomingRugbymatches">Upcoming rugby matches</NavigationItem>
        <NavigationItem link="/completedmatches">Completed matches</NavigationItem>
        <NavigationItem link="/predictionResults">Prediction Results</NavigationItem>
        {(props.isAuthenticated && props.admin) ? <NavigationItem link="/addupcomingmatch">Add upcoming match</NavigationItem> : null }
        {(props.isAuthenticated) ? <NavigationItem link="/yourpredictions">Your Predictions</NavigationItem> : null }
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;