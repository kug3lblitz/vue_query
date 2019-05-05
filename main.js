const jqalerts = new Vue({
    el: '#app',
    methods: {
        doSomething: function(){
            alert("I DIDITS");
        }
    }
});

const jqchangetext = new Vue({
    el: '#app1',
    data: {
        resultText: ''
    },
    methods: {
        doSomething: function(){
            this.resultText = 'You DIDITS'
        }
    }
});

const jqreadwritevars = new Vue({
    el:'#calcForm',
    data: {
        first: 13,
        second: 19,
        operator : '+',
    },
    computed: {
        c: function() {
            switch (this.operator) {
                case '+':
                    return this.first + this.second
                    break;
                case '-':
                    return this.first - this.second
                    break;
                case '*':
                    return this.first * this.second
                    break;
                case '/':
                    return this.first / this.second
                    break;
            }
        }
    }
});

const usingAjax = new Vue({
    el: '#usingajax',
    data: {
        movies: []
    },
    created() {
        fetch('https://swapi.co/api/films')
        .then(res => res.json())
        .then(res => {
            this.movies = res.results;
        });
    }
})

const productAPI = 'https://wt-c2bde7d7dfc8623f121b0eb5a7102930-0.sandbox.auth0-extend.com/productSearch';

const foodgamesSearch = new Vue({
    el:'#foodgames',
    data: {
        search: '',
        category: '',
        status: '',
        results: null,
        searchBtnDisabled: false
    },
    methods: {
        searchProducts:function() {
            this.results = null;
            this.status = '';

            if(this.search === '' && this.category === '') {
                this.status = 'You must enter a term or select a category.';
                return;
            }

            this.searchBtnDisabled = true;
            this.status = 'Searching - please stand by...';

            fetch(productAPI, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({name:this.search,category:this.category})
            }).then(res => res.json())
            .then(res => {
                this.status = '';
                this.searchBtnDisabled = false;
                this.results = res.results;
                if(this.results.length === 0) this.status = '<p>Sorry, no results!</p>';
            });
        }
    }
});
