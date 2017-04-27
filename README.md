# [spectacle](http://stack.formidable.com/spectacle)-code-slide

Present code with style using [spectacle](https://github.com/FormidableLabs/spectacle).

<img src="demo.gif" width="400"/>

> _Dude, you just changed the code presentation game_ – [@kenwheeler](https://github.com/kenwheeler)

## Install

```
$ npm install --save spectacle
$ npm install --save spectacle-code-slide
```

## Usage

```js
import React from 'react';
import { Spectacle, Deck } from 'spectacle';
import CodeSlide from 'spectacle-code-slide';
import shiaLabeoufMagicGif from "./shiaLabeoufMagic.gif"
import preloader from "spectacle/lib/utils/preloader";

preloader({
  shiaLabeoufMagicGif
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={[]} transitionDuration={0} progress="bar">
          // ...
          <CodeSlide
            transition={[]}
            lang="js"
            code={require("raw-loader!../assets/code.example")}
            ranges={[
              { loc: [0, 270], title: "Walking through some code" },
              { loc: [0, 1], title: "The Beginning" },
              { loc: [1, 2] },
              { loc: [1, 2], note: "Heres a note!" },
              { loc: [2, 3] },
              { loc: [4, 7], image: shiaLabeoufMagicGif },
              { loc: [8, 10] },
              // ...
            ]}/>
          // ...
        </Deck>
      </Spectacle>
    );
  }
}
```

## Syntax Highlighting

Provided by [PrismJS](https://github.com/PrismJS/prism). See http://prismjs.com/ for docs.
