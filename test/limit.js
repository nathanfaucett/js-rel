var tape = require("tape"),
    adapter = require("./adapter"),
    table = require("./table");


tape("limit(count: Number)", function(assert) {
    var users = table.users;

    users(adapter.users)
        .select()
        .limit(1)
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 1,
                    "users.email": "new@new.com"
                }]);
                assert.end();
            }
        });
});
