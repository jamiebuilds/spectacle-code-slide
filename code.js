module.exports = `import CodeSlide from 'spectacle-code-slide';

function Presentation() {
  return (
    <Spectacle theme={theme}>
      <Deck
        transition={[]}
        transitionDuration={0}
        progress="bar">
        // ...
        <CodeSlide
          transition={[]}
          lang="js"
          code={'...code...'}
          ranges={[
            { loc: [0, 270],
              title: "Here's a title!" },
            { loc: [0, 1] },
            { loc: [1, 2] },
            { loc: [1, 2],
              note: "Heres a note!" },
            { loc: [2, 3] },
            { loc: [4, 7] },
            { loc: [8, 10] },
            // ...
          ]}/>
        // ...
      </Deck>
    </Spectacle>
  );
}`;
