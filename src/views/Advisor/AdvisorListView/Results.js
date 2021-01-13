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

const Results = ({ className, Advisor, ...rest }) => {
  const classes = useStyles();
  const [selectedAdvisorIds, setSelectedAdvisorIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedAdvisorIds;

    if (event.target.checked) {
      newSelectedAdvisorIds = Advisor.map((Advisor) => Advisor.id);
    } else {
      newSelectedAdvisorIds = [];
    }

    setSelectedAdvisorIds(newSelectedAdvisorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAdvisorIds.indexOf(id);
    let newSelectedAdvisorIds = [];

    if (selectedIndex === -1) {
      newSelectedAdvisorIds = newSelectedAdvisorIds.concat(selectedAdvisorIds, id);
    } else if (selectedIndex === 0) {
      newSelectedAdvisorIds = newSelectedAdvisorIds.concat(selectedAdvisorIds.slice(1));
    } else if (selectedIndex === selectedAdvisorIds.length - 1) {
      newSelectedAdvisorIds = newSelectedAdvisorIds.concat(selectedAdvisorIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedAdvisorIds = newSelectedAdvisorIds.concat(
        selectedAdvisorIds.slice(0, selectedIndex),
        selectedAdvisorIds.slice(selectedIndex + 1)
      );
    }

    setSelectedAdvisorIds(newSelectedAdvisorIds);
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
                    checked={selectedAdvisorIds.length === Advisor.length}
                    color="primary"
                    indeterminate={
                      selectedAdvisorIds.length > 0
                      && selectedAdvisorIds.length < Advisor.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Advisor ID
                </TableCell>
                <TableCell>
                 
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
              {Advisor.slice(0, limit).map((Advisor) => (
                <TableRow
                  hover
                  key={Advisor.id}
                  selected={selectedAdvisorIds.indexOf(Advisor.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAdvisorIds.indexOf(Advisor.id) !== -1}
                      onChange={(event) => handleSelectOne(event, Advisor.id)}
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
                        {Advisor.AdvisorID}
                      </Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell>
                    {Advisor.email}
                  </TableCell>
                  <TableCell>
                    {`${Advisor.address.city}, ${Advisor.address.state}, ${Advisor.address.country}`}
                  </TableCell>
                  <TableCell>
                    {Advisor.phone}
                  </TableCell>
                  <TableCell>
                    {moment(Advisor.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                  <TableCell>
                    {Advisor.delete}
                  </TableCell>
                  <TableCell>
                    {Advisor.update}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={Advisor.length}
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
