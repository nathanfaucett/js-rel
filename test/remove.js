var tape = require("tape"),
    adapter = require("./adapter"),
    table = require("./table");


tape("remove(where: Array<Array[attribute: String, comparision: String, value: Any]>)", function(assert) {
    var users = table.users;

    users(adapter.users)
        .remove([
            [users.attributes.id, "=", 4]
        ])
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 4,
                    "users.email": "new@new.com"
                }], "should remove rows from table, and return the removed rows");
                assert.end();
            }
        });
});
