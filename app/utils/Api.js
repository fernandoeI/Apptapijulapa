import * as firebase from "firebase";

export const reauthenticate = currentPassword => {
  const user = firebase.auth().currentUser;
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  return user.reauthenticateWithCredential(credentials);
};
