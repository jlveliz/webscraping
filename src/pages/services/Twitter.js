import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Button, Card, CardActions, CardContent, Checkbox, Divider, TextField, Typography } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { Grid } from '@material-ui/core';

// Mis imports
import { AppIcons } from '../../helpers/AppIcons';
// Datos
import sentimentsData from '../../assets/jsons/sentiment.json';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { getUsers } from '../../helpers/getTwitterValues';

const sentiments = JSON.parse(sentimentsData);
// console.log(sentiments);

let data = [];
let totalPos = 0;
let totalNeg = 0;
let totalUnd = 0;

const users = getUsers(sentiments);
const oUsers = users.map((user) => ({ [user]: 0 }));

sentiments.forEach(sentiment => {

    switch (sentiment.sentiment_pred) {
        case 'Positive':
            totalPos++;

            break;
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

const today = new Date().toLocaleDateString().split(' ')[0];
const initState = {
    twitterUser: 'CRGUERRERO',
    replies: false,
    topics: '',
    startDate: today,
    endDate: today,
};

export const Twitter = () => {

    const [formValues, handleInputChange] = useForm(initState);
    const { twitterUser, replies, topics, startDate, endDate } = formValues;

    // console.log(startDate);

    // Funciones
    const handleDateChange = () => {
        console.log('aqui tamos');
    }

    return (
        <>


            {/* <Card sx={{ minWidth: 275 }}> */}
            <Card>
                <CardContent>
                    <Typography
                        variant="h3"
                        gutterBottom
                    >
                        Twitter
                        <Divider />
                    </Typography>



                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item lg={6}>
                            <form
                                // onSubmit={this.handleSubmit}
                                id="paramForm"
                                method="post" date
                            >
                                <Grid container >
                                    <Grid item sm={4}>
                                        <TextField
                                            id="txtTwitterUser"
                                            name='twitterUser'
                                            label="Twitter user"
                                            // variant="standard"
                                            size="small"
                                            value={twitterUser}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <TextField
                                            id="txtStartDate"
                                            name='startDate'
                                            label="Fecha desde"
                                            // type="date"
                                            size="small"
                                            onChange={handleInputChange}
                                            value={startDate}
                                        />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <TextField
                                            id="txtEndDate"
                                            name='endtDate'
                                            label="Fecha hasta"
                                            // type="date"
                                            size="small"
                                            onChange={handleInputChange}
                                            value={endDate}
                                        />
                                    </Grid>

                                </Grid>
                                <br />
                                <TextField
                                    id="txtTopics"
                                    name='topics'
                                    label="Temas"
                                    multiline
                                    rows="5"
                                    size="small"
                                    sx={{ width: '100%' }}
                                    onChange={handleInputChange}
                                    value={topics}
                                />
                                <br />
                                <label htmlFor="replies">Obtener Replies&nbsp;</label>
                                <Checkbox
                                    inputProps={{
                                        'aria-label': 'controlled',
                                        name: 'replicar',
                                        checked: replies
                                    }}
                                />
                                {/* <div id="inner_med">
                                    <span>
                                        {procesando}
                                    </span>
                                </div> */}
                                <br />
                                <br />
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={AppIcons.search}
                                >Ver</Button>
                            </form>
                        </Grid>
                        <Grid item lg={6}>

                            <Typography variant="h5">
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


                </CardContent>
                {/* <Divider />
                <CardActions sx={{
                    mx: 'auto',
                    width: 200,
                }}>
                </CardActions> */}
            </Card>
        </>
    )
}
