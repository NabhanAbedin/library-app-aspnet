const GenreTable = ({genre}) => {
    return (
    <>
        <div className="books-table-container">
        <table className="books-table">
            <thead>
                <tr>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
                {genre.map(genre => (
                    <tr key={genre.id}>
                        <td className="book-title-cell">{genre.type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
       </div>
    </>
    );
};

export default GenreTable;