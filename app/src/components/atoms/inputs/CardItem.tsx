import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = (isSelected:boolean) => makeStyles({
  root: {
    maxWidth: 345,
    cursor: 'pointer',
    textAlign:'center',
    margin: '0.5em',
    opacity: `${isSelected ? '100%' : '50%'}`,
    '&:hover': {
      background: "#3f51b5",
   },
  },
  media: {
    height: 140,
  }
});

export default function MediaCard({icon, title, description, isSelected, onClick}: any) {
  const classes = useStyles(isSelected)();

  return (
    <Card className={classes.root} onClick={onClick}>
      <CardActionArea>
        {icon}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
