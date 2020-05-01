# ewea-api-client

[![Build Status](https://travis-ci.com/CodeTanzania/ewea-api-client.svg?branch=develop)](https://travis-ci.org/CodeTanzania/ewea-api-client)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

http client for EMIS API.

## Installation

```sh
npm install --save @codetanzania/ewea-api-client
```

## Usage

For React application and ES6 usage

```js
import {
  getAlerts,
  getAlert,
  postAlert,
  putAlert,
  patchAlert,
  deleteAlert
} from '@codetanzania/ewea-api-client';

getAlerts().then(plans => { ... }).catch(error => { ... });

getAlert('5c1766243c9d520004e2b542').then(plan => { ... }).catch(error => { ... });

postAlert({ description: 'Voluptas' }).then(plan => { ... }).catch(error => { ... });

putAlert({ _id: '5c1766243c9d520004e2b542', description: 'Voluptas' })
  .then(plan => { ... }).catch(error => { ... });

patchAlert({ _id: '5c1766243c9d520004e2b542', description: 'Voluptas' })
  .then(plan => { ... }).catch(error => { ... });

deleteAlert('5c1766243c9d520004e2b542').then(plan => { ... }).catch(error => { ... });
```

For Node application(commonjs)

```js
const { getAlerts } = require('@codetanzania/ewea-api-client');
getAlerts().then(plans => { ... }).catch(error => { ... });
```

To issue parallel request

```js
const {
 getIncidentTypes,
 getAlerts,
 all,
 spread
} = require('@codetanzania/ewea-api-client');

const request = all(getIncidentTypes(), getAlerts());
request.then(spread((incidentTypes, plans) => { ... })).catch(error => { ... });
```

### Filtering results

For filtering or searching data from the API you need to pass param object into the get methods e.g

- Limit returned results

```js
getAlerts({ limit: 5 })
  .then((results) => {})
  .catch((error) => {});
```

- Search using a keyword

```js
getAlerts({ q: 'Warning' })
  .then((results) => {})
  .catch((error) => {});
```

- Filtering using properties

i.e Filtering plans which have incident type with `ObjectID` and are in specified boundary which object id(s) in array after `$in` operator.

```js
getAlerts({ filter: { incidentType: ObjectID, boundary: { $in: [] } } })
  .then((results) => {
    // continue here
  })
  .catch(() => {
    // handle error here
  });
```

Param object supports all [mongodb operators](https://docs.mongodb.com/manual/reference/operator/query/) ($regex, $gt, $gte, $lt, $lte, $ne, \$in, etc.)

> Note API URL will be picked from environment variable. This client reads process.env.REACT_APP_EMIS_API_URL or process.env.EMIS_API_URL

## Testing

If you want to test this library,

- first clone this repo
- Install all dependencies

  ```sh
  npm install
  ```

- Run test
  ```sh
  npm test
  ```

## How to contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## LICENSE

MIT License

Copyright (c) 2019 - present Code Tanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
