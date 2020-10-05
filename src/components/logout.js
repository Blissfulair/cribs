import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from './firebase'
const styles = () => ({
    item:{
        marginLeft:10
    }
});

const LogoutModal=({logout, logoutRef, setLogout,classes})=>{
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setLogout(false);
    }
  }
  const closeLogout = (event) => {
    if (logoutRef.current && logoutRef.current.contains(event.target)) {
      return;
    }

    setLogout(false);
  };

  return (
      <div>
        <Popper open={logout} anchorEl={logoutRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={closeLogout}>
                  <MenuList autoFocusItem={logout} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={closeLogout}><PersonOutlineOutlinedIcon className={classes.item}/> Profile</MenuItem>
                    <MenuItem onClick={closeLogout}><SettingsOutlinedIcon className={classes.item}/> Settings</MenuItem>
                    <MenuItem onClick={(e)=>{closeLogout(e); firebase.logout()}}><ExitToAppIcon className={classes.item}/> Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}

export default withStyles(styles)(LogoutModal)