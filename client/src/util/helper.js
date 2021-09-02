export const formatDateTime = (datetime) => {
    const hour = datetime.getHours();
    const min = datetime.getMinutes();

    return `${hour}:${min}`;
};
