import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory
} from 'react-router-dom';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Mis importaciones
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import logo from '../assets/images/logo-espol.svg';
import { leftMenuItems } from '../helpers/leftMenu';
import { Twitter } from '../pages/services/Twitter';
import { Facebook } from '../pages/services/Facebook';
import { Instagram } from '../pages/services/Instagram';

const drawerWidth = 240;

export const AppRouter = () => {
    const history = useHistory();

    const handleClick = (path) => {
        console.log(path);
        history.push(`${path}`);
    }

    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            <img src={logo} alt='Logo' width={'50%'} />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <Divider
                                textAlign="left"
                                sx={{ pt: 2, fontWeight: 'bold' }}
                            >Estadísticas</Divider>

                            {leftMenuItems.map((menu, index) => (
                                <ListItem button
                                    key={index}
                                    onClick={() => (handleClick(menu.url))}
                                >
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    {/* <ListItemText primary={menu.title} /> */}
                                    {menu.title}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                    <Toolbar />
                    <Switch>

                        <Route path={'/home'} component={Home} />
                        <Route path={'/about'} component={About} />
                        <Route path={'/contact/:fechai/:fechaf/:temas'} component={Contact} />
                        <Route path={'/twitter'} component={Twitter} />
                        <Route path={'/facebook'} component={Facebook} />
                        <Route path={'/instagram'} component={Instagram} />
                        {/* <Route path={'/mostrararchivos/:replies'} component={MostrarArchivos} /> */}
                        {/* <Route path={'/mostrarresultados/:lista_graficos'} component={MostrarResultados} /> */}
                        <Route path={'*'} component={NotFound} />
                    </Switch>
                </Box>
            </Box>
        </Router>
    );
}


// import {
//     BrowserRouter as Router,
//     Route,
//     Switch
// } from 'react-router-dom';
// import { Box, CssBaseline } from '@material-ui/core';

// // import Service from '../pages/Service/Service';
// // import ServiceFace from '../pages/Service/ServiceFace';
// // import ServiceInstagram from '../pages/Service/ServiceInstagram';
// // import MostrarArchivos from '../pages/Service/MostrarArchivos';
// // import MostrarResultados from '../pages/Service/MostrarResultados';
// import Home from '../pages/Home';
// import About from '../pages/About';
// import Contact from '../pages/Contact';
// import NotFound from '../pages/NotFound';
// import { TopBar } from '../components/ui/TopBar';
// import { LeftSideBar } from '../components/ui/LeftSideBar';


// export const AppRouter = () => {
//     return (
//         <Router>
//             <Box sx={{ display: 'flex' }}>
//                 <CssBaseline />
//                 {/* Top menu */}
//                 <TopBar />
//                 {/* Left menu */}
//                 <LeftSideBar />
//                 <Switch>
//                     <Route path={'/home'} component={Home} />
//                     <Route path={'/about'} component={About} />
//                     <Route path={'/contact/:fechai/:fechaf/:temas'} component={Contact} />
//                     {/* <Route path={'/service'} component={Service} /> */}
//                     {/* <Route path={'/serviceFace'} component={ServiceFace} /> */}
//                     {/* <Route path={'/serviceInstagram'} component={ServiceInstagram} /> */}
//                     {/* <Route path={'/mostrararchivos/:replies'} component={MostrarArchivos} /> */}
//                     {/* <Route path={'/mostrarresultados/:lista_graficos'} component={MostrarResultados} /> */}
//                     <Route component={NotFound} />
//                 </Switch>
//             </Box>
//         </Router>
//     )
// }
