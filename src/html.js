import React from 'react';

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    // eslint-disable-next-line global-require
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === `production`) {
      // eslint-disable-next-line react/no-danger
      css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />;
    }
    return (
      <html lang="en" {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
          <script async type="text/javascript" src="/burger.js" />
        </body>
      </html>
    );
  }
};
