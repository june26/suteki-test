<template>
  <div class="bg-1" v-bind:style="{ 'background-image': 'linear-gradient(transparent, #202125 75%), url(' + bannerMovie.Poster + ')' }">
    <b-container fluid>
      <b-jumbotron class="movie-cover-section">
        <h2 class="text-white">{{bannerMovie.Production}}</h2>
        <h3 class="text-white">{{bannerMovie.Actors}}</h3>
        <h1>{{bannerMovie.Title}}</h1>
        <div class="pt-lg-5 mt-lg-5 pt-3">
          <div class="d-flex justify-content-start align-items-center pointer" >  
            <h4  @click="openModal(bannerMovie.imdbID)" class="mb-0 align-self-bottom see-detail mr-3">DETAIL MOVIE</h4>
            <img src="../assets/arrow-right.png" class="arrow-right img-fluid mx-3" alt="right">
          </div>
        </div>
      </b-jumbotron>
      <b-row class="mx-lg-5 pb-4">
        <b-col cols="4" md="4" lg="2" class="align-self-center d-none d-md-block">
          <h5 class="mb-0 category-title text-white">TRENDING MOVIE</h5>
        </b-col>
        <b-col cols="12" md="4" lg="3">
          <div class="d-flex justify-content-start">
            <img src="../assets/search.svg" class="img-fluid" alt="search" @click="onSearch"/>
            <span class="divider mx-3" />
            <b-form-input
              type="search"
              v-model="searchVal"
              class="custom-search px-0"
              placeholder="Search movie here"
              v-on:keydown.enter="onSearch"
              ></b-form-input>
          </div>
        </b-col>
      </b-row>
      <b-row class="mx-lg-5">
        <b-col class="pb-4" cols="6" sm="6" xl="2" v-for="n in 12" v-show="isFetching === true" :key="Math.random()">
          <b-skeleton-img></b-skeleton-img>
        </b-col>
        <b-col cols="6" sm="6" md="3" lg="2" class="mb-3" v-for="(item, index) in data" :key="index" v-show="isFetching === false">
          <div @click="changeBanner(item.Title)" class="pointer">
            <img v-bind:src="item.Poster" class="img-fluid" alt="Poster" @error="defaultImg">
          </div>
        </b-col>
      </b-row>
      <div class="overflow-auto mx-lg-5 d-flex justify-content-end">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalItems"
          :per-page="10"
          first-number
        ></b-pagination>
      </div>
    </b-container>
    <modalDetail :movieId="movieId"/>

  </div>
</template>
<script>
  import axios from 'axios'
  import modalDetail from '../component/detail';
  import qs from 'query-string'
  import router from '../router'
  import { first, pickBy, identity } from 'lodash'

  export default {
    name: 'index',
    components: {
      modalDetail,
    },
    data () {
      return {
        data: [],
        isFetching: true,
        isDetailShowing: false,
        movieId: '',
        searchVal: '',
        imageBackground: '',
        movieTitle: '',
        bannerMovie: {},
        currentPage: Number((qs.parse(window.location.search) || {}).page) || 1,
        totalItems: null,

      }
    },
    mounted() {
      this.getMovie()
    },
    watch: {
      currentPage: {
        handler: function(value) {
          this.handlePage(value)
        }
      }
    },
    methods: {
      getMovie(val) {
        this.isFetching = true
        axios.get(`http://www.omdbapi.com/?apikey=aafe9ad4&${val || 's=marvel'}`)
        .then((response) => {
          if (response.data.Response === "True") {
            this.data = response.data.Search  
            this.isFetching = false
            this.movieTitle = first(response.data.Search).Title
            this.totalItems = Number(response.data.totalResults)
          } else {
            this.data= []
            this.isFetching = false
            router.push('./not-found')
          }
          if (this.movieTitle) {
            this.headerMovie(this.movieTitle)
          }
        })
        .catch((err) => {
          this.isFetching = false  
        })
      },

      headerMovie(val) {
        axios.get(`http://www.omdbapi.com/?apikey=aafe9ad4&t=${val || ''}`)
        .then((response) => {
          if (response.status === 200) {
            this.bannerMovie = response.data
          }
        })
        .catch((err) => { 
        })
      },
      openModal(val) {
        this.$bvModal.show("detail-movie");
        this.movieId = val;
      },
      onSearch() {
        this.getMovie(`s=${this.searchVal}`)
      },
      defaultImg(e){
        e.target.src = 'https://valmorgan.co.nz/wp-content/uploads/2016/06/default-movie-1-3.jpg'
      },
      changeBanner(val) {
        this.headerMovie(val)
      },
      handlePage (val) {
        const { search, pathname } = window.location;
        const payload = {
          ...qs.parse(search),
          s: (qs.parse(search) || {}).s || 'marvel',
          page: val,
        }
        this.getMovie(`${qs.stringify(pickBy(payload, identity))}`)
      },
    },
  }
</script>

<style lang="scss">
  .movie-cover-section{
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    h2{
      font-size: 20px;
      font-family: 'Fugaz One', cursive;
      text-transform: uppercase;
    }
    h3{
      font-size: 12px;
      font-family: 'Poppin-Light', sans-serif;
      text-transform: uppercase;
      font-style: italic;
      max-width: 60%
    }
    h1{
      font-size: 2rem;
      font-family: 'Fugaz One', cursive;
      text-transform: uppercase;
      -webkit-text-stroke: 1px #fff;
      color: transparent;
    }
  }
  .jumbotron{
    background-color: transparent;
    padding: 1rem 0;
    margin-bottom: 1rem;
  }
  .cover-title-img{
    width: 244px;
  }
  .bg-1{
    /*background-image: url('/src/assets/bg1.jpg');*/
    background-size: contain;
    background-repeat: no-repeat;
  }
  .arrow-right{
    width: 36px;
  }
  @media (min-width: 992px) {
    .movie-cover-section{
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
      h2{
        font-size: 42px;
        font-family: 'Fugaz One', cursive;
        text-transform: uppercase;
      }
      h3{
        font-size: 18px;
        font-family: 'Poppin-Light', sans-serif;
        text-transform: uppercase;
        font-style: italic;
      }
      h1{
        font-size: 5rem;
        font-family: 'Fugaz One', cursive;
        text-transform: uppercase;
        -webkit-text-stroke: 3px #fff;
        color: transparent;
        max-width: 50%;
      }
    }
    .bg-1{
      background-size: cover;
    }
    .jumbotron{
      margin-top: 121px;
      padding: 4rem 3.8rem;
      margin-bottom: 2rem;
    }
    .cover-title-img{
      width: 768px;
    }
  }
</style>
