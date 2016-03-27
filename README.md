# spectacle-code-slide

Present code with style.

<img src="demo.gif" width="400"/>

> _Dude, you just changed the code presentation game_ – @kenwheeler

## Install

```
$ npm install --save spectacle-code-slide
```

## Usage

```js
import CodeSlide from 'spectacle-code-slide';

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={[]} transitionDuration={0} progress="bar">
          // ...
          <CodeSlide
            transition={[]}
            lang="js"
            code={require("raw!../assets/code.example")}
            ranges={[
              { loc: [0, 270], title: "Walking through some code" },
              { loc: [0, 1], title: "The Beginning" },
              { loc: [1, 2] },
              { loc: [1, 2], note: "Heres a note!" },
              { loc: [2, 3] },
              { loc: [4, 7] },
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
