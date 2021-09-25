to add many logs for developement use add in mongo/logs.repository.js

import dummy logs:

```
const dummyLogs = require('../../../dummyData/dummyLogs');
```

replace code temporarily with:

```
const dummyLogsWithId = dummyLogs.map((log) => ({
  ...log,
  id: '<ID OF DUMMY USER>',
}));
Log.collection.insertMany(dummyLogsWithId);
```
