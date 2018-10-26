import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
});

class ChartTabs extends React.Component {
    render() {
        const { classes, changeTimeFrame, timeFrame } = this.props;
        const labels = ["1d", "1m", "6m", "1y", "5y",];

        return (
            <div className={classes.root}>
                <Tabs
                    value={timeFrame}
                    onChange={changeTimeFrame}
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                >
                    {labels.map((label, key) => (
                        <Tab
                            key={key}
                            disableRipple
                            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                            label={label}
                        />
                    ))}
                </Tabs>
            </div>
        );
    }
}

ChartTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    changeTimeFrame: PropTypes.func.isRequired,
    timeFrame: PropTypes.number.isRequired,
};

export default withStyles(styles)(ChartTabs);