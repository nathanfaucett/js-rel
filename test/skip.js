var tape = require("tape"),
    adapter = require("./adapter"),
    table = require("./table");


tape("skip(count: Number)", function(assert) {
    var users = table.users;

    users(adapter.users)
        .select()
        .skip(2)
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 3,
                    "users.email": "bill@bill.com"
                }]);
                assert.end();
            }
        });
});
