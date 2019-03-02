import React from 'react';

const Intro = function statelessFunctionComponentClass() {
  return (
    <section>
      <h2 style={{ paddingBottom: 8 + 'px' }}>
        <b>Name's Jacob, and this here's my website. I'm a designer, developer, and aspiring manager.
        </b>
      </h2>
      <code className="meta-data code" style={{ fontSize: 0.7 + 'em' }}>Currently redesigning my portfolio and working on <a className="faux-link" href="https://www.thoughtatwork.org">Thought At Work</a>. Incoming Experience designer on the design systems tooling team at Adobe.
      </code>
    </section>
  );
};

export default Intro;