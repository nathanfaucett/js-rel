module.exports = mergeArray;


function mergeArray(a, b) {
    var length = b.length,
        i = -1,
        il = length - 1,
        j = a.length;

    a.length += length;

    while (i++ < il) {
        a[j++] = b[i];
    }

    return a;
}
