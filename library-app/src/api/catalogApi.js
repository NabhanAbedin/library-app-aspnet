import { buildBooksCatalogUrl, buildAuthorsCatalogUrl, buildGenreCatalogUrl } from "../utils/buildCatalogUrl"

export const getBooks = async (filters) => {

    const filters = buildBooksCatalogUrl(filters);

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

export const getAuthors = async (filters) => {
    const filters = buildAuthorsCatalogUrl(filters);

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


export const getGenres = async (filters) => {
    const filters = buildAuthorsCatalogUrl(filters);

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

