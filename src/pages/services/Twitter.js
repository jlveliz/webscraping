import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Divider,
    TextField,
    Typography
} from '@mui/material';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppIcons } from '../../helpers/AppIcons';

// Datos
import sentimentsData from '../../assets/jsons/sentiment.json';

const sentiments = JSON.parse(sentimentsData);
// console.log(sentiments);

let data = [];
let totalPos = 0;
let totalNeg = 0;
let totalUnd = 0;

sentiments.filter(sentiment => {
    switch (sentiment.sentiment_pred) {
        case 'Positive': totalPos++; break;
        case 'Undetermined': totalUnd++; break;
        case 'Negative': totalNeg++; break;
        default: console.log(sentiment.sentiment_pred); break;
    }
    // console.log({ totalNeg, totalPos });
});

data.push(
    { name: 'Neutral', pv: totalUnd },
    { name: 'Positivos', pv: totalPos },
    { name: 'Negativos', pv: totalNeg },
);
// data.push({
//     name: 'Sentimientos',
//     positivos: totalPos,
//     negativos: totalNeg,
//     amt: 0
// });

// console.log(data);

export const Twitter = () => {

    const handleInputChange = (e) => {
        console.log(e.target);
    }

    const handleDateChange = () => {
        console.log('aqui tamos');
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography
                        variant="h2"
                        gutterBottom
                    >
                        Twitter
                        <Divider />
                    </Typography>
                    <form
                        // onSubmit={this.handleSubmit}
                        id="paramForm"
                        method="post" date
                    >
                        <div className='intro'>
                            <TextField
                                id="txtTwitterUser"
                                label="Twitter user"
                                // variant="standard"
                                onChange={handleInputChange}
                                size="small"
                            />
                        </div>
                        <label htmlFor="replies">Obtener Replies&nbsp;</label>
                        <Checkbox
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <br />
                        <div>
                            <TextField
                                id="txtTopics"
                                label="Temas"
                                multiline
                                onChange={handleInputChange}
                                rows="5"
                                size="small"
                                value={''}
                            />
                        </div>
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div>
                                <DatePicker
                                    variant="inline"
                                    label="Fecha desde"
                                    onChange={handleDateChange}
                                    renderInput={
                                        (params) => <TextField {...params} size="small" />
                                    }
                                />
                            </div>
                            <br />
                            <div>
                                <DatePicker
                                    variant="inline"
                                    label="Fecha hasta"
                                    onChange={handleDateChange}
                                    renderInput={
                                        (params) => <TextField {...params} size="small" />
                                    }
                                />
                            </div>
                        </LocalizationProvider>
                        <div id="inner_med">
                            <span>
                                {/* {procesando} */}
                            </span>
                        </div>
                        <br />
                    </form>
                </CardContent>
                <Divider />
                <CardActions sx={{
                    mx: 'auto',
                    width: 200,
                }}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={AppIcons.search}
                    >Buscar</Button>
                </CardActions>
            </Card>
            <br />
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Todos
                    </Typography>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" name='#ADNESPOL' />
                    </BarChart>
                </CardContent>
            </Card>
        </>
    )
}
