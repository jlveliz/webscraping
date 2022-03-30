import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useHistory } from 'react-router-dom';

// Mis imports
import { leftMenuItems } from '../../helpers/leftMenu';

const drawerWidth = 240;

export const LeftSideBar = () => {

    const history = useHistory();

    return (
        <Drawer
            variant='permanent'
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
                        textAlign='left'
                        sx={{ pt: 2, fontWeight: 'bold' }}
                    >
                        Estadísticas
                    </Divider>
                    {
                        leftMenuItems.map(
                            (menu, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    onClick={() => history.push(menu.url)}
                                >
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={menu.title}
                                    />
                                </ListItem>
                            )
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
}
