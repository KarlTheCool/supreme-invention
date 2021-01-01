import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import Title from './Title'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    width: '100%',
  },
}));

function createEmpty() {
  return { id: null, name: '-', price: '-', marketCap: '-' };
}

function KTable(props) {
  const classes = useStyles();

  let rows = Array(10).fill(createEmpty(), 0);
  if (props.data) {
    rows = [];
    for (let coin of props.data) {
      rows.push({ id: coin.id, name: coin.name, price: coin.price, marketCap: coin.market_cap });
    }
    rows.sort((a, b) => b.price - a.price );
  }

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Title>
        Table
      </Title>
      <Table className={classes.table} size="small" aria-label="Coin Data">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.name + i}>
              <TableCell component="th" scope="row">
                {row.name}&nbsp;{row.id ? `(${row.id})` : undefined}
              </TableCell>
              <TableCell align="right">${row.price.toString().toLocaleString()}</TableCell>
              <TableCell align="right">${row.marketCap.toString().toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => {
  return {data: state.data};
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(KTable)