import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
      },
}))
function Header() {
  const classes = useStyles()
  return (
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          Menu TalkingToMe
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default Header
