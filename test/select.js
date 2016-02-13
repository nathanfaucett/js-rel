var tape = require("tape"),
    adapter = require("./adapter"),
    table = require("./table");


tape("select(where: Array<Array[attribute: String, comparision: String, value: Any]>)", function(assert) {
    var users = table.users;

    users(adapter.users)
        .select([
            [users.attributes.id, ">", 2],
            [users.attributes.email, "=", "bill@bill.com"]
        ])
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 3,
                    "users.email": "bill@bill.com"
                }], "should return rows where statements are true");
                assert.end();
            }
        });
});
