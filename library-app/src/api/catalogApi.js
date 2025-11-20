import { buildBooksCatalogUrl, buildAuthorsCatalogUrl, buildGenreCatalogUrl } from "../utils/buildCatalogUrl"

export const getBooks = async (filterData) => {

    const filters = buildBooksCatalogUrl(filterData);
    console.log(filters);

    const res = await fetch(`http://localhost:5189/api/catalog/books?${filters}`, {
        method: 'GET',
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting books failed');
      }

    const json = await res.json();
    return json;
}

export const getAuthors = async (filterData) => {
    const filters = buildAuthorsCatalogUrl(filterData);
    console.log(filters);
    
    const res = await fetch(`http://localhost:5189/api/catalog/authors?${filters}`, {
        method: 'GET',
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting authors failed');
      }

    const json = await res.json();
    return json;
}


export const getGenres = async (filterData) => {
    const filters = buildAuthorsCatalogUrl(filterData);

    const res = await fetch(`http://localhost:5189/api/catalog/genres?${filters}`, {
        method: 'GET',
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting genres failed');
      }


    const json = await res.json();
    return json;
}

export const addBook = async ({Title, Author, Genre, Available, Release = null}) => {
    const res = await fetch('http://localhost:5189/api/catalog/books', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            Title,
            Author,
            Genre,
            Available,
            Release
        })
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting genres failed');
    }

    return await res.json();
}

export const deleteBook = async (id) => {
    const res = await fetch(`http://localhost:5189/api/catalog/books/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting genres failed');
    }

    return;

}


export const deleteAuthor = async (id) => {
    const res = await fetch(`http://localhost:5189/api/catalog/authors/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting genres failed');
    }

    return;

}

export const addauthor = async ({Name, Bio = null, Age}) => {
    const res = await fetch('http://localhost:5189/api/catalog/authors', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            Name, 
            Bio, 
            Age
        })
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting genres failed');
    }

    return await res.json();
}


export const addGenre = async ({Type}) => {
    const res = await fetch('http://localhost:5189/api/catalog/genres', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            Type
        })
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting genres failed');
    }

    return await res.json();
}


export const deleteGenre = async (id) => {
    const res = await fetch(`http://localhost:5189/api/catalog/genres/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting genres failed');
    }

    return;
}



