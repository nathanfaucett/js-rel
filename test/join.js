var tape = require("tape"),
    adapter = require("./adapter"),
    table = require("./table");


tape("join(relation: Relation, on: Array<Array[attribute: String, comparision: String, value: Any]>[, type: String]) where type is INNER_JOIN (default)", function(assert) {
    var users = table.users,
        organizations = table.organizations,
        organizationMemberships = table.organizationMemberships;

    users(adapter.users)
        .select([
            [users.attributes.id, "=", 1]
        ])
        .join(
            organizationMemberships(adapter.organizationMemberships), [
                [users.attributes.id, "=", organizationMemberships.attributes.user_id]
            ]
        )
        .join(
            organizations(adapter.organizations), [
                [organizationMemberships.attributes.organization_id, "=", organizations.attributes.id]
            ]
        )
        .project([
            users.attributes.id,
            users.attributes.email,
            organizations.attributes.id,
            organizations.attributes.name
        ])
        .run(function onRun(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 1,
                    "users.email": "new@new.com",
                    "organizations.id": 1,
                    "organizations.name": "google"
                }], "should return all rows when there is at least one match in both tables");
                assert.end();
            }
        });
});
