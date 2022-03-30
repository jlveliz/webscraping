import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

// Mis importaciones
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import { Twitter } from '../pages/services/Twitter';
import { Facebook } from '../pages/services/Facebook';
import { Instagram } from '../pages/services/Instagram';

import { LeftSideBar } from '../components/ui/LeftSideBar';
import { TopBar } from '../components/ui/TopBar';

export const AppRouter = () => {

    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* Top Menu */}
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <TopBar />
                </AppBar>
                {/* Left Menu */}
                <LeftSideBar />
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
                        <Route path={'/404'} component={NotFound} />
                        <Redirect to="/404"/>
                    </Switch>
                </Box>
            </Box>
        </Router>
    );
}
