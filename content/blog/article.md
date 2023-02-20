---
title: 向阳而生
author: 华晨宇
description: 这是一篇关于华晨宇的经历
---

# shebang-regex [![Build Status](https://travis-ci.org/sindresorhus/shebang-regex.svg?branch=master)](https://travis-ci.org/sindresorhus/shebang-regex)

> Regular expression for matching a [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) line

## H2 Install

```
$ npm install shebang-regex
```

## H2 Usage

```js
const shebangRegex = require('shebang-regex')

const string = '#!/usr/bin/env node\nconsole.log("unicorns");'

shebangRegex.test(string)
//=> true

shebangRegex.exec(string)[0]
//=> '#!/usr/bin/env node'

shebangRegex.exec(string)[1]
//=> '/usr/bin/env node'
```

# shebang-regex [![Build Status](https://travis-ci.org/sindresorhus/shebang-regex.svg?branch=master)](https://travis-ci.org/sindresorhus/shebang-regex)

> Regular expression for matching a [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) line

## H2 Install

```
$ npm install shebang-regex
```

## H2 Usage

```js
const shebangRegex = require('shebang-regex')

const string = '#!/usr/bin/env node\nconsole.log("unicorns");'

shebangRegex.test(string)
//=> true

shebangRegex.exec(string)[0]
//=> '#!/usr/bin/env node'

shebangRegex.exec(string)[1]
//=> '/usr/bin/env node'

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
```
