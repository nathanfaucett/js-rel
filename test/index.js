var tape = require("tape"),
    rel = require("../src/index");


var usersAdapter = new rel.MemoryAdapter(),
    organizationsAdapter = new rel.MemoryAdapter(),
    organizationMembershipsAdapter = new rel.MemoryAdapter();


var users = rel.createTable("users", {
        id: "number",
        email: "string"
    }),
    organizations = rel.createTable("organizations", {
        id: "number",
        name: "string"
    }),
    organizationMemberships = rel.createTable("organization_memberships", {
        id: "number",
        user_id: "number",
        organization_id: "number"
    });


usersAdapter
    .createTable("users", {
        id: "number",
        email: "string"
    })
    .createRow("users", {
        id: 1,
        email: "bob@bob.com"
    })
    .createRow("users", {
        id: 2,
        email: "frank@frank.com"
    })
    .createRow("users", {
        id: 3,
        email: "bill@bill.com"
    });

organizationsAdapter
    .createTable("organizations", {
        id: "number",
        name: "string"
    })
    .createRow("organizations", {
        id: 1,
        name: "google"
    })
    .createRow("organizations", {
        id: 2,
        name: "mozilla"
    });

organizationMembershipsAdapter
    .createTable("organization_memberships", {
        id: "number",
        user_id: "number",
        organization_id: "number"
    })
    .createRow("organization_memberships", {
        id: 1,
        user_id: 1,
        organization_id: 1
    })
    .createRow("organization_memberships", {
        id: 2,
        user_id: 2,
        organization_id: 1
    })
    .createRow("organization_memberships", {
        id: 3,
        user_id: 3,
        organization_id: 2
    });

tape("select(where) should return rows where, where statements are true", function(assert) {
    var r = users(usersAdapter).select([
        [users.attributes.id, ">", 2],
        [users.attributes.email, "=", "bill@bill.com"]
    ]);

    r.run(function(error, results) {
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

tape("project(what) should return projection of row's attributes", function(assert) {
    var r = users(usersAdapter).project([users.attributes.id]);

    r.run(function(error, results) {
        if (error) {
            assert.end(error);
        } else {
            assert.deepEqual(results, [{
                "users.id": 1
            }, {
                "users.id": 2
            }, {
                "users.id": 3
            }]);
            assert.end();
        }
    });
});
tape("insert(attributes, values) should insert rows", function(assert) {
    var r = users(usersAdapter).insert([users.attributes.id, users.attributes.email], [
        [4, "new@new.com"]
    ]);

    r.run(function(error, results) {
        if (error) {
            assert.end(error);
        } else {
            assert.deepEqual(results, [{
                "users.id": 1,
                "users.email": "bob@bob.com"
            }, {
                "users.id": 2,
                "users.email": "frank@frank.com"
            }, {
                "users.id": 3,
                "users.email": "bill@bill.com"
            }, {
                "users.id": 4,
                "users.email": "new@new.com"
            }]);
            assert.end();
        }
    });
});
tape("remove(where) should remove rows where, where statements are true", function(assert) {
    var r = users(usersAdapter).remove([
        [users.attributes.id, "=", 4]
    ]);

    r.run(function(error, results) {
        if (error) {
            assert.end(error);
        } else {
            assert.deepEqual(results, [{
                "users.id": 1,
                "users.email": "bob@bob.com"
            }, {
                "users.id": 2,
                "users.email": "frank@frank.com"
            }, {
                "users.id": 3,
                "users.email": "bill@bill.com"
            }]);
            assert.end();
        }
    });
});
tape(
    "update(attributes, values, where) " +
    "should update rows with attrubtes and corresponding values where, where statements are true",
    function(assert) {
        var r = users(usersAdapter).update(
            [users.attributes.email], ["new@new.com"], [
                ["users.id", "=", 1]
            ]
        );

        r.run(function(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 1,
                    "users.email": "new@new.com"
                }, {
                    "users.id": 2,
                    "users.email": "frank@frank.com"
                }, {
                    "users.id": 3,
                    "users.email": "bill@bill.com"
                }]);
                assert.end();
            }
        });
    });
tape(
    "join(relation, on[, type]) where type is INNER_JOIN (default) " +
    "should return all rows when there is at least one match in both tables",
    function(assert) {
        var r = users(usersAdapter).select([
            [users.attributes.id, "=", 1]
        ]).join(
            organizationMemberships(organizationMembershipsAdapter), [
                [users.attributes.id, "=", organizationMemberships.attributes.user_id]
            ]
        ).join(
            organizations(organizationsAdapter), [
                [organizationMemberships.attributes.organization_id, "=", organizations.attributes.id]
            ]
        ).project([
            users.attributes.id,
            users.attributes.email,
            organizations.attributes.id,
            organizations.attributes.name
        ]);

        r.run(function(error, results) {
            if (error) {
                assert.end(error);
            } else {
                assert.deepEqual(results, [{
                    "users.id": 1,
                    "users.email": "new@new.com",
                    "organizations.id": 1,
                    "organizations.name": "google"
                }]);
                assert.end();
            }
        });
    });
