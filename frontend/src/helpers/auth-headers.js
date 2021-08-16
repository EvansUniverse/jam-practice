import { AuthService } from "../services/auth.service";
import { defaultHeaders } from "./default-headers";

// Returns the default list of headers;
// adds the auth token if the user is logged in.
export function getHeaders() {
    var header = defaultHeaders
    if (AuthService.isLoggedIn()) {
      header['x-access-token'] = `${AuthService.currentUserValue.accessToken}`;
    }

    console.log(`Created header: ${header}`)
    return header
}