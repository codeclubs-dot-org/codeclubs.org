import React from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "components/Page";
import ClubCard from "components/ClubCard";
import PersonCard from "components/PersonCard";
import Toolbar from "components/HomePageToolbar";
import useGlobal from "store";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  clubCard: {
    height: "100%",
  },
}));

const ClubList = () => {
  const classes = useStyles();
  // eslint-disable-next-line
  const [globalState, globalActions] = useGlobal();
  const { activeClubs } = globalState;

  return (
    <Page
      className={classes.root}
      title="Team View - CodeClubs.org - Albuquerque NM USA"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {activeClubs.map((club) => (
              <Grid item key={club.id} lg={4} md={6} xs={12}>
                <ClubCard className={classes.clubCard} club={club} />
              </Grid>
            ))}
            <Grid item xl={2} lg={4} md={6} xs={12}>
              <PersonCard
                className={classes.clubCard}
                club={{
                  startDate: "Dec 01, 2016",
                  description: "Paul Perez",
                  media:
                    "https://codeclubs-public.s3-us-west-2.amazonaws.com/Board+Member+%2B+Facilitator+Headshots/Avatar.jpg",
                  title: "Treasurer",
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export default ClubList;
