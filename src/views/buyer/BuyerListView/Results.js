import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Switch from './Switch';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, buyer, ...rest }) => {
  const classes = useStyles();
  const [selectedbuyerIds, setSelectedbuyerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedBuyerIds;

    if (event.target.checked) {
      newSelectedBuyerIds = buyer.map((buyer) => buyer.id);
    } else {
      newSelectedBuyerIds = [];
    }

    setSelectedbuyerIds(newSelectedBuyerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedbuyerIds.indexOf(id);
    let newSelectedBuyerIds = [];

    if (selectedIndex === -1) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(selectedbuyerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(selectedbuyerIds.slice(1));
    } else if (selectedIndex === selectedbuyerIds.length - 1) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(selectedbuyerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedBuyerIds = newSelectedBuyerIds.concat(
        selectedbuyerIds.slice(0, selectedIndex),
        selectedbuyerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedbuyerIds(newSelectedBuyerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedbuyerIds.length === buyer.length}
                    color="primary"
                    indeterminate={
                      selectedbuyerIds.length > 0
                      && selectedbuyerIds.length < buyer.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  UId
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Product
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buyer.slice(0, limit).map((buyer) => (
                <TableRow
                  hover
                  key={buyer.id}
                  selected={selectedbuyerIds.indexOf(buyer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedbuyerIds.indexOf(buyer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, buyer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      {/* <Avatar
                        className={classes.avatar}
                        src={customer.avatarUrl}
                      >
                        {getInitials(customer.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {buyer.uId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {buyer.Name}
                  </TableCell>
                  {/* <TableCell>
                    {customer.products}
                  </TableCell> */}
                  <TableCell>
                    {`${buyer.Product.product1},${buyer.Product.product2},${buyer.Product.product3},${buyer.Product.product4}`}
                  </TableCell>
                  <TableCell>
                    {buyer.Status}
                    <Switch />
                  </TableCell>
                  <TableCell>
                    {moment(buyer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {buyer.delete}
                  </TableCell>
                  <TableCell>
                    {buyer.update}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={buyer.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
