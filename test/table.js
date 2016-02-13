var rel = require(".."),
    adapter = require("./adapter");


var table = exports;


table.users = rel.createTable("users", {
    id: "number",
    email: "string"
});

table.organizations = rel.createTable("organizations", {
    id: "number",
    name: "string"
});

table.organizationMemberships = rel.createTable("organization_memberships", {
    id: "number",
    user_id: "number",
    organization_id: "number"
});


adapter.users
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

adapter.organizations
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

adapter.organizationMemberships
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
