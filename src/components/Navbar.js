import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" style={{ background: '#2196f3' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: 'white' }}>
          Referral Finder
        </Typography>
        <div>
        <Button component={Link} to='/sign-in' color='inherit'>
          Sign in 
        </Button>
          <Button component={Link} to="/job-posts" color="inherit">
            Job Posts
          </Button>
          <Button component={Link} to='/application' color='inherit'>
          Application
        </Button>
          <Button component={Link} to="/favorite-jobs" color="inherit">
            Favorite Jobs
          </Button>
          <Button component={Link} to="/profile" color="inherit">
            User Profile
          </Button>
          {/* Add authentication and branding components here */}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
