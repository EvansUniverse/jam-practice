import { AuthService } from "../services/auth.service";

// Returns the appropriate response for any API error
export function handleApiError(error) {
    console.log(`API error: ${error}`)
    if (error.response) {
      // Request made and server responded
      console.log(`Error code ${error.response.status}: ${error.response.data.message}`);
      return error.response.data.message;
    } else if (error.request) {
      console.log("The request was made but no response was received. Request:");
      console.log(error.request);
      return error.request;
    } else {
      console.log(`Error: ${error.message}`);
      return error.message;
    }
  }

// Checks responses from the api to see if the request was unauthorised,
// forbidden, or unsuccessful.
export function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if ([401, 403].indexOf(response.status) !== -1) {
              // Auto logout if 401 Unauthorized or 403 Forbidden response returned from API.
              // This handles the case where the user token is no longer valid.
              AuthService.logout();
              //location.reload(true); //TODO figure out what to do here to reload
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}