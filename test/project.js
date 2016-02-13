var tape = require("tape"),
    adapter = require("./adapter"),
    table = require("./table");


tape("project(what: Array<String>)", function(assert) {
    var users = table.users;

    users(adapter.users)
        .project([users.attributes.id])
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 1
                }, {
                    "users.id": 2
                }, {
                    "users.id": 3
                }], "should return projection of row's attributes");
                assert.end();
            }
        });
});
