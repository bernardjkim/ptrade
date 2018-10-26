import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    container: {
        width: '100%',
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
    containerTable: {
        width: '100%',
    },
    table: {
        width: '100%',
        overflowX: 'auto',
    },
});

const Portfolio = ({ classes, data, portfolioValue }) => (
    <div className={classes.container}>
        <Typography variant="title" gutterBottom>${portfolioValue.toFixed(2)}</Typography>
        <div className={classes.containerTable}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                    {data.map((d, key) => (
                        <TableRow key={key} className={classes.tableRow}>
                            <TableCell component="th" scope="row" variant="head">
                                {d['symbol']} ({d['shares']})
                            </TableCell>
                            <TableCell component="td" scope="row" numeric>${d['price_per_share'].toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
);

Portfolio.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    portfolioValue: PropTypes.number.isRequired,
};

export default withStyles(styles)(Portfolio);


