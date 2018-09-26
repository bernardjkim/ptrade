import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    containerTable: {
        width: '100%',
    },
    paper: {
        height: '100%',
        width: '100%',
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
    table: {
        width: '100%',
        overflowX: 'auto',
    },
});

function renderTableRows(data) {

}

// TODO: Show current shares for each stock instead of a list of transactions.

const TransactionList = ({ classes, data, transactions }) => (
    <Paper className={classes.paper} elevation={1}>
        <Typography variant="title" gutterBottom>Transaction List</Typography>
        <div className={classes.containerTable}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell numeric>Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                    {renderTableRows(data)}
                    {Object.keys(data).map(key => (
                        <TableRow key={key} className={classes.tableRow}>
                            <TableCell component="th" scope="row" variant="head">
                                {data[key]['symbol']}
                            </TableCell>
                            <TableCell component="td" scope="row" numeric>{data[key]['quantity']}</TableCell>
                        </TableRow>
                    ))}
                    {/* {transactions.map((t, key) => {
                        return (
                            <TableRow key={key} className={classes.tableRow}>
                                <TableCell component="th" scope="row" variant="head">
                                    {t['stock']['symbol']}
                                </TableCell>
                                <TableCell component="td" scope="row" numeric>{t['transaction']['quantity']}</TableCell>
                            </TableRow>
                        );
                    })} */}

                </TableBody>
            </Table>
        </div>
    </Paper>
);

TransactionList.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
};

export default withStyles(styles)(TransactionList);


