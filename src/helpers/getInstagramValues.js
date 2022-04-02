import instagramData from '../assets/jsons/sentiment_instagram.json';
import rawTotalData from '../assets/jsons/totales_twitter_no-replies_json.json';

const instagram = instagramData.map((data, index) => ({ ...data, _id: (index + 1) }));

export const getInstagramValues = ({ user, numpages, startdate, endtdate, topics }) => {
    const allUser = user === '';
    // const newData = instagram.filter((data) => (data.Username === user || allUser));
    const newData = [];
    const { jsons: chartsData } = rawTotalData;
    let data = [];

    for (const key in chartsData) {
        // Convertir los JSON string a object
        if (typeof chartsData[key] === 'string') chartsData[key] = JSON.parse(chartsData[key]);
        else if (key !== 'temas' && typeof chartsData[key][0] === 'string') chartsData[key] = chartsData[key].map(JSON.parse);

        if (key === 'temas') {
            data = [];

            for (const xAxisName in chartsData[key].tema) {
                data.push(
                    {
                        name: xAxisName,
                        total: chartsData[key].tema[xAxisName]
                    }
                );
            }
            newData.push({
                _id: key,
                title: key.toLocaleUpperCase(),
                chartValues: data
            });

        } else {
            console.log(key);
            console.log(chartsData);

            for (const index in chartsData[key]) {
                data = [];
                // console.log(chartsData[key][index], index);
                const values = (chartsData[key][index]?.sentiment_pred || chartsData[key][index].Username);
                for (const xAxisName in values) {
                    // console.log(Object.keys(chartsData[key][index]), chartsData[key][index].tema, xAxisName);
                    data.push(
                        {
                            name: xAxisName,
                            total: values[xAxisName]
                        }
                    );
                }
            }

            newData.push({
                _id: key,
                title: key.toLocaleUpperCase(),
                chartValues: data
            });

        }

        // console.log(key);
        // console.log(chartsData[key]);
    }

    console.log(data);

    // Traer la data de API 5
    // const { newData: data } = postData(
    //     '/api5/instagramScraping',
    //     {
    //         fechai: startdate,
    //         fechaf: endtdate,
    //         temas: topics,
    //         user: user,
    //         num_paginas: numpages
    //     }
    // );

    return newData;
}
