import instagramData from '../assets/jsons/sentiment_instagram.json';

const instagram = instagramData.map((data, index)=>({...data, _id: (index +1) }));

export const getInstagramValues = ({ user, numpages, startdate, endtdate, topics }) => {
    const allUser = user === '';
    const newData = instagram.filter((data) => (data.Username === user || allUser));
    // console.log(newData);
    return newData;
}
