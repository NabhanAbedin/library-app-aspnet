export const register = async (registerRequest) => {
    const res = await fetch('http://localhost:5189/api/auth/register', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            Username: registerRequest.username,
            Password: registerRequest.password,
        })
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Registration failed');
      }

    const json = await res.json();
    return {res, json};
}


export const logIn = async (loginRequest) => {
    const res = await fetch('http://localhost:5189/api/auth/login', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            Username: loginRequest.username,
            Password: loginRequest.password,
        })
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
      }

    const json = await res.json();
    console.log(json);
    return {res, json};
}

export const logout = async () => {
    const res = await fetch('http://localhost:5189/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Logout failed: ${errorText}`);
    }
  
    return res;
  };