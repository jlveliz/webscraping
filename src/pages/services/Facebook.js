import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Card, CardActions, CardContent, Divider, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


import { AppIcons } from '../../helpers/AppIcons';
import facebookData from '../../assets/jsons/sentiment_facebook.json';

const rows = facebookData.map((data, index)=>({...data, _id: index }));
const columns = [
    { field: '_id', headerName: 'ID', width: 20 },
    { field: 'Username', headerName: 'USUARIO', width: 75 },
    { field: 'date', headerName: 'FECHA', width: 100 },
    { field: 'tema', headerName: 'TEMA', width: 120 },
    { field: 'Text', headerName: 'PUBLICACIONES', width: 350 },
  ];

// console.log(rows[210]);

export const Facebook = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Facebook
                    <Divider />
                </Typography>
                <Grid container spacing={1}>
                    <Grid item sm={6}>
                        <form
                            // onSubmit={this.handleSubmit}
                            id="paramForm"
                            method="post"
                        >
                            <Grid container spacing={2}>
                                <Grid item sm={3}>
                                    <TextField
                                        size='small'
                                        id="txtUser"
                                        // value={user || ''}
                                        label="Usuario"
                                    // onChange={this.handleUserChange}
                                    // style={{ width: '150px', height: '20px' }}
                                    />
                                </Grid>
                                <Grid item sm={3}>
                                    <TextField
                                        size='small'
                                        id="txtNumPages"
                                        label="#"
                                        // value={num_paginas}
                                        type='number'
                                    // onChange={this.handleNumPaginasChange}
                                    // style={{ width: '50px', height: '20px' }}
                                    />
                                </Grid>
                                <Grid item sm={3}>
                                    <TextField
                                        size='small'
                                        id="txtStartDate"
                                        name='startDate'
                                        label="Fecha desde"
                                    // type="date"
                                    // onChange={handleInputChange}
                                    // value={startDate}
                                    />
                                </Grid>
                                <Grid item sm={3}>
                                    <TextField
                                        size='small'
                                        id="txtEndDate"
                                        name='endtDate'
                                        label="Fecha hasta"
                                    // type="date"
                                    // onChange={handleInputChange}
                                    // value={endDate}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <TextField
                                size='small'
                                id="txtTopics"
                                label="Temas"
                                multiline
                                cols="50"
                                rows="5"
                                // value={temas || ''}
                                // onChange={this.handleTemasChange}
                                // onKeyDown={this.onKeyPress}
                                sx={{
                                    width: '100%'
                                }}
                            />
                        </form>
                        <br />
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={AppIcons.search}
                        >Ver</Button>
                    </Grid>
                    <Grid item sm={6}>
                        <DataGrid getRowId={row => row._id}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            // checkboxSelections
                        />
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
    )
}
