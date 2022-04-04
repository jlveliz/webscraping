
export const toRechartsData = (oData, excludes = {}) => {
    // El orden del oData.[key] es importante
    // no se debe de cambiar
    // 1.- sentiment_pred
    // 2.- Username
    // 3.- tema
    const values = ((oData?.sentiment_pred || oData.Username) || oData?.tema);
    const data = [];

    for (const xAxisName in values) {
        // Mostrar/ Ocultar barras del grafico
        // segun el objeto excludes
        const add = excludes[xAxisName]=='1' || !excludes[xAxisName];

        if (add) {
            data.push({
                name: xAxisName,
                total: values[xAxisName]
            });
        }
    }
    return data;
}

export const arrayOfRechartsData = (rechartsData, charTitle) => ({
    _id: Math.random() * (10000 - 1) + 1,
    title: charTitle.toLocaleUpperCase(),
    chartValues: rechartsData
});