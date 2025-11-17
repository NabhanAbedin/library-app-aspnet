const getCheckout = async () => {
    const res = await fetch('http://localhost:5189/api/admin/checkout', {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'getting checkout items failed');
    }

    const json = await res.json();
    return json;
}

const updateReturn = async (userId, bookId) => {
    const res = await fetch(`http://localhost:5189/api/admin/returns/${userId}/books/${bookId}`, {
        method: 'PUT'
    });

    if (!res.ok)  {
        const error = await res.json();
        throw new Error(error.error || 'getting checkout items failed');
    }

}