<template>
  <div id="app">
    <div class="container-fluid">
        <!--cover images starts-->
        <div class="row">
            <div class="col-md-4 bg-overlay">
            </div>
            <!--cover images ends-->
            <!--form starts-->
            <aside class="col-md-8 form-bg">
                <div class="card bg-transparent border-0 mx-auto">
                    <article class="card-body">
                        <a href="#"><img src="../src/assets/logo.png" /></a>
                        <p class="my-3" >{{ greeting() }}</p>
                        <!-- navigation starts -->
                        <b-button-group>
                            <b-button class="btn-green" variant="green" to="/food">Food</b-button>
                            <b-button class="btn-green" variant="green" to="/transport">Transport</b-button>
                        </b-button-group>
                        <transition name="slide" mode="out-in">
                            <router-view/>
                        </transition>
                       
                        <!-- navigation ends -->
                    </article>
                </div>
            </aside>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    greeting () {
      var time = new Date().getHours()
      return 'Good ' + (time < 12 ? 'Morning !' : time < 18 ? 'Afternoon !' : 'Evening !')
    }
  }
}
</script>

<style lang="scss">

@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

html {
    font-size: 16px
}
.bg-overlay {
    background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)),url('../src/assets/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left left;
    color: #fff;
    height: 100vh;
    padding-top: 50px;
    width: 20vw;
    margin: 0px
}

.form-bg {
    background-color: #FBFBFB
}

.card {
    width: 60%
}

.form-control:focus {
  border-color: #C1D72E;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(175, 196, 40, 0.712);
}

.btn-green {
  background-color: #C1D72E;
  box-shadow: none;
  border-color: none;
}

.btn-green:focus, .btn-green:active:focus, .btn-green.active:focus {
    outline: 0 none;
}

.btn-green:hover, .btn-green:focus, .btn-green:active, .btn-green.active, .open > .dropdown-toggle.btn-green {
    background: #98A82E;  
}

.btn-green:active, .btn-green.active {
    background: #98A82E;
    box-shadow: none;
    color: #fff;
}

.btn.btn-green.active.btn-success {
    background-color: #98A82E;
    box-shadow: #fff;
}

.btn-green:hover {
    background-color: #98A82E;
}

.btn-primary disabled:hover {
    background-color: rgba(0,0,0,0.2) !important;
    border: none
}

a, a:hover {
    color: #fff
}

h5 {
  padding-top: 20px;
  padding-bottom: 10px;
}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

.slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(-0);
        opacity: 1;
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-00px);
        opacity: 0;
    }
}

</style>