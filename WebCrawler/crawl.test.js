const { normalizeURL, getURLsFromHTML } = require('./crawl');
const { test, expect } = require('@jest/globals');


test('normalizeURL strip protocol', () => {
  const input = 'https://github.com/chaotic916/JavaScript_Projects';

  const actual = normalizeURL(input);
  const expected = 'github.com/chaotic916/JavaScript_Projects';
  // expecting the two to be equal
  expect(actual).toEqual(expected)
});


// With an absolute address
test('getURLsFromHTML absolute', () => {
  const inputHTMLBody= `
    <html>
      <body>
        <a href = 'https://github.com/chaotic916/JavaScript_Projects'>
          This is my repository
        </a>
      </body>
    </html>`
  const inputBaseURL = 'https://github.com/chaotic916/JavaScript_Projects'

  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://github.com/chaotic916/JavaScript_Projects'];
  expect(actual).toEqual(expected)
});


// With a relative address
test('getURLsFromHTML relative', () => {
  const inputHTMLBody= `
    <html>
      <body>
        <a href = '/chaotic916/JavaScript_Projects/'>
          This is my repository
        </a>
      </body>
    </html>
    `
  const inputBaseURL = 'https://github.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ['https://github.com/chaotic916/JavaScript_Projects/']
  expect(actual).toEqual(expected)
});



// If the case is complicated
test('getURLsFromHTML mixed', () => {
  const inputHTMLBody= `
    <html>
      <body>
        <a href = '/chaotic916/JavaScript_Projects1/'>
          This is my repository 1
        </a>
        <a href = 'https://github.com/chaotic916/JavaScript_Projects2/'>
          This is my repository 2
        </a>
      </body>
    </html>
    `
  const inputBaseURL = 'https://github.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = [
    'https://github.com/chaotic916/JavaScript_Projects1/',
    'https://github.com/chaotic916/JavaScript_Projects2/',
  ]
  expect(actual).toEqual(expected)
});



// if the address is invalid
test('getURLsFromHTML invalid', () => {
  const inputHTMLBody= `
    <html>
      <body>
        <a href = 'sdfsfsdfsf'>
          This is my repository
        </a>
      </body>
    </html>
    `
  const inputBaseURL = 'https://github.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = []
  expect(actual).toEqual(expected)
});