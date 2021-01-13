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

const Results = ({ className, cases, ...rest }) => {
  const classes = useStyles();
  const [selectedcasesIds, setSelectedcasesIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCaseIds;

    if (event.target.checked) {
      newSelectedCaseIds = cases.map((cases) => cases.id);
    } else {
      newSelectedCaseIds = [];
    }

    setSelectedcasesIds(newSelectedCaseIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedcasesIds.indexOf(id);
    let newSelectedCaseIds = [];

    if (selectedIndex === -1) {
      newSelectedCaseIds = newSelectedCaseIds.concat(selectedcasesIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCaseIds = newSelectedCaseIds.concat(selectedcasesIds.slice(1));
    } else if (selectedIndex === selectedcasesIds.length - 1) {
      newSelectedCaseIds = newSelectedCaseIds.concat(selectedcasesIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCaseIds = newSelectedCaseIds.concat(
        selectedcasesIds.slice(0, selectedIndex),
        selectedcasesIds.slice(selectedIndex + 1)
      );
    }

    setSelectedcasesIds( newSelectedCaseIds);
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
                    checked={selectedcasesIds.length === cases.length}
                    color="primary"
                    indeterminate={
                      selectedcasesIds.length > 0
                      && selectedcasesIds.length < cases.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  roleId
                </TableCell>
                <TableCell>
                  role
                </TableCell>
                <TableCell>
                  
                </TableCell>
                <TableCell>
                  
                </TableCell>
                <TableCell>
                  
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {cases.slice(0, limit).map((cases) => (
                <TableRow
                  hover
                  key={cases.id}
                  selected={selectedcasesIds.indexOf(cases.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedcasesIds.indexOf(cases.id) !== -1}
                      onChange={(event) => handleSelectOne(event, cases.id)}
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
                        {cases.roleId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {cases.role}
                  </TableCell>
                  {/* <TableCell>
                    {customer.products}
                  </TableCell> */}
                  {/* <TableCell>
                    {`${cases.Product.product1},${cases.Product.product2},${cases.Product.product3},${cases.Product.product4}`}
                  </TableCell>
                  <TableCell>
                    {cases.Status}
                  </TableCell>
                  <TableCell>
                    {moment(cases.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                  <TableCell>
                    {cases.delete}
                  </TableCell>
                  <TableCell>
                    {cases.update}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={cases.length}
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
