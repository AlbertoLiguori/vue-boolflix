
let myApp = new Vue({

  el:"#root",

  data:{
    API_KEY:"112af51c0e7271e4d4b8c857cffac064",
    movies:[],
    currentMoviesPage:1,
    currentSeriesPage:1,
    series:[],
    query:"",
  },

  watch:{
    currentMoviesPage:function(){
      axios.get("https://api.themoviedb.org/3/search/movie",{
        params:{
          'api_key':this.API_KEY,
          'query':this.query,
          'page':this.currentMoviesPage,
        }
      })
      .then((result)=> {

        this.movies = result.data.results
        console.log(this.movies)

      });

    },

    currentSeriesPage:function(){
      axios.get("https://api.themoviedb.org/3/search/tv",{
        params:{
          'api_key':this.API_KEY,
          'query':this.query,
          'page':this.currentSeriesPage,
        }
      })
      .then((result)=> {

        this.series = result.data.results
        console.log(this.series)

      });

    },

},

  methods:{

    getResult:function(){

        this.currentMoviesPage=1;

        axios.get("https://api.themoviedb.org/3/search/movie",{
          params:{
            'api_key':this.API_KEY,
            'query':this.query,
            'page':1,
          }
        })
        .then((result)=> {

          this.movies = result.data.results
          console.log(this.movies)

        });

        axios.get("https://api.themoviedb.org/3/search/tv",{
          params:{
            'api_key':this.API_KEY,
            'query':this.query,
            'page':1,
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

    nextMoviesPage:function(){
      this.currentMoviesPage++;
      document.getElementById('movies-ul').scrollLeft = 0;
    },

    previousMoviesPage:function(){
      this.currentMoviesPage--;
      // document.getElementById('movie-ul').scrollTo({right:0});
    },

    nextSeriesPage:function(){
      this.currentSeriesPage++;
      document.getElementById('series-ul').scrollLeft = 0;
    },

    previousSeriesPage:function(){
      this.currentSeriesPage--;
      // document.getElementById('movie-ul').scrollTo({right:0});
    },


 },

});
