import React from 'react';

const Intro = function statelessFunctionComponentClass() {
  return (
    <section>
      <h2>
        <b>Hey Hey</b>
        —
        <b>I&apos;m Jacob Frank, a designer, student, developer, and aspiring manager
        </b>
      </h2>
      <code className="meta-data code" style={{ fontSize: 0.65 + 'em' }}>Currently redesigning folio site and working on <a className="faux-link" href="https://www.thoughtatwork.org">Thought At Work</a>. Incoming Experience designer on the design systems tooling team at Adobe.</code>
    </section>
  );
};

export default Intro;