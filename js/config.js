((d, c, f) => {
    ;
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCHuZiA7OkfdAgZN1OTKNn7EAUZPmVq130",
        authDomain: "edteam-60e77.firebaseapp.com",
        databaseURL: "https://edteam-60e77.firebaseio.com",
        projectId: "edteam-60e77",
        storageBucket: "edteam-60e77.appspot.com",
        messagingSenderId: "441298748147"
    };
    f.initializeApp(config);
    let db = f.database();
    var app = new Vue({
        el: '#app',
        created() {
            this.showContacts();
        },
        data: {
            send: {
                name: '',
                email: '',
                description: '',
                status: true,
                type: 'contact'
            },
            contacts: []
        },
        methods: {
            sendContact() {
                console.log('sendContact');
                db.ref().child('Contact').push(this.send)
                this.send = {
                    name: '',
                    email: '',
                    description: '',
                    status: true,
                    type: 'contact'
                }
                this.showContacts();
            },
            showContacts() {
                console.log('showContact');
                let getContacts = db.ref().child('Contact');
                this.contacts = [];
                getContacts.on('value', data => {
                    for (const key in data.val()) {
                        if (data.val().hasOwnProperty(key)) {
                            let tempContact = {
                                id: key,
                                description: data.val()[key].description,
                                name: data.val()[key].name,
                                email: data.val()[key].email,
                                status: data.val()[key].status,
                                type: data.val()[key].type,
                                edit: false
                            }
                            this.contacts.push(tempContact)
                        }
                    }
                })
            },

            deleteContact(contact) {
                console.log('delete', contact)
                db.ref('Contact/' + contact.id).remove();
                this.showContacts();
            },
            editContact(contact) {
                console.log('edit', contact)
                db.ref('Contact/' + contact.id).set(contact)
                contact.edit = !contact.edit;
                this.showContacts();
            },
            manageEdit(contact) {
                console.log('manage', contact)
                contact.edit= !contact.edit
                this.contacts.map((tmp) => {
                    console.log(tmp);
                })
            }
        }
    })

})(document, console.log, firebase)