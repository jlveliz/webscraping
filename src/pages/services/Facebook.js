import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Card, CardActions, CardContent, Divider, TextField, Typography } from '@mui/material';
import { AppIcons } from '../../helpers/AppIcons';

export const Facebook = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h2" gutterBottom>
                    Facebook
                    <Divider />
                </Typography>
                <form
                    // onSubmit={this.handleSubmit}
                    id="paramForm"
                    method="post"
                >
                    <div className='intro'>
                        <TextField
                            id="txtUser"
                            // value={user || ''}
                            label="Usuario"
                        // onChange={this.handleUserChange}
                        // style={{ width: '150px', height: '20px' }}
                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            id="txtNumPages"
                            label="#"
                            // value={num_paginas}
                            type='number'
                        // onChange={this.handleNumPaginasChange}
                        // style={{ width: '50px', height: '20px' }}
                        />
                    </div>
                    <br />
                    <div >
                        <TextField
                            id="txtTopics"
                            label="Temas"
                            // value={temas || ''}
                            // onChange={this.handleTemasChange}
                            // onKeyDown={this.onKeyPress}
                            multiline
                            cols="50"
                            rows="5"
                        />
                    </div>
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div  >
                            <DatePicker
                                // selected={fechai}
                                onChange={() => { }}
                                name="fechai"
                                id="fechai"
                                label='Fecha desde'
                                dateFormat='dd/MM/yyyy'
                                maxDate={new Date()}
                                renderInput={
                                    (params) => <TextField {...params} size="small" />
                                }
                            />
                        </div>
                        <br />
                        <div >
                            <DatePicker
                                // selected={fechaf}
                                onChange={() => { }}
                                name="fechaf"
                                label="Fecha Hasta"
                                dateFormat='dd/MM/yyyy'
                                maxDate={new Date()}
                                renderInput={
                                    (params) => <TextField {...params} size="small" />
                                }
                            />
                        </div>
                    </LocalizationProvider>
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
    )
}
