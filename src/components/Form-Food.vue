<template>
  <div class="tab-pane" role="tabpanel" id="menu1">
      <h5>Order Your Lunch</h5>
      <b-alert :show = "dismissCountDown"
              dismissible
              :fade = "fade"
              :variant = "variant"
              @dismissed = "dismissCountDown=0"
              @dismiss-count-down = "countDownChanged">
      {{ response.message }}
      </b-alert>
      <b-form  class="tab-pane" @submit="onSubmit" @reset="onReset">
        <!-- Email address -->
        <b-form-group id="inputGroup1"
                      label="Email address:"
                      label-for="inputEmail"
                      :description = "response.Message">
          <b-form-input id="exampleInput1"
                        type="email"
                        v-model="foodRequest.email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>

        <!-- Food -->
        <b-form-group id="inputGroup2"
                      label="Lunch:"
                      label-for="inputFood">
          <b-form-select  id="inputFood"
                          :options="foods"
                          required
                          v-model="foodRequest.foodId">
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option :value="null" disabled>-- Please select an option --</option>
              </template>
          </b-form-select>
        </b-form-group>
        <!-- button submit -->
        <b-button type="submit" variant="green" pressed="null" class="btn-block btn-green">Submit</b-button>
      </b-form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Form-Food',
  data () {
    return {
      foods: [],
      foodRequest: {
        email: '',
        foodId: null
      },
      response: {
        state: '',
        message: ''
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      variant: '',
      fade: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('/api/food/FoodRequest', JSON.stringify(this.foodRequest), {
          headers: {
            'Accept': 'application/json',
            'content-type' : 'application/json'
          }
      })
      .then(res => {
        this.response.state = res.data.State 
        this.response.message = res.data.Message 
        if (this.response.state == 'Success') {
          this.showAlert('success')
        } else if(this.response.state == 'Invalid') {
          this.showAlert('warning')
        } else if(this.response.state == 'Error') {
          this.showAlert('danger')
        } else if (this.response.state == 'Exist') {
          var r = confirm(this.response.message + ". Do you want to update your food request");
          if (r == true) {
            axios.put('/api/food/UpdateFoodRequest', JSON.stringify(this.foodRequest), {
              headers: {
                'Accept': 'application/json',
                'content-type' : 'application/json'
              }
            })
            .then(res => {
              this.response.state = res.data.State 
              this.response.message = res.data.Message
              if (this.response.state == 'Success') {
                this.showAlert('success')
              } else if (this.response.state == 'Error') {
                this.showAlert('danger')
              }
            })
          } else {
            this.onReset()
          }
        }   
      })
      .catch(error => console.log(error))
    },
    onReset (evt) {
      this.foodRequest.email = ''
      this.foodRequest.foodId = null
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert (labelType) {
      this.variant = labelType
      this.dismissCountDown = this.dismissSecs
      this.onReset()
    }
  },
  created () {
    axios.get('/api/food/GetFoodList')
        .then(res => {
          this.foods = res.data
        })
        .catch(error => {
          console.log(error)
      })  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.btn-green {
  color: #fff;
}
</style>
