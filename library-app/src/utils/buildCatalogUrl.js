export const buildBooksCatalogUrl = (filters) => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search.toString());
    if (filters.orderBy) params.append('orderBy', filters.orderBy.toString());
    if (filters.from) params.append('from', filters.from.toString());
    if (filters.to) params.append('to', filters.to.toString());

    return params.toString();

}

export const buildAuthorsCatalogUrl = (filters) => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search.toString());
    if (filters.orderBy) params.append('orderBy', filters.orderBy.toString());
    if (filters.from) params.append('from', filters.from.toString());
    if (filters.to) params.append('to', filters.to.toString());

    return params.toString();
}

export const buildGenreCatalogUrl = (filters) => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search.toString());
    if (filters.orderBy) params.append('orderBy', filters.orderBy.toString());

    return params.toString();
}