//To manage auth state in the frontend of the application, 
//the frontend needs to be able to store, retrieve, and delete the auth credentials that are received from the server on successful user sign in.
//In our MERN applications, we will use the browser's sessionsStorage as the storage option to store the JWT auth credentials.
//Alternatively, you can use localStorage instead of sessionStorage to store the JWT credentials. 
//With sessionStorage, the user auth state will only be remembered in the current window tab.With localStorage, the user auth state will be remembered across tabs in a browser.
import { signout } from './api-auth.js'

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },
  clearJWT(cb) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
    cb()
    //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  },
  updateUser(user, cb) {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem('jwt')) {
        let auth = JSON.parse(sessionStorage.getItem('jwt'))
        auth.user = user
        sessionStorage.setItem('jwt', JSON.stringify(auth))
        cb()
      }
    }
  }
}

export default auth
