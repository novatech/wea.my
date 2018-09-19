import React from 'react';

export default class HTML extends React.Component {
  render() {
    return (
      <html lang="en" {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.props.headComponents}
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
}
