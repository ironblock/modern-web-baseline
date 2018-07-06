// @flow
/* eslint react/no-danger: 0 */
// HTML ROOT COMPONENT / SERVER ENTRY POINT
// =============================================================================
// Rather than use a static HTML file and populate it with dynamic content, we
// use a full React <html> element in conjunction with Helmet to maintain
// control over the entire webapp.

// This component contains the HTML metadata and other boilerplate. It is ONLY
// used server side (for initial render), and lacks only "<!DOCTYPE html>",
// which is provided as a string literal by the Node webserver.

import React from 'react';
import Helmet from 'react-helmet';

type Props = {
  css: Array<string>,
  js: Array<string>,
  html: string,
  initialState: string,
};

const Html = (props: Props) => {
  const head = Helmet.rewind();

  return (
    <html lang="en" {...head.htmlAttributes.toComponent()}>
      <head>
        { head.base.toComponent() }
        { head.title.toComponent() }
        { head.meta.toComponent() }
        { head.link.toComponent() }
        { head.script.toComponent() }

        {/* Disable zooming to prevent any UI bugs */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        {/* Display no content on the page until things are loaded */}
        <style
          id="HIDE_FOUC"
          dangerouslySetInnerHTML={{ __html: '#REACT_ROOT { opacity: 0; }' }}
        />

        {/* STYLESHEET BUNDLES */}
        { props.css.map(path => (
          <link
            key={path}
            href={`/assets/${path}`}
            rel="stylesheet"
          />
        )) }
      </head>

      <body>
        {/* REACT CONTENT */}
        <div
          id="REACT_ROOT"
          dangerouslySetInnerHTML={{ __html: props.html }}
        />

        {/* APP STATE */}
        <script
          dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${props.initialState}` }}
        />

        {/* SCRIPT BUNDLES */}
        { props.js.map(path => (
          <script
            key={path}
            src={`/assets/${path}`}
            defer
          />
        )) }
      </body>
    </html>
  );
};

export default Html;
