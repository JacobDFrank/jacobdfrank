import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <React.Fragment>
        <footer className="footer--container">
          <div className="footer--links">
            <a className="footer--link" target="_blank" href="mailto:frankjacob42@gmail.com?Subject=Hey%27s%20There" className="footer--link" target="_top">Email</a>
            <a className="footer--link" target="_blank" href="https://www.jacobdfrank.com/media/Jacob_Frank_Resume.pdf">Resume</a>
            <a className="footer--link" target="_blank" href="https://github.com/JacobDFrank">Github</a>
            <a className="footer--link" target="_blank" href="https://www.linkedin.com/in/jacobdfrank">LinkedIn</a>
            <a className="footer--link" target="_blank" href="https://twitter.com/jacobdfrank">Twitter</a>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
