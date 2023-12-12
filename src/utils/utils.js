export const formatDate = (date) => {
    const dateToBeFormatted = new Date(date);

    const year = dateToBeFormatted.getFullYear();
    const month = dateToBeFormatted.toLocaleString('en-US', { month: 'long' });
    const day = dateToBeFormatted.getDate();

    return (month + ' ' + day + ', ' + year);
};