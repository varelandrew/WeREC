function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

            .then(result => {
                const user = result.user;
                document.write('Hello ', user.displayName, user.uid);
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
                                    logins: 0
                                }
                            );
                        }
                    });

                /*
                if (user.uid.empty) {
                    const users = db.collection('users').doc(user.uid).update(
                        {
                            logins: firebase.firestore.FieldValue.increment(1)
                        }
                    );
                    console.log('flag1', user.uid.logins)
                }
                else {
                    const users = db.collection('users').doc(user.uid).set(
                        {
                            logins: 0
                        }
                    );
                    console.log('flag2', user.uid.logins)
                }
                */

            })
            .catch(console.log)
}