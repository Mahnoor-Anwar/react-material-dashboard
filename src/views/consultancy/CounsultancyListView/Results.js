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

const Results = ({ className, consultancy, ...rest }) => {
  const classes = useStyles();
  const [selectedCounsultancyIds, setSelectedCounsultancyIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCounsultancyIds;

    if (event.target.checked) {
      newSelectedCounsultancyIds = consultancy.map((consultancy) => consultancy.id);
    } else {
      newSelectedCounsultancyIds = [];
    }

    setSelectedCounsultancyIds(newSelectedCounsultancyIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCounsultancyIds.indexOf(id);
    let newSelectedCounsultancyIds = [];

    if (selectedIndex === -1) {
      newSelectedCounsultancyIds = newSelectedCounsultancyIds.concat(selectedCounsultancyIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCounsultancyIds = newSelectedCounsultancyIds.concat(selectedCounsultancyIds.slice(1));
    } else if (selectedIndex === selectedCounsultancyIds.length - 1) {
      newSelectedCounsultancyIds = newSelectedCounsultancyIds.concat(selectedCounsultancyIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCounsultancyIds = newSelectedCounsultancyIds.concat(
        selectedCounsultancyIds.slice(0, selectedIndex),
        selectedCounsultancyIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCounsultancyIds(newSelectedCounsultancyIds);
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
                    checked={selectedCounsultancyIds.length === consultancy.length}
                    color="primary"
                    indeterminate={
                      selectedCounsultancyIds.length > 0
                      && selectedCounsultancyIds.length < consultancy.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                consultancyId
                </TableCell>
                <TableCell>
                advisorId
                </TableCell>
                <TableCell>
                caseId
                </TableCell>
                <TableCell>
                consultancyCol
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {consultancy.slice(0, limit).map((consultancy) => (
                <TableRow
                  hover
                  key={consultancy.id}
                  selected={selectedCounsultancyIds.indexOf(consultancy.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCounsultancyIds.indexOf(consultancy.id) !== -1}
                      onChange={(event) => handleSelectOne(event, consultancy.id)}
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
                        src={consultancy.avatarUrl}
                      >
                        {getInitials(consultancy.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {consultancy.consultancyId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {consultancy.advisorId}
                  </TableCell>
                  {/* <TableCell>
                    {`${consultancy.address.city}, ${consultancy.address.state}, ${consultancy.address.country}`}
                  </TableCell> */}
                  <TableCell>
                    {consultancy.caseId}
                  </TableCell>
                  <TableCell>
                    {consultancy.consultancyCol}
                  </TableCell>
                  {/* <TableCell>
                    {moment(consultancy.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                   <TableCell>
                    {consultancy.delete}
                  </TableCell>
                  <TableCell>
                    {consultancy.update}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={consultancy.length}
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
  consultancy: PropTypes.array.isRequired
};

export default Results;
