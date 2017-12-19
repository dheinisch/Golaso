import firebase from 'react-native-firebase';

export const onSignIn = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                resolve(user !== null)})
            .catch(error => reject(error));
    });
};

export const onSignOut = () => firebase.auth().signOut();

export const onSignUp = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => resolve(user !== null))
            .catch(error => reject(error));
    });
};

export const isSignedIn = () => {
    return new Promise((resolve) => {
        let user = firebase.auth().currentUser;
        resolve(user !== null);
    });
};
