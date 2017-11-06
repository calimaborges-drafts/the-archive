# Example

```bash
$ npm install sensitive-words --save
```

```javascript
const { sensitiveWords } = require('sensitive-words');
// ES2015 Modules
import { sensitiveWords } from 'sensitive-words';

const filtered = sensitiveWords(
    'The new apple macbook pro will have a touchbar',
    ['pro','touchbar']
);

console.log(filtered);
// The new apple macbook *** will have a ***
```



