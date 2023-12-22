const { crawlPage } = require('./crawl');


// The entry point of the application
function main() {
  if (process.argv.length < 3) {
    console.log("No website provided for the action")
    process.exit(1)
  }
  if (process.argv.length > 3) {
    console.log("Too many command line arguments")
    process.exit(1)
  }

  // process.argv[2] and onwards are the command-line arguments provided by the user
  const baseURL = process.argv[2]

  console.log(`Crawling initiated: ${baseURL}`)
  crawlPage(baseURL);
};

main();