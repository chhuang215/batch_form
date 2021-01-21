const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwMBY90LI-sH9WRXa1Gg3J9Ap2meQMKUjw1n5m6dcrWIb4NplqtCbGj/exec'

// const form = document.forms['submit-to-google-sheet']

const INIT_RECORDS = 20;

const app = Vue.createApp({
    data() {
        return {
            groupName: '',
            contacts : []
        }
    },
    computed: {
        records() {
            return this.contacts.length;
        },
        validInputs(){
            let contacts = this.contacts;
            return contacts && contacts.filter(c=>c.name && c.mobile && c.phone).length > 0
        }
    },
    beforeMount (){
        this.contacts = new Array(INIT_RECORDS).fill(null).map(()=> ({name:"",phone:"",mobile:""}));
    },
    methods: {
        addContact: function(){
            this.contacts.push({name:"",phone:"",mobile:""});
        },
        sendForm: function () {
            console.log("send");
            fetch(SCRIPT_URL, { method: 'POST', body: new FormData(document.forms["submit-to-google-sheet"])})
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message))
        }
    }
})

app.mount('#registerForm')