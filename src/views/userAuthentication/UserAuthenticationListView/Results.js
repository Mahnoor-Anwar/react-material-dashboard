import React, { useState } from 'react';
import clsx from 'clsx';
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

const Results = ({ className, userAuthentication, ...rest }) => {
  const classes = useStyles();
  const [selecteduserAuthenticationIds, setSelecteduserAuthenticationIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedUserAuthenticationIds;

    if (event.target.checked) {
      newSelectedUserAuthenticationIds = userAuthentication.map((userAuthentication) => userAuthentication.id);
    } else {
      newSelectedUserAuthenticationIds = [];
    }

    setSelecteduserAuthenticationIds(newSelectedUserAuthenticationIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selecteduserAuthenticationIds.indexOf(id);
    let newSelectedUserAuthenticationIds = [];

    if (selectedIndex === -1) {
      newSelectedUserAuthenticationIds = newSelectedUserAuthenticationIds.concat(selecteduserAuthenticationIds, id);
    } else if (selectedIndex === 0) {
      newSelectedUserAuthenticationIds = newSelectedUserAuthenticationIds.concat(selecteduserAuthenticationIds.slice(1));
    } else if (selectedIndex === selecteduserAuthenticationIds.length - 1) {
      newSelectedUserAuthenticationIds = newSelectedUserAuthenticationIds.concat(selecteduserAuthenticationIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUserAuthenticationIds = newSelectedUserAuthenticationIds.concat(
        selecteduserAuthenticationIds.slice(0, selectedIndex),
        selecteduserAuthenticationIds.slice(selectedIndex + 1)
      );
    }

    setSelecteduserAuthenticationIds(newSelectedUserAuthenticationIds);
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
                    checked={selecteduserAuthenticationIds.length === userAuthentication.length}
                    color="primary"
                    indeterminate={
                      selecteduserAuthenticationIds.length > 0
                      && selecteduserAuthenticationIds.length < userAuthentication.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  User Id
                </TableCell>
                <TableCell>
                  Email Id
                </TableCell>
                <TableCell>
                  Mobile no
                </TableCell>
                <TableCell>
                  Role Id
                </TableCell>
                <TableCell>
                  
                </TableCell>
                <TableCell>
                  
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {userAuthentication.slice(0, limit).map((userAuthentication) => (
                <TableRow
                  hover
                  key={userAuthentication.id}
                  selected={selecteduserAuthenticationIds.indexOf(userAuthentication.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selecteduserAuthenticationIds.indexOf(userAuthentication.id) !== -1}
                      onChange={(event) => handleSelectOne(event, userAuthentication.id)}
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
                        {userAuthentication.user_Id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {userAuthentication.email_id}
                  </TableCell>
                  {/* <TableCell>
                    {customer.products}
                  </TableCell> */}
                  {/* <TableCell>
                    {`${userAuthentication.Product.product1},${userAuthentication.Product.product2},${userAuthentication.Product.product3},${userAuthentication.Product.product4}`}
                  </TableCell> */}
                  <TableCell>
                    {userAuthentication.mobile_no}
                  </TableCell>
                  {/* <TableCell>
                    {moment(userAuthentication.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                  <TableCell>
                    {userAuthentication.role_id}
                  </TableCell>
                  <TableCell>
                    {userAuthentication.delete}
                  </TableCell>
                  <TableCell>
                    {userAuthentication.update}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={userAuthentication.length}
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
  userAuthentication: PropTypes.array.isRequired
};

export default Results;
