
let myApp = new Vue({

  el:"#root",

  data:{
    // MY API
    API_KEY:"112af51c0e7271e4d4b8c857cffac064",

    // REQUESTED MOVIES ARRAY
    movies:[],

    // REQUESTED TV-SERIES ARRAY
    series:[],

    // REQUESTED MOVIE CAST ARRAY
    movieCast:[],

    // REQUESTED TV-SERIES CAST ARRAY
    serieCast:[],

    //FILM PAGE COUNTER
    currentMoviesPage:1,

    //TV-SERIES PAGE COUNTER
    currentSeriesPage:1,

    //SEARCH QUERY FIELD
    query:"",


  },

  watch:{

    //ALLOWS NAVIGATION THROUGH MOVIES
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

    //ALLOWS NAVIGATION THROUGH TV-SERIES
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

  computed:{

  },

  methods:{

    // SEND A REQUEST FOR MOVIE AND TV SERIES
    // REQUESTED DATA ARE STORED IN DATA (movies and series)
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
    },

    nextSeriesPage:function(){
      this.currentSeriesPage++;
      document.getElementById('series-ul').scrollLeft = 0;
    },

    previousSeriesPage:function(){
      this.currentSeriesPage--;
      // document.getElementById('movie-ul').scrollTo({right:0});
    },

    getGenre:function(anArray){

      let genreArray=[];

      anArray.forEach(function(element){

         let genre = genresObjArray.find(function(el){
           return element == el.id
         });

         genreArray.push(genre.name);
      });

      return genreArray

    },

    //CALL FOR MOVIE CAST
    getMovieCast:function(id){
      axios.get("https://api.themoviedb.org/3/movie/"+ id + "/credits",{
        params:{
          'api_key':this.API_KEY,
        }
      })

      .then((result)=> {
        let castArray=[];
        for (i = 0; i<5; i++)
        {
          if(result.data.cast[i]){
          castArray.push(result.data.cast[i].name)
          }
        }

        this.movieCast= castArray
        console.log(this.movieCast)
      });

    },

    //CALL FOR TV SERIES CAST
    getSeriesCast:function(id){
      axios.get("https://api.themoviedb.org/3/tv/"+ id + "/credits",{
        params:{
          'api_key':this.API_KEY,
        }
      })

      .then((result)=> {
        let castArray=[];
        for (i = 0; i<5; i++)
        {
          if(result.data.cast[i]){
          castArray.push(result.data.cast[i].name)
          }
        }

        this.serieCast= castArray
        console.log(this.serieCast)
      });

    },

 },

});
