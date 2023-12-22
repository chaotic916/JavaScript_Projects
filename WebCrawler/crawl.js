const { JSDOM } = require('jsdom');


async function crawlPage(currentURL) {
  console.log(`we are crawling now: ${currentURL}`)

  const resp = await fetch(currentURL)

  console.log(await resp.text())
}


// Fetch URL from the HTML source
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  // To extract <a href>
  const linkElements = dom.window.document.querySelectorAll('a');

  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0,1) === '/') {
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`)
        urls.push(urlObj.href); // if the url is relative and valid
      } catch (err) {
        console.log(`error with relative url: ${err.message}`)
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href); // if the url is absolute and valid
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`)
      }
    }
  }
  return urls;
};


// To normalize the url by removing '/'
function normalizeURL(urlString) {
  try {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1) // everything except the last character
  };
  return hostPath;
  } catch { 
    // Handle invalid URL case
    console.error(`Invalid URL: ${urlString}`);
    return urlString;
  }
};

module.exports = {
  normalizeURL, getURLsFromHTML, crawlPage,
};