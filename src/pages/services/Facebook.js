import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import locale from 'date-fns/locale/es';
import Swal from 'sweetalert2';

// Mis importaciones
import { useForm } from '../../hooks/useForm';
import { AppIcons } from '../../helpers/AppIcons';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { getFacebookValues } from '../../helpers/getFacebookValues';

const xAxisColor = blue['A700'];
const today = new Date();
const initState = {
    user: '',
    numpages: '10',
    startdate: moment(today).format('L'),
    enddate: moment(today).add(1, 'days').format('L'),
    topics: '',
}

const checkDateStartEnd = (start, end) => {
    const mStart = moment(moment(start, 'dd/mm/yyyy'));
    const mEnd = moment(moment(end, 'dd/mm/yyyy'));

    return mEnd.isBefore(mStart);
}

export const Facebook = () => {
    const [formValues, handleInputChange] = useForm(initState);
    const { user, numpages, startdate, enddate, topics } = formValues;
    const [chartsData, setChartsData] = useState([]);

    const validate = ({ user, numpages, startdate, enddate, topics }) => {
        const swalTitle = 'Atencion';
        const swalIcon = 'warning';

        if (user === '') {
            Swal.fire(swalTitle, 'Debe ingresar el usuario de Instagram a obtener datos', swalIcon);
            return false;
        }

        if (numpages > 30 || numpages < 1) {
            Swal.fire(swalTitle, 'Debe ingresar numero de paginas entre 1 y 30', swalIcon);
            return true;
        }

        if (checkDateStartEnd(startdate, enddate)) {
            Swal.fire(swalTitle, 'La fecha final debe ser mayor a la inicial', swalIcon);
            return false;
        }

        if (topics === '') {
            Swal.fire(swalTitle, 'Debe ingresar uno o mas temas de busqueda', swalIcon);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidated = validate(formValues);

        try {
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

            if (isValidated) setChartsData(await getFacebookValues(formValues));

            Swal.close();

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
                        Facebook
                        <Divider />
                    </Typography>
                    <form
                        onSubmit={handleSubmit}
                        id='paramForm'
                        method='post'
                    >
                        <Grid container spacing={2}>
                            <Grid item sm={4}>
                                <TextField
                                    id='txtUser'
                                    name='user'
                                    size='small'
                                    label='Usuario'
                                    onChange={handleInputChange}
                                    value={user}
                                />
                            </Grid>
                            <Grid item sm={2}>
                                <TextField
                                    id='txtNumPages'
                                    name='numpages'
                                    label='# páginas'
                                    size='small'
                                    type='number'
                                    onChange={handleInputChange}
                                    value={numpages}
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
                                    <DatePicker
                                        // id='txtStartDate'
                                        // name='enddate'
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
                                        // id='txtEndDate'
                                        // name='enddate'
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
                            // onKeyDown={this.onKeyPress}
                            sx={{
                                width: '100%',
                                marginBottom: '8px'
                            }}
                        />
                        <Button
                            size='large'
                            type='submit'
                            variant='contained'
                            startIcon={AppIcons.search}
                        >Ver</Button>
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
