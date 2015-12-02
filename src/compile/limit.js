module.exports = limit;


function limit(rows, count) {
    return rows.slice(0, count);
}
