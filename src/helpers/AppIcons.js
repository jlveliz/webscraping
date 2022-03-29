import {
    lightBlue,
    indigo
} from '@mui/material/colors';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import InsightsIcon from '@mui/icons-material/Insights';
import TwitterIcon from '@mui/icons-material/Twitter';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';


export const AppIcons = {
    fb: <FacebookIcon sx={{ color: indigo[600] }} />,
    in: <InstagramIcon sx={{ color: 'brown' }} />,
    tw: <TwitterIcon sx={{ color: lightBlue[600] }} />,
    stats: <InsightsIcon />,
    save: <SaveAltIcon />,
    search: <ScreenSearchDesktopIcon />,
}