// Function to validate a URL using a regular expression
const isValidUrl = (urlString) => {
  // Regular expression pattern to validate the URL
  const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // Validate protocol (http or https)
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Validate domain name or IP address
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // Validate IPv4 address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // Validate query string
      '(\\#[-a-z\\d_]*)?$', 'i' // Validate fragment locator (optional)
  );
  
  // Return true if the URL matches the pattern, else false
  return urlPattern.test(urlString);
};

// Function to check if the input text is a valid URL
function checkForUrl(inputText) {
  return isValidUrl(inputText);  // Return the result of URL validation
}

// Export the checkForUrl function to use in other files
export { checkForUrl };
