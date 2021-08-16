// // The handleResponse function checks responses from the api to see if the request was unauthorised,
// // forbidden, or unsuccessful.
import { AuthService } from '../services/auth.service';

export default function handleResponse(response) {
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