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

const Results = ({ className, farmers, ...rest }) => {
  const classes = useStyles();
  const [selectedFarmerIds, setSelectedFarmerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedFarmerIds;

    if (event.target.checked) {
      newSelectedFarmerIds = farmers.map((farmer) => farmer.id);
    } else {
      newSelectedFarmerIds = [];
    }

    setSelectedFarmerIds(newSelectedFarmerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFarmerIds.indexOf(id);
    let newSelectedFarmerIds = [];

    if (selectedIndex === -1) {
      newSelectedFarmerIds = newSelectedFarmerIds.concat(selectedFarmerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedFarmerIds = newSelectedFarmerIds.concat(selectedFarmerIds.slice(1));
    } else if (selectedIndex === selectedFarmerIds.length - 1) {
      newSelectedFarmerIds = newSelectedFarmerIds.concat(selectedFarmerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFarmerIds = newSelectedFarmerIds.concat(
        selectedFarmerIds.slice(0, selectedIndex),
        selectedFarmerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedFarmerIds(newSelectedFarmerIds);
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
                    checked={selectedFarmerIds.length === farmers.length}
                    color="primary"
                    indeterminate={
                      selectedFarmerIds.length > 0
                      && selectedFarmerIds.length < farmers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  farmer_id
                </TableCell>
                <TableCell>
                  farmer_type_id
                </TableCell>
                <TableCell>
                  user_id
                </TableCell>
                {/* <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {farmers.slice(0, limit).map((farmers) => (
                <TableRow
                  hover
                  key={farmers.id}
                  selected={selectedFarmerIds.indexOf(farmers.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFarmerIds.indexOf(farmers.id) !== -1}
                      onChange={(event) => handleSelectOne(event, farmers.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                        {farmers.farmer_id}
                    
                    
                  </TableCell>
                  <TableCell>
                    {farmers.farmer_type_id}
                  </TableCell>
                  {/* <TableCell>
                    {`${farmers.address.city}, ${farmers.address.state}, ${farmers.address.country}`}
                  </TableCell> */}
                  <TableCell>
                    {farmers.user_id}
                  </TableCell>
                  {/* <TableCell>
                    {moment(farmers.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                   <TableCell>
                    {farmers.delete}
                  </TableCell>
                  <TableCell>
                    {farmers.update}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={farmers.length}
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
  farmers: PropTypes.array.isRequired
};

export default Results;
