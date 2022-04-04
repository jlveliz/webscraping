import rawTotalData from '../assets/jsons/totales_twitter_no-replies_json.json';
import { fetchSocialData } from './fetchSocialData';
import { arrayOfRechartsData, toRechartsData } from './getRechartsArrays';

const getScrapingTotals = async ({ user, numpages, startdate, enddate, topics }) => {
    const api = '/api4/facebookScraping';

    // Llamo a la API para obtener lista archivos
    const rawApiData = await fetchSocialData(
        api,
        {
            fechai: startdate,
            fechaf: enddate,
            temas: topics,
            user: user.toLowerCase(),
            num_paginas: numpages
        }
    );
    const { lista_archivos } = rawApiData;

    // Llamo a la API para obtener los totales
    const { lista_graficos } = await fetchSocialData(
        '/api2/twitterSentiment',
        {
            lista_archivos: lista_archivos,
            replies: false
        }
    );

    return lista_graficos;
}

export const getFacebookValues = async (params) => {
    const excludes = {'Undetermined' : (params.undetermined? '1' : '0') };
    const newData = [];
    const { jsons: chartsData } = rawTotalData;
    // const chartsData = await getScrapingTotals(params);
    let data = [];

    for (const key in chartsData) {
        // Convertir los JSON string a object
        if (typeof chartsData[key] === 'string') chartsData[key] = JSON.parse(chartsData[key]);
        else if (key !== 'temas' && typeof chartsData[key][0] === 'string') chartsData[key] = chartsData[key].map(JSON.parse);

        if (key === 'temas') {
            data = toRechartsData(chartsData[key], excludes);
            newData.push(arrayOfRechartsData(data, key));

        } else {
            for (const index in chartsData[key]) {
                data = toRechartsData(chartsData[key][index], excludes);
            }

            newData.push(arrayOfRechartsData(data, key));

        }
    }
    // console.log(newData);
    return newData;
}
