
export const getUsers = (data) => {
    const users = [];
    data.forEach(sentiment => users.push(sentiment.Username));

    return [...new Set(users)];
}