function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;

            document.write('Hello, ', user.displayName, '!');

            console.log(user)

            const app = firebase.app();

            const db = firebase.firestore();
            
            var record = db.collection('users').doc(user.uid)

            record.get()
                .then(docSnapshot => {
                    if (docSnapshot.exists) {
                        record.update(
                            {
                                logins: firebase.firestore.FieldValue.increment(1)
                            }
                        );
                    } else {
                        record.set(
                            {
                                logins: 1
                            }
                        );
                    }
                });
        })
        .catch(console.log)
}