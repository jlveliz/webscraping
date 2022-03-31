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
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { Grid } from '@material-ui/core';

// Mis imports
import { AppIcons } from '../../helpers/AppIcons';
// Datos
import sentimentsData from '../../assets/jsons/sentiment.json';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
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
    return sentiment;
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
    const initState = {
        twitterUser: '',
        replies: false,
        topics: '',
        startDate: '',
        endDate: '',
    };
    const [formValues, handleInputChange] = useForm(initState);
    const {twitterUser, replies, topics, startDate, endDate} = formValues;

    console.log(formValues);

    // Funciones
    const handleDateChange = () => {
        console.log('aqui tamos');
    }

    return (
        <>
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Grid item sm={6}>


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
                                        name='twitterUser'
                                        label="Twitter user"
                                        // variant="standard"
                                        size="small"
                                        value={twitterUser}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <label htmlFor="replies">Obtener Replies&nbsp;</label>
                                <Checkbox
                                    inputProps={{
                                        'aria-label': 'controlled',
                                        name: 'replicar',
                                        checked: replies
                                    }}
                                />
                                <br />
                                <div>
                                    <TextField
                                        id="txtTopics"
                                        name='topics'
                                        label="Temas"
                                        multiline
                                        rows="5"
                                        size="small"
                                        onChange={handleInputChange}
                                        value={topics}
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
                                                (params) => <TextField
                                                    {...params}
                                                    size="small"
                                                    name='startDate'
                                                    value={startDate}
                                                />
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
                                                (params) => <TextField
                                                    {...params}
                                                    size="small"
                                                    name='endDate'
                                                    value={endDate}
                                                />
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


                </Grid>
                <Grid item lg={6}>


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


                </Grid>
            </Grid>
        </>
    )
}
