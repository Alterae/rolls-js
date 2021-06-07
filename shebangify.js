#!/usr/bin/env node
let fs = require("fs");
let path = process.argv[2];
let data = "#!/usr/bin/env node\n\n";
data += fs.readFileSync(path);
fs.writeFileSync(path, data);
