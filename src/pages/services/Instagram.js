import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import locale from 'date-fns/locale/es'
import Swal from 'sweetalert2';

// Mis importaciones
import { AppIcons } from '../../helpers/AppIcons';
import { getInstagramValues } from '../../helpers/getInstagramValues';
import { useForm } from '../../hooks/useForm';

const columns = [
    { field: '_id', headerName: 'ID', width: 20 },
    { field: 'Username', headerName: 'USUARIO', width: 125 },
    { field: 'date', headerName: 'FECHA', width: 100 },
    { field: 'tema', headerName: 'TEMA', width: 120 },
    { field: 'Text', headerName: 'PUBLICACIONES', width: 800 },
];

const today = new Date();
const initState = {
    user: '',
    numpages: '10',
    startdate: moment(today).format('L'),
    enddate: moment(today).add(1, 'days').format('L'),
    topics: '',
}

export const Instagram = () => {
    const [formValues, handleInputChange] = useForm(initState);
    const { user, numpages, startdate, enddate, topics } = formValues;
    const [rows, setRows] = useState([]);

    const validate = ({ user, numpages, startdate, enddate, topics }) => {
        const chekDate = () => {
            const mStart = moment(moment(startdate, 'dd/mm/yyyy'));
            const mEnd = moment(moment(enddate, 'dd/mm/yyyy'));
            return mStart.isBefore(mEnd);
        }

        if (topics === '') {
            Swal.fire('Error', 'Debe ingresar uno o mas temas de busqueda', 'error');
            return false;
        }
        if (user === '') {
            Swal.fire('Error', 'Debe ingresar el usuario de Instagram a obtener datos', 'error');
            return false;
        }
        if (chekDate()) {
            Swal.fire('Error', 'La fecha final debe ser mayor a la inicial', 'error');
            return false;
        }
        if (numpages > 50 || numpages < 1) {
            Swal.fire('Error', 'Debe ingresar numero de paginas entre 1 y 300', 'error');
            return true;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValidated = validate(formValues);

        if (isValidated) setRows(getInstagramValues(formValues));
        // console.log(rows);
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant='h4' gutterBottom>
                        Instagram
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
                                        id='txtStartDate'
                                        name='enddate'
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
                                        id='txtEndDate'
                                        name='enddate'
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
            <DataGrid getRowId={row => row._id}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            // checkboxSelections
            />
        </>
    )
}
