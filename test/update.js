var tape = require("tape"),
    adapter = require("./adapter"),
    table = require("./table");


tape("update(attributes: Array<String>, values: Array<Any>, where: Array<Array[attribute: String, comparision: String, value: Any]>)", function(assert) {
    var users = table.users;

    users(adapter.users)
        .update(
            [users.attributes.email], ["new@new.com"], [
                ["users.id", "=", 1]
            ]
        )
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 1,
                    "users.email": "new@new.com"
                }], "should update rows with attrubtes and corresponding values where statements are true, and return updated rows");
                assert.end();
            }
        });
});
