import http from "../http-common";
import { BehaviorSubject } from 'rxjs';
import { handleApiError } from "../helpers/http-handlers";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const AuthService = {
  login,
  logout,
  register,
  isLoggedIn,
  isAdmin,
  isModerator,
  getUsername,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
};

function isLoggedIn(){
  return AuthService.currentUserValue && AuthService.currentUserValue.accessToken
}

function isAdmin(){
  return AuthService.currentUserValue && 
      AuthService.currentUserValue.role && 
      AuthService.currentUserValue.role === 'admin'
}

function isModerator(){
  return AuthService.currentUserValue && 
      AuthService.currentUserValue.role && 
      AuthService.currentUserValue.role === 'moderator'
}

function getUsername() {
  if (AuthService.currentUserValue && AuthService.currentUserValue.username){
    return AuthService.currentUserValue.username
  }
  return "Guest"
}

function login(data) {
  return http.post("/auth/login", data)
    .then(response => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      currentUserSubject.next(response.data);
      console.log(`Login success: ${response.data}`)
      return response;
    })
    .catch(err => {
      return handleApiError(err);
    });
}

// Remove user from local storage to log user out.
// Note: does not invalidate auth token with backend (yet)
function logout() {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}

function register(data) {
  return http.post("/auth/register", data)
    .then(response => {
      console.log(`Registration success: ${response}`)
      return response;
    })
    .catch(err =>{
      return handleApiError(err);
    });
}