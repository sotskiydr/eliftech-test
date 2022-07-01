import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import { useLogoutMutation } from "../../services/ReduxService";
import {changeStateCurrentUser, onChangeShop} from "../../store/reducers/ActionCreators";
import CurrentUser from './CurrentUser/CurrentUser'
import {NavLink} from "react-router-dom";

export default function MenuAppBar() {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { token } = useAppSelector(state => state.AuthSlice);
    const [logout] = useLogoutMutation()

    const handleClick = async () => {
        dispatch(changeStateCurrentUser(false))
        setAnchorEl(null);
        await logout('')
        dispatch(onChangeShop())
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
      <Box sx={{ flexGrow: 1, mb: 5 }}>
          <AppBar position="static">
              <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Box sx={{ flexGrow: 1, display: 'flex' }}>
                      <Typography variant="h5" component="h2" sx={{ mr: '30px' }} >
                          <NavLink to="/shop">Shop</NavLink>
                      </Typography>
                      <Typography variant="h5" component="h2" sx={{ mr: '30px' }}>
                          <NavLink to="/cart">Shopping Cart</NavLink>
                      </Typography>
                      <Typography variant="h5" component="h2">
                          <NavLink to="/history">History orders</NavLink>
                      </Typography>
                  </Box>
                  {token && <CurrentUser />}
                    <div>
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleMenu}
                          color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClick}>Logout</MenuItem>
                        </Menu>
                    </div>
              </Toolbar>
          </AppBar>
      </Box>
    );
}
