import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { /*useEffect,*/ useState } from 'react';

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
    endtdate: moment(today).add(1, 'days').format('L'),
    topics: '',
}
// console.log(instagramData);

export const Instagram = () => {
    const [formValues, handleInputChange] = useForm(initState);
    const { user, numpages, startdate, endtdate, topics } = formValues;
    const [rows, setRows] = useState([]);

    // useEffect(() => {
        // rows = getInstagramValues(formValues);
    // });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formValues);
        setRows(getInstagramValues(formValues));
        // console.log(rows);
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Instagram
                        <Divider />
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item sm={6}>
                            <form
                                onSubmit={handleSubmit}
                                id="paramForm"
                                method="post"
                            >
                                <Grid container spacing={2}>
                                    <Grid item sm={4}>
                                        <TextField
                                            id="txtUser"
                                            name='user'
                                            size='small'
                                            label="Usuario"
                                            onChange={handleInputChange}
                                            value={user}
                                        // style={{ width: '150px', height: '20px' }}
                                        />
                                    </Grid>
                                    <Grid item sm={2}>
                                        <TextField
                                            id="txtNumPages"
                                            name='numpages'
                                            label="# páginas"
                                            size='small'
                                            type='number'
                                            onChange={handleInputChange}
                                            value={numpages}
                                        // style={{ width: '50px', height: '20px' }}
                                        />
                                    </Grid>
                                    <Grid item sm={3}>
                                        <TextField
                                            id="txtStartDate"
                                            name='startdate'
                                            label="Fecha desde"
                                            size='small'
                                            onChange={handleInputChange}
                                            value={startdate}
                                        />
                                    </Grid>
                                    <Grid item sm={3}>
                                        <TextField
                                            id="txtEndDate"
                                            name='endtdate'
                                            label="Fecha hasta"
                                            size='small'
                                            onChange={handleInputChange}
                                            value={endtdate}
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <TextField
                                    id="txtTopics"
                                    name='topics'
                                    label="Temas"
                                    multiline
                                    cols="50"
                                    rows="5"
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
                                    size="large"
                                    type='submit'
                                    variant="contained"
                                    startIcon={AppIcons.search}
                                >Ver</Button>
                            </form>
                        </Grid>
                        <Grid item sm={6}>
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
            <br />
            <DataGrid getRowId={row => row._id}
                rows={rows}
                columns={columns}
                pageSize={(numpages *1)}
                rowsPerPageOptions={[(numpages *1)]}
            // checkboxSelections
            />
        </>
    )
}
