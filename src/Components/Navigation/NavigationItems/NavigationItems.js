import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/upcomingmatches">Upcoming matches</NavigationItem>
        <NavigationItem link="/completedmatches">Completed matches</NavigationItem>
        <NavigationItem link="/addupcomingmatch">Add upcoming match</NavigationItem>
        <NavigationItem link="/addresultsforcompletedmatch">Add result for completed match</NavigationItem>
    </ul>
);

export default navigationItems;