import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 360,
    maxHeight: 360,
    borderRadius: "1em",
    backgroundColor: "#aeda4e",
    "&:after": {
      //TO-DO add dark blue rectangle code here
    },
  },
  media: {
    borderRadius: "50%",
    width: 180,
    height: 180,
    margin: "auto",
    marginTop: "3em",
    marginBottom: "1em",
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { name, title, imgLink, color } = props;
  let cardColor;
  switch (color) {
    case "blue":
      cardColor = classes.blue;
      break;
    case "pink":
      cardColor = classes.pink;
      break;
    case "green":
      cardColor = classes.green;
      break;
    case "yellow":
      cardColor = classes.yellow;
      break;
  }
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={imgLink}
        title={name + " | " + title}
      />
      <CardContent>
        <Typography align="center" variant="h4">
          {name}
        </Typography>
        <Typography align="center" variant="h5">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
