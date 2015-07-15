rel
=======

rel for the browser and node.js


```javascript
var rel = require("rel");

var adapter = new SomeAdapter();

var users = rel.createTable("users", {
    id: "number",
    email: "string"
});

// creates new from relation using adapter
users(adapter)
    
    // creates new select relation from parent
    .select([
        [users.attributes.id, ">", 2],
        [users.attributes.email, "=", "bill@bill.com"]
    ])
    
    // compiles relation using adapter and runs it
    .run(function(error, results) {
        if (error) {
            // handle error
        } else {
            // handle results
        }
    });

```