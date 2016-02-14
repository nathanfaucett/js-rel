var tape = require("tape"),
    rel = require(".."),
    adapter = require("./adapter"),
    table = require("./table");


tape("variable args", function(assert) {
    var users = table.users;

    users(adapter.users)
        .select([
            [rel.arg("attribute"), rel.arg("comparator"), rel.arg("value")]
        ])
        .run({
            attribute: users.attributes.id,
            comparator: "=",
            value: 3
        }, function onRun(error, results) {
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
