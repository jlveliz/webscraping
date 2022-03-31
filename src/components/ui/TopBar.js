import { Toolbar } from '@material-ui/core';
import { Typography } from '@mui/material';
// React Router
// import { useHistory } from 'react-router-dom';

// Mis importaciones
import logo from '../../assets/images/logo-espol.svg';

// const pages = [
//     { name: 'Home', path: '/home', },
//     { name: 'Contact', path: '/about', },
//     { name: 'About', path: '/contact/:fechai/:fechaf/:temas', },
// ];


export const TopBar = () => {
    // const history = useHistory();

    // const handleClick = (path) => {
    //     console.log(path);
    //     history.push(path);
    // }

    return (
        <Toolbar>
            <Typography
                variant="h6"
                noWrap
                component="div"
            >
                <img src={logo} alt='Logo' width={'50%'} />
            </Typography>
        </Toolbar>
    )
}
