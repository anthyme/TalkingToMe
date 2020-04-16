import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

function WelcomeMsg() {
  return (
    <div>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Home
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Welcome on the home page, here you will be able to see and manage your
        talks.
      </Typography>
    </div>
  )
}
export default WelcomeMsg
