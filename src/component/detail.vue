<template>
  <b-modal id="detail-movie" hide-footer hide-header centered  size="xl">
    <b-container class="py-2">
      <b-row>
        <b-col cols="12" lg="3" v-show="isLoadDetail">
          <b-skeleton-img></b-skeleton-img>
        </b-col>
        <b-col v-show="isLoadDetail === false"  cols="12" lg="3" class="wrapper-img-modal">
          <img :src="dataDetail.Poster" class="img-fluid" alt="cover">
        </b-col>
        <b-col cols="12" lg="9">
          <div class="mb-2">
            <b-skeleton v-show="isLoadDetail" />
            <h3 v-show="isLoadDetail === false" class="detail-title font-weight-bold">{{dataDetail.Title}}</h3>
          </div>
          <b-skeleton v-show="isLoadDetail" />
          <div v-show="isLoadDetail === false" class="d-flex movie-info">
            <p>{{dataDetail.Year}}</p>
            <span class="divider-grey"/>
            <p>{{dataDetail.Rated}}</p>
            <span class="divider-grey"/>
            <p>{{dataDetail.Released}}</p>
            <span class="divider-grey"/>
            <p>{{dataDetail.Runtime}}</p>
            <span class="divider-grey"/>
            <p>{{dataDetail.Genre}}</p>
            <span class="divider-grey"/>
            <p>{{dataDetail.Language}}</p>
          </div>
          <div class="py-4 detail-descritpion">
            <p class="mb-0">{{dataDetail.Plot}}</p>
          </div>
          <div class="detail-descritpion">
            <b-row>
              <b-col cols="12" lg="2">
                <p class="mb-2">ACTOR</p>
              </b-col>
              <b-col cols="12" lg="9" class="d-flex">
                <span class="mr-2">:</span><p class="mb-2">{{dataDetail.Actors}}</p>
              </b-col>
              <b-col cols="12" lg="2">
                <p class="mb-2">DIRECTOR</p>
              </b-col>
              <b-col cols="12" lg="9" class="d-flex">
                <span class="mr-2">:</span><p class="mb-2">{{dataDetail.Director}}</p>
              </b-col>
              <b-col cols="12" lg="2">
                <p class="mb-2">WRITER</p>
              </b-col>
              <b-col cols="12" lg="9" class="d-flex">
                <span class="mr-2">:</span><p class="mb-2">{{dataDetail.Writer}}</p>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'modalDetail',
    props: ['movieId'],
    data(){
      return{
        dataDetail: {},
        isLoadDetail: true,
      }
    },
    watch: { 
      movieId: function(val) {
        this.getDetail(val)
        this.isLoadDetail = true        
      }
    },
    mounted() {
      this.getDetail(this.movieId)
    },
    methods: {
      getDetail(val) {
        
        axios.get(`http://www.omdbapi.com/?apikey=aafe9ad4&i=${val}`)
        .then((response) => {
          // this.data = response.data
          if (response) {
            this.dataDetail = response.data 
            this.isLoadDetail = false
          }
        })
        .catch((err) => {
          this.isLoadDetail = false  
        })
      },
    },
  };
</script>

<style lang="scss">
  .wrapper-img-modal{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .wrapper-img-modal{
    img{
      flex-shrink: 0;
      min-width: 100%;
      min-height: 100%;
    }
  }
</style>
