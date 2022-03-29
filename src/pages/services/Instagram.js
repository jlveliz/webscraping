import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import {
    Card,
    CardContent,
    TextField
} from '@mui/material';

export const Instagram = () => {

    return (
        <Card>
            <CardContent>
                <form
                    // onSubmit={this.handleSubmit}
                    id="paramForm"
                    method="post"
                >
                    <div className='intro'>
                        <label htmlFor="user">Instagram user&nbsp;</label>
                        <span>
                            <input
                                id="user"
                                type='text'
                                onChange={() => { }}
                                style={{ width: '150px', height: '20px' }}
                            />
                        </span>
                        <label htmlFor="num_paginas">N&#250;mero p&#225;ginas&nbsp;</label>
                        <span>
                            <TextField
                                id="num_paginas"
                                label="#"
                                // value={num_paginas}
                                type='number'
                                // onChange={this.handleNumPaginasChange}
                                style={{ width: '50px', height: '20px' }}
                            />
                        </span>
                    </div>
                    <div >
                        <label htmlFor="temas">Temas&nbsp;</label>
                        <span>
                            <textarea
                                id="temas"
                                // value={temas || ''}
                                onChange={() => { }}
                                // onKeyDown={this.onKeyPress}
                                cols="50"
                                rows="10"
                            ></textarea>
                        </span>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div  >
                            <label htmlFor="fechai">Fecha desde</label>
                            <span>
                                <DatePicker
                                    // selected={fechai}
                                    onChange={() => { }}
                                    name="fechai"
                                    id="fechai"
                                    label='Fecha desde'
                                    // dateFormat='dd/MM/yyyy'
                                    // maxDate={new Date()}
                                    renderInput={
                                        (params) => <TextField {...params} size="small" />
                                    }
                                />
                            </span>
                        </div>
                        <div >
                            <label htmlFor="fechai">Fecha hasta&nbsp;</label>
                            <span>
                                <DatePicker
                                    // selected={fechaf}
                                    onChange={() => { }}
                                    name="fechaf"
                                    label="Fecha hasta"
                                    // dateFormat='dd/MM/yyyy'
                                    // maxDate={new Date()}
                                    renderInput={
                                        (params) => <TextField {...params} size="small" />
                                    }
                                />
                            </span>
                        </div>
                    </LocalizationProvider>
                    <button type="submit" >Enviar</button>
                </form>
            </CardContent>
        </Card>
    )
}
