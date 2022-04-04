import rawTotalData from '../assets/jsons/totales_twitter_no-replies_json.json';
import { fetchSocialData } from './fetchSocialData';

const toRechartsData = (oData) => {
    // El orden del oData.[key] es importante
    // no se debe de cambiar
    // 1.- sentiment_pred
    // 2.- Username
    // 3.- tema
    const values = ((oData?.sentiment_pred || oData.Username) || oData?.tema);
    const data = [];

    for (const xAxisName in values) {
        data.push({
            name: xAxisName,
            total: values[xAxisName]
        });
    }
    return data;
}

const arrayOfRechartsData = (rechartsData, charTitle) => ({
    _id: Math.random() * (10000 - 1) + 1,
    title: charTitle.toLocaleUpperCase(),
    chartValues: rechartsData
});

const getScrapingTotals = async ({ user, startdate, enddate, topics, replies }) => {
    const api = (replies ? '/api3/twitterScrapingReplies' : '/api1/twitterScraping');

    // Llamo a la API para obtener lista archivos
    const rawApiData = await fetchSocialData(
        api,
        {
            fechai: startdate,
            fechaf: enddate,
            temas: topics,
            user: user.toLowerCase(),
            replies: replies
        }
    );
    const { lista_archivos } = rawApiData;

    // Llamo a la API para obtener los totales
    const { lista_graficos } = await fetchSocialData(
        '/api2/twitterSentiment',
        {
            lista_archivos: lista_archivos,
            replies: replies
        }
    );

    return lista_graficos;
}

export const getTwitterValues = async(params) => {
    const newData = [];
    const { jsons: chartsData } = rawTotalData;
    // const chartsData = await getScrapingTotals(params);
    let data = [];

    for (const key in chartsData) {
        // Convertir los JSON string a object
        if (typeof chartsData[key] === 'string') chartsData[key] = JSON.parse(chartsData[key]);
        else if (key !== 'temas' && typeof chartsData[key][0] === 'string') chartsData[key] = chartsData[key].map(JSON.parse);

        if (key === 'temas') {
            data = toRechartsData(chartsData[key]);
            newData.push(arrayOfRechartsData(data, key));

        } else {
            for (const index in chartsData[key]) {
                data = toRechartsData(chartsData[key][index]);
            }

            newData.push(arrayOfRechartsData(data, key));

        }
    }
    // console.log(newData);
    return newData;
}
