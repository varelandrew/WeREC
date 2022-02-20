function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

            .then(result => {
                const user = result.user;
                document.write('Hello ', user.displayName, user.uid);
                console.log(user)
                
                const app = firebase.app();

                const db = firebase.firestore();

                const users = db.collection('users').doc(user.uid).update(
                    {
                        logins: firebase.firestore.FieldValue.increment(1)
                    }
                );

            })
            .catch(console.log)
}