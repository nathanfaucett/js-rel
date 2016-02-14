var rel = require("..");


var adapter = exports;


adapter.users = new rel.MemoryAdapter();
adapter.organizations = new rel.MemoryAdapter();
adapter.organizationMemberships = new rel.MemoryAdapter();
