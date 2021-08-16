// By default, these headers will be added to every outbound API request.
// This has to be in its own file to avoid a circular dependency, since http-common uses it.
export const defaultHeaders = {
  "Content-type": "application/json"
}