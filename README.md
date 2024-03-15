# Hexo-react-filter

> Embed React component into markdown posts

## Install
copy all files to `hexo/node_modules/hexo-react-filter` or `npm install hexo-react-filter` (recommend)

## Usage
- create `hexo/source/_components/src` and `hexo/source/_components/assets`
- write React component in `hexo/source/_components/src/`
- export component in `hexo/source/_components/components.(js/jsx/ts/tsx)` file
- add `<React {...}/>` label in your md file, put the props in the curly braces.

## Example

In this example, `<React {"component": "Card", "name": "kyr1os"}/>` in md post will be converted to HTML of `<Card name="kyr1os"/>`

*hexo/source/_post/post.md*

`<React {"component": "Card", "name": "kyr1os"}/>`

*hexo/source/_components/components.js*

```js
const { Card } = require("./assets/card");

module.exports = {
    Card
};
```

*hexo/source/_components/src/card.jsx*

```
import React from "react";

export const Card = ({name}) => {
    
  return (
    <div className="text-xl font-medium text-black">{name}</div>
  );
};
```

Then run

`npm run build`

Now you can use `hexo g & hexo s` to get the site.

You can also integrate the build of `hexo-react-filter` before `hexo g` by adding a small script.

Please note for the `<React {props}>` in post:
    - the props should NOT contain nested braces
    - "component" is REQUIRED in props.

## License
This software is free to use under the MIT license.