const getCart = async () => {
    const res = await fetch('http://localhost:5189/api/MyCollection/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to get cart: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

const addToCart = async (bookIds) => {
    const res = await fetch(`http://localhost:5189/api/MyCollection/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookIds),
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to add to cart: ${res.status} ${res.statusText}`);
    }

   return res;
}

const getCartItemById = async (cartItemId) => {
    const res = await fetch(`http://localhost:5189/api/MyCollection/cart/${cartItemId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to get cart item: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

const deleteCartItem = async (cartItemId) => {
    const res = await fetch(`http://localhost:5189/api/MyCollection/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to delete cart item: ${res.status} ${res.statusText}`);
    }

    // NoContent response (204) doesn't have a body
    return;
}

const getCheckedoutItems = async () => {
    const res = await fetch('http://localhost:5189/api/MyCollection/checkout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to get checked out collection: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

const addCollectionToCheckedout = async (bookIds) => {
    const res = await fetch('http://localhost:5189/api/MyCollection/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookIds}),
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error(`Failed to checkout books: ${res.status} ${res.statusText}`);
    }

    return res;
}

export { getCart, addToCart, getCartItemById, deleteCartItem, getCheckedoutItems, addCollectionToCheckedout };
