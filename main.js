
let myApp = new Vue({

  el:"#root",

  data:{
    API_KEY:"112af51c0e7271e4d4b8c857cffac064",
    movies:[],
    query:"dragonball",
  },

  // computed:{
  //   starWidth:function(num){
  //     return {width: num +'%'};
  //   }
  // },


  methods:{

    getResult:function(){

        axios.get("https://api.themoviedb.org/3/search/movie",{
          params:{
            'api_key':this.API_KEY,
            'query':this.query
          }
        })
        .then((result)=> {

          this.movies = result.data.results
          console.log(this.movies)

        });
    },

    starWidth:function(num){
      return {width: (num*10) +'%'};
    }

 },

});
