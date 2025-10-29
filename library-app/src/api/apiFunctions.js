export const formatRelease = (release) => {
    const splitRelease = release.split('T');

    return splitRelease[0];
};

export const addBookToCatalog = async (bookRequests) => {
    const res = await fetch('http://localhost:5001/books/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            bookRequests
        })
    });

    const result = await res.json();
    console.log(result);

    return res;
};

export const addBookRequest = async ({title, author, release, genre}) => {
    const res = await fetch('http://localhost:5001/books/request', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title,
            author,
            release,
            genre
        })
    });

    const result = await res.json();
    console.log(result);

    return res;
}

export const getBooks = async () => {
    const res = await fetch('http://localhost:5001/books', {
        method: 'GET'
    });

    const result = await res.json();
    return result;
}

export const addAuthorRequest = async ({name, bio, age}) => {
    const res = await fetch('http://localhost:5001/authors/request', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            bio,
            age
        })
    });
    const result = await res.json();
    console.log(result);
    return res;
};

export const addAuthorToCatalog = async (authorRequests) => {
    const res = await fetch('http://localhost:5001/authors/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            authorRequests
        })
    });

    const result = await res.json();
    console.log(result);

    return res;
};

// export const viewAllBooks = async () => {
//     const res = await fetch('http://localhost:5001/books/catalog');

//     const result = await res.json();
//     console.log(result);
//     return result;
// };

export const findBySearch = async (query) => {
     const res = await fetch(`http://localhost:5001/books/catalog/search?query=${encodeURIComponent(query)}`);

     const result = await res.json();
     return result;
};

export const catalogBooks = async ({sortBy, orderBy, from, to}) => {
    const res = await fetch(`http://localhost:5001/books/catalog?sortBy=${sortBy}&orderBy=${orderBy}&from=${from}&to=${to}`);

    const result = await res.json();
    return result;
};

// export const viewAllAuthors = async () => {
//     const res = await fetch('http://localhost:5001/authors/catalog');

//     const result = await res.json();
//     console.log(result);
//     return result;
// };

export const catalogAuthors = async ({orderBy, from, to}) => {
    const res = await fetch(`http://localhost:5001/authors/catalog?orderBy=${orderBy}&from=${from}&to=${to}`);

    const result = await res.json();
    return result;
};

export const findAuthorsBySearch = async (query) => {
    const res = await fetch(`http://localhost:5001/authors/catalog/search?query=${encodeURIComponent(query)}`);

    const result = await res.json();
    return result;
};

export const catalogGenre = async ({orderBy}) => {
    const res = await fetch(`http://localhost:5001/genre/catalog?orderBy=${orderBy}`);
    const result = await res.json();
    return result;
};

export const findGenreBySearch = async (query) => {
    const res = await fetch (`http://localhost:5001/genre/catalog/search?query=${encodeURIComponent(query)}`);
    const result = await res.json();
    return result;
};

export const createAccount = async (username, password) => {
    const res = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
         username: username,
         password: password
        })
 
     });

    const result = await res.json();
    console.log(result);
    return res;
}

export const logIn = async (username, password) => {
    const res = await fetch('http://localhost:5001/auth/login', {
       method: 'POST',
       headers: {'Content-type': 'application/json'},
       credentials: 'include',
       body: JSON.stringify({
        username: username,
        password: password
       })

    });

    const result = await res.json();
    console.log(result);
    return { res, result };
};

export const logOut = async () => {
    const res = await fetch('http://localhost:5001/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const result = await res.json();
    console.log(result);
    return res;
}

 
export const checkLoggedIn = async () => {
    const res = await fetch('http://localhost:5001/auth/check',{
        method: 'GET',
        credentials: 'include'
    });

    if (res.status === 401) {
        return false;
    }

    const result = await res.json();
    return result;
};

export const userCarts = async () => {
    const res = await fetch('http://localhost:5001/myCollection/cart', {
        method: 'GET',
        credentials: 'include'
    });

    const result = await res.json();
    return result;
};

export const addToCart = async (cart) => {
    const res = await fetch('http://localhost:5001/myCollection/cart', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(cart)
    });

    return res;
};

export const removeFromCart = async (cart) => {
    const res = await fetch('http://localhost:5001/myCollection/cart', {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(cart)
    });

    return res;
};

export const getCheckOut = async () => {
    const res = await fetch('http://localhost:5001/myCollection/checkedout', {
        method: 'GET',
        credentials: 'include'
    });

    const result = await res.json();
    return result;
};

export const addToCheckOut = async (cart) => {
    const res = await fetch('http://localhost:5001/myCollection/checkedout', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(cart)

    });

    return res;
}

export const adminGetCheckedOut = async () => {
    const res = await fetch('http://localhost:5001/admin/returns', {
        method: 'GET',
        credentials: 'include'
    })

    const result = await res.json();
    return result;
}

export const updateReturn = async (date, checkedOutId, bookId) => {
    const res = await fetch('http://localhost:5001/admin/returns', {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({date, checkedOutId, bookId})

    });

    return res;
}

export const getAllRequests = async () => {
    const res = await fetch('http://localhost:5001/admin/requests', {
        method: 'GET',
        credentials: 'include'
    })

    const {bookResult, authorsResult} = await res.json();
    return {bookResult, authorsResult};
}

export const removeFromRequests = async (cart) => {
    console.log(cart);
    const res = await fetch(`http://localhost:5001/admin/requests`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({cart})

    })

    return res;
}

