export function checkStatus(response) {
  console.log("checkStatus", response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }   
  else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  console.log("parseJSON", response);
  return response.json();
}