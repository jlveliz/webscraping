import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Button, Card, CardContent, Checkbox, Divider, Grid, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useState } from 'react';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import locale from 'date-fns/locale/es';
import Swal from 'sweetalert2';

// Mis importaciones
import { useForm } from '../../hooks/useForm';
import { AppIcons } from '../../helpers/AppIcons';
import { getTwitterValues } from '../../helpers/getTwitterValues';

const xAxisColor = blue['A700'];
const today = new Date();
const oneWeekBack = moment(today).add(-7, 'days').format('L');
const initState = {
    user: '',
    startdate: moment(today).format('L'),
    enddate: moment(today).add(1, 'days').format('L'),
    topics: '',
    replies: false,
}

const checkDateStartEnd = (start, end) => {
    const mStart = moment(moment(start, 'dd/mm/yyyy'));
    const mEnd = moment(moment(end, 'dd/mm/yyyy'));

    return mEnd.isBefore(mStart);
}

export const Twitter = () => {
    const [formValues, handleInputChange] = useForm(initState);
    const { user, startdate, enddate, topics, replies } = formValues;
    const [chartsData, setChartsData] = useState([]);

    const validate = ({ user, startdate, enddate, topics, replies }) => {
        const swalTitle = 'Atencion';
        const swalIcon = 'warning';

        if (user === '') {
            Swal.fire(swalTitle, 'Debe ingresar el usuario de Instagram a obtener datos', swalIcon);
            return false;
        }

        if (startdate === '' || enddate === '') {
            Swal.fire(swalTitle, 'Debe ingresar fechas para la busqueda', swalIcon);
            return;
        } else if (checkDateStartEnd(startdate, enddate)) {
            Swal.fire(swalTitle, 'La fecha final debe ser mayor a la inicial', swalIcon);
            return false;
        }

        if (topics === '') {
            Swal.fire(swalTitle, 'Debe ingresar uno o mas temas de busqueda', swalIcon);
            return false;
        }

        if (replies) {
            if (user !== '') {
                Swal.fire(swalTitle, 'No es posible buscar replies y usuario especifico al mismo tiempo', swalIcon);
                return false;
            }

            if (checkDateStartEnd(oneWeekBack, startdate)) {
                Swal.fire(swalTitle, 'Debe ingresar fecha inicial de hasta una semana atras para obtener replies', swalIcon);
                return false;
            }
        }


        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formValues);
        const isValidated = validate(formValues);

        try {
            if (isValidated) {
                Swal.fire({
                    title: 'Espere por favor...',
                    text: '',
                    showCancelButton: false,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });

                setChartsData(await getTwitterValues(formValues));

                Swal.close();
            }

        } catch (error) {
            Swal.fire('Error', error.message, 'error');
            setChartsData([]);
        }
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant='h4' gutterBottom>
                        Twitter
                        <Divider />
                    </Typography>
                    <form
                        onSubmit={handleSubmit}
                        id='paramForm'
                        method='post'
                    >
                        <Grid container spacing={2}>
                            <Grid item sm={6}>
                                <TextField
                                    id='txtUser'
                                    name='user'
                                    size='small'
                                    label='Usuario'
                                    onChange={handleInputChange}
                                    value={user}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
                                    <DatePicker
                                        renderInput={(props) => <TextField {...props} size='small' />}
                                        label='Fecha desde'
                                        value={startdate}
                                        onChange={
                                            (selectedDate) => {
                                                handleInputChange({
                                                    target: {
                                                        name: 'startdate',
                                                        value: moment(selectedDate).format('L')
                                                    }
                                                });
                                            }
                                        }
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item sm={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
                                    <DatePicker
                                        renderInput={(props) => <TextField {...props} size='small' />}
                                        label='Fecha hasta'
                                        value={enddate}
                                        onChange={
                                            (selectedDate) => handleInputChange({
                                                target: {
                                                    name: 'enddate',
                                                    value: moment(selectedDate).format('L')
                                                }
                                            })
                                        }
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <br />
                        <TextField
                            id='txtTopics'
                            name='topics'
                            label='Temas'
                            multiline
                            cols='50'
                            rows='5'
                            size='small'
                            onChange={handleInputChange}
                            value={topics}
                            sx={{ width: '100%', marginBottom: '8px' }}
                        />
                        <br />
                        <label htmlFor="replies">Obtener Replies&nbsp;</label>
                        <Checkbox
                            inputProps={{
                                'aria-label': 'controlled',
                                checked: replies
                            }}
                            onChange={
                                (e) => handleInputChange({
                                    target: {
                                        name: 'replies',
                                        value: e.target.checked
                                    }
                                })
                            }
                        />
                        <br />
                        <Button size='large' type='submit' variant='contained' startIcon={AppIcons.search} >Ver</Button>
                    </form>
                </CardContent>
            </Card>
            <br />
            <Grid container spacing={1}>
                {
                    chartsData.map(
                        (chart) => (
                            <Grid item md key={chart._id}>
                                <h1>{chart.title}</h1>
                                <BarChart
                                    width={800}
                                    height={300}
                                    data={chart.chartValues}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 75,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" fontSize={14} interval={0} angle={-15} textAnchor="end" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {/* <Bar dataKey="pv" fill="#8884d8" name='#ADNESPOL' /> */}
                                    <Bar dataKey="total" fill={xAxisColor} opacity={0.7} textAnchor="end" />
                                </BarChart>
                            </Grid>
                        )
                    )
                }
            </Grid>
        </>
    )
}
