
let myApp = new Vue({

  el:"#root",

  data:{
    API_KEY:"112af51c0e7271e4d4b8c857cffac064",
    movies:[],
    series:[],
    query:"dragonball",
  },

  methods:{

    getResult:function(){

        axios.get("https://api.themoviedb.org/3/search/movie",{
          params:{
            'api_key':this.API_KEY,
            'query':this.query,
            // 'page':20,
          }
        })
        .then((result)=> {

          this.movies = result.data.results
          console.log(this.movies)

        });

        axios.get("https://api.themoviedb.org/3/search/tv",{
          params:{
            'api_key':this.API_KEY,
            'query':this.query
          }
        })
        .then((result)=> {

          this.series = result.data.results
          console.log(this.series)

        });
    },

    getImage:function(blabla){
      return "https://image.tmdb.org/t/p/w342/" + blabla
    },



    starWidth:function(num){
      return {width: (num*10) +'%'};
    },

    getFlag:function(langAbb){
      let langObj= languageArray.find(function(element){
        return element.abbreviation.includes(langAbb)
      });
      if (langObj){
        return langObj.flag
      }else{
        return "🏳️‍🌈"
      }
    },


 },

});
