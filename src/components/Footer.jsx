import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className="footer-container">
          <div className="courtesy">
            <a href="mailto:hi@jacobdfrank.com?Subject=What%27s%20Brackin" target="_top">Email Me</a>
            <a href="https://www.jacobdfrank.com/media/Jacob_Frank_Resume.pdf">Resume</a>
            <a href="https://github.com/JacobDFrank">Github</a>
            <a href="https://www.linkedin.com/in/jacobdfrank">LinkedIn</a>
            <a href="https://twitter.com/jacobdfrank">Twitter</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
