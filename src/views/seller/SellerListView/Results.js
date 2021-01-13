import React, { useState } from 'react';
import clsx from 'clsx';
// import Button from './Button';
import Switch from './Switch';
import PropTypes from 'prop-types';
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

const Results = ({ className, sellers, ...rest }) => {
  const classes = useStyles();
  const [selectedSellerIds, setSelectedSellerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedSellerIds;

    if (event.target.checked) {
      newSelectedSellerIds = sellers.map((seller) => seller.id);
    } else {
      newSelectedSellerIds = [];
    }

    setSelectedSellerIds(newSelectedSellerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSellerIds.indexOf(id);
    let newSelectedSellerIds = [];

    if (selectedIndex === -1) {
      newSelectedSellerIds = newSelectedSellerIds.concat(selectedSellerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedSellerIds = newSelectedSellerIds.concat(selectedSellerIds.slice(1));
    } else if (selectedIndex === selectedSellerIds.length - 1) {
      newSelectedSellerIds = newSelectedSellerIds.concat(selectedSellerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSellerIds = newSelectedSellerIds.concat(
        selectedSellerIds.slice(0, selectedIndex),
        selectedSellerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSellerIds(newSelectedSellerIds);
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
                    checked={selectedSellerIds.length === sellers.length}
                    color="primary"
                    indeterminate={
                      selectedSellerIds.length > 0
                      && selectedSellerIds.length < sellers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  uId
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
              {sellers.slice(0, limit).map((seller) => (
                <TableRow
                  hover
                  key={seller.id}
                  selected={selectedSellerIds.indexOf(seller.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSellerIds.indexOf(seller.id) !== -1}
                      onChange={(event) => handleSelectOne(event, seller.id)}
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
                        src={seller.avatarUrl}
                      >
                        {getInitials(seller.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {seller.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                 
                  </TableCell>
                  <TableCell>
                    {`${seller.Product.product1}, ${seller.Product.product2}, ${seller.Product.product3} , ${seller.Product.product4}`}
                  </TableCell>
                  <TableCell>
                  {seller.status}
                    <Switch />
                  </TableCell>
                  <TableCell>
                    {moment(seller.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {seller.delete}
                  </TableCell>
                  <TableCell>
                    {seller.update}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={sellers.length}
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
  sellerr: PropTypes.array.isRequired
};

export default Results;
