module.exports = skip;


function skip(rows, count) {
    return rows.slice(count, rows.length);
}
