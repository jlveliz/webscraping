import { AppBar, Box, Container, Toolbar } from '@material-ui/core';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import CottageIcon from '@mui/icons-material/Cottage';
// React Router
import { useHistory } from 'react-router-dom';

// Mis importaciones
import logo from '../assets/images/logo-espol.svg';

const pages = [
  { name: 'Home', path: '/home', },
  { name: 'Contact', path: '/about', },
  { name: 'About', path: '/contact/:fechai/:fechaf/:temas', },
];


export const TopBar = () => {
  const history = useHistory();

  const handleClick = (path) => {
    console.log(path);
    history.push(path);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Image Brand Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <img src={logo} alt='Logo' width={'65%'} />
          </Box>
          {/* Text Brand Logo */}
          {/* <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        >
          LOGO
        </Typography> */}
          {/* <NavLink activeStyle={{ color: "red" }} to="/home">Home</NavLink>
            <NavLink activeStyle={{color: "red"}} to="/about">About</NavLink>
            <NavLink activeStyle={{color: "red"}} to="/contact">Contact</NavLink> */}
          {/* <NavLink activeStyle={{ color: "red" }} to="/service">Twitter</NavLink>&nbsp;
            <NavLink activeStyle={{ color: "red" }} to="/serviceFace">Facebook</NavLink>&nbsp;
            <NavLink activeStyle={{ color: "red" }} to="/serviceInstagram">Instagram</NavLink>&nbsp; */}
          {/* Login avatar */}
          {/* <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
