const getRequests = async () => {
    const res = await fetch('http://localhost:5189/api/Requests', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to get requests: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

const getRequestById = async (id) => {
    const res = await fetch(`http://localhost:5189/api/Requests/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to get request: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

const addBookRequest = async (bookRequest) => {
    const res = await fetch('http://localhost:5189/api/Requests/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookRequest),
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to add book request: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

const addAuthorRequest = async (authorRequest) => {
    const res = await fetch('http://localhost:5189/api/Requests/authors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authorRequest),
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to add author request: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

const addGenreRequest = async (genreRequest) => {
    const res = await fetch('http://localhost:5189/api/Requests/genres', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genreRequest),
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to add genre request: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

export { getRequests, getRequestById, addBookRequest, addAuthorRequest, addGenreRequest };