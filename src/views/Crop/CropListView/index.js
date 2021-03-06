import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import CropCard from './CropCard';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  CropCard: {
    height: '100%'
  }
}));

const CropList = () => {
  const classes = useStyles();
  const [Crop] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Crop"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {Crop.map((Crop) => (
              <Grid
                item
                key={Crop.id}
                lg={4}
                md={6}
                xs={12}
              >
                <CropCard
                  className={classes.CropCard}
                  Crop={Crop}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default CropList;
