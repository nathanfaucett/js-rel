var assert = require("assert"),
    rel = require("../src/index");


var adaptor = new rel.MemoryAdaptor();


adaptor
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

adaptor
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

adaptor
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

describe("rel", function() {
    it("should", function(done) {
        var relation = rel("users", [
                ["user.id", ">", 2]
            ]).project(["user.id"]),
            run = rel.compile(relation, adaptor);

        run(function(error, results) {
            if (error) {
                console.log(error);
                done();
            } else {
                assert.deepEqual(results, [{
                    "user.id": 3
                }]);
                done();
            }
        });
    });
});
