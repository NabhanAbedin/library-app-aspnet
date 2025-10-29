
const AuthorsTable = ({authors}) => {
    return (
    <div className="books-table-container">
        <table className="books-table">
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Bio</th>
                    <th>Age</th>

                </tr>
            </thead>
            <tbody>
                {authors.map(authors => (
                    <tr key={authors.id}>
                        <td className="book-title-cell">{authors.name}</td>
                        <td className="book-author-cell">{authors.bio}</td>
                        <td className="book-genre-cell">
                            <span className="book-genre-tag">{authors.age}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default AuthorsTable;