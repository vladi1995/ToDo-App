const baseUrl = 'http://localhost:3005/api/users';

export const getAllUsers = async (sortTypeFromUserList, sortType) => {
    let response = '';

    if (sortTypeFromUserList) {
        response = await fetch(`${baseUrl}?sort=${sortTypeFromUserList}&order=${sortType}`);
    } else {
        response = await fetch(`${baseUrl}`);
    }
    const result = await response.json();

    return result.users;
};

export const getAllUsersSearch = async(searchValue, searchCriteria) => {
    const response = await fetch(`${baseUrl}?search=${searchValue}&criteria=${searchCriteria}`);
    const result = await response.json();

    return result.users;
};

export const getUser = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`);
    const result = await response.json();
    
    return result.user;
};

export const create = async(userData) => {
    const {country, city, street, streetNumber, ...data} = userData;

    data.address = {
        country,
        city,
        street,
        streetNumber,
    };

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    return result.user;
};

export const del = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`, {
        method: 'DELETE',
    });

    const result = await response.json();

    return result;
};

export const edit = async (userId, userData) => {
    const {country, city, street, streetNumber, ...data} = userData;

    data.address = {
        country,
        city,
        street,
        streetNumber,
    };

    const response = await fetch(`${baseUrl}/${userId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    return result.user;
};