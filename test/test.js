var assert = require("assert"),
    rel = require("../src/index");


var usersAdapter = new rel.MemoryAdapter(),
    organizationsAdapter = new rel.MemoryAdapter(),
    organizationMembershipsAdapter = new rel.MemoryAdapter();


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


describe("rel(from, adapter)", function() {
    describe("select(where)", function() {
        it("should return rows where, where statements are true", function(done) {
            var r = rel("users", usersAdapter).select([
                ["users.id", ">", 2],
                ["users.email", "=", "bill@bill.com"]
            ]);

            r.run(function(error, results) {
                if (error) {
                    done(error);
                } else {
                    assert.deepEqual(results, [{
                        "users.id": 3,
                        "users.email": "bill@bill.com"
                    }]);
                    done();
                }
            });
        });
    });
    describe("project(what)", function() {
        it("should return projection of row's attributes", function(done) {
            var r = rel("users", usersAdapter).project(["users.id"]);

            r.run(function(error, results) {
                if (error) {
                    done(error);
                } else {
                    assert.deepEqual(results, [{
                        "users.id": 1
                    }, {
                        "users.id": 2
                    }, {
                        "users.id": 3
                    }]);
                    done();
                }
            });
        });
    });
    describe("insert(attributes, values)", function() {
        it("should insert rows", function(done) {
            var r = rel("users", usersAdapter).insert(["users.id", "users.email"], [
                [4, "new@new.com"]
            ]);

            r.run(function(error, results) {
                if (error) {
                    done(error);
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
                    done();
                }
            });
        });
    });
    describe("remove(where)", function() {
        it("should remove rows where, where statements are true", function(done) {
            var r = rel("users", usersAdapter).remove([
                ["users.id", "=", 4]
            ]);

            r.run(function(error, results) {
                if (error) {
                    done(error);
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
                    done();
                }
            });
        });
    });
    describe("update(attributes, values, where)", function() {
        it("should update rows with attrubtes and corresponding values where, where statements are true", function(done) {
            var r = rel("users", usersAdapter).update(
                ["users.email"], ["new@new.com"], [
                    ["users.id", "=", 1]
                ]
            );

            r.run(function(error, results) {
                if (error) {
                    done(error);
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
                    done();
                }
            });
        });
    });
    describe("join(relation, on[, type])", function() {
        describe("where type is INNER_JOIN (default)", function() {
            it("should return all rows when there is at least one match in both tables", function(done) {
                var r = rel("users", usersAdapter).select([
                    ["users.id", "=", 1]
                ]).join(
                    rel("organization_memberships", organizationMembershipsAdapter), [
                        ["users.id", "=", "organization_memberships.user_id"]
                    ]
                ).join(
                    rel("organizations", organizationsAdapter), [
                        ["organization_memberships.organization_id", "=", "organizations.id"]
                    ]
                ).project([
                    "users.id",
                    "users.email",
                    "organizations.id",
                    "organizations.name"
                ]);

                r.run(function(error, results) {
                    if (error) {
                        done(error);
                    } else {
                        assert.deepEqual(results, [{
                            "users.id": 1,
                            "users.email": "new@new.com",
                            "organizations.id": 1,
                            "organizations.name": "google"
                        }]);
                        done();
                    }
                });
            });
        });
    });
});
