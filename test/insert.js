var tape = require("tape"),
    adapter = require("./adapter"),
    table = require("./table");


tape("insert(attributes: Array<String>, values: Array<Array<Any>>)", function(assert) {
    var users = table.users;

    users(adapter.users)
        .insert([users.attributes.id, users.attributes.email], [
            [4, "new@new.com"]
        ])
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 4,
                    "users.email": "new@new.com"
                }], "should insert rows into table, and return the new rows");
                assert.end();
            }
        });
});
