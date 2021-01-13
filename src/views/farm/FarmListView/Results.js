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

const Results = ({ className, farm, ...rest }) => {
  const classes = useStyles();
  const [selectedfarmIds, setSelectedfarmIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedFarmIds;

    if (event.target.checked) {
      newSelectedFarmIds = farm.map((farm) => farm.id);
    } else {
      newSelectedFarmIds = [];
    }

    setSelectedfarmIds(newSelectedFarmIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedfarmIds.indexOf(id);
    let newSelectedFarmIds = [];

    if (selectedIndex === -1) {
      newSelectedFarmIds = newSelectedFarmIds.concat(selectedfarmIds, id);
    } else if (selectedIndex === 0) {
      newSelectedFarmIds = newSelectedFarmIds.concat(selectedfarmIds.slice(1));
    } else if (selectedIndex === selectedfarmIds.length - 1) {
      newSelectedFarmIds = newSelectedFarmIds.concat(selectedfarmIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFarmIds = newSelectedFarmIds.concat(
        selectedfarmIds.slice(0, selectedIndex),
        selectedfarmIds.slice(selectedIndex + 1)
      );
    }

    setSelectedfarmIds(newSelectedFarmIds);
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
                    checked={selectedfarmIds.length === farm.length}
                    color="primary"
                    indeterminate={
                      selectedfarmIds.length > 0
                      && selectedfarmIds.length < farm.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  farm ID
                </TableCell>
                <TableCell>
                 farmer ID
                </TableCell>
                <TableCell>
                  Totalacre
                </TableCell>
                <TableCell>
                  
                </TableCell>
                <TableCell>
                 
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {farm.slice(0, limit).map((farm) => (
                <TableRow
                  hover
                  key={farm.id}
                  selected={selectedfarmIds.indexOf(farm.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedfarmIds.indexOf(farm.id) !== -1}
                      onChange={(event) => handleSelectOne(event, farm.id)}
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
                        src={Advisor.avatarUrl}
                      >
                        {getInitials(Advisor.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {farm.farmID}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {farm.farmerID}
                  </TableCell>
                  {/* <TableCell>
                    {`${Advisor.address.city}, ${Advisor.address.state}, ${Advisor.address.country}`}
                  </TableCell> */}
                  <TableCell>
                    {farm.totalacre}
                  </TableCell>
                  {/* <TableCell>
                    {moment(Advisor.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                  <TableCell>
                    {farm.delete}
                  </TableCell>
                  <TableCell>
                    {farm.update}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={farm.length}
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
  Advisor: PropTypes.array.isRequired
};

export default Results;
