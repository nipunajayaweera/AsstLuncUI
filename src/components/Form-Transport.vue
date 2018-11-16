<template>
    <div class="tab-pane" role="tabpanel" id="menu1">
        <h5>Request Your Transport</h5>
        <b-alert :show = "dismissCountDown"
                dismissible
                :fade = "fade"
                :variant = "variant"
                @dismissed = "dismissCountDown=0"
                @dismiss-count-down = "countDownChanged">
        {{ response.message }}
        </b-alert>
        <b-form id="#menu1" class="tab-pane" @submit="onSubmit" @reset="onReset">
            <!-- Email address -->
            <b-form-group   id="inputGroup1"
                            label="Email address:"
                            label-for="inputEmail">
                <b-form-input   id="exampleInput1"
                                type="email"
                                v-model="transportRequest.email"
                                required
                                placeholder="Enter email">
                </b-form-input>
            </b-form-group>

            <!-- Destination and Time -->
            <b-form-group   id="inputGroup3"
                            label="Destination and Time:"
                            label-for="inputDestination" inline>
                <b-input-group>
                    <b-form-input   id="inputDestination"
                                    type="text"
                                    v-model="transportRequest.destination"
                                    required
                                    placeholder="Enter destination">
                    </b-form-input>
                    <b-form-select  id="inputTime"
                                    :options="times"
                                    required
                                    v-model="transportRequest.leaveTimeId">
                      <template slot="first">
                        <!-- this slot appears above the options from 'options' prop -->
                        <option :value="null" disabled>-- Please select an option --</option>
                      </template>    
                    </b-form-select>
                </b-input-group>
            </b-form-group>

            <!-- button submit -->
            <b-button type="submit" variant="green" class="btn-block btn-green">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'form-transport',
  data () {
    return {
      times: [],
      transportRequest: {
        email: '',
        destination: '',
        leaveTimeId: null
      },
      response: {
        state: '',
        message: ''
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      variant: '',
      fade : true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('/api/transport/TransportRequest', JSON.stringify(this.transportRequest),{
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
        } else if (this.response.state == 'Invalid'){
          this.showAlert('warning')
        } else if (this.response.state == 'Error'){
          this.showAlert('danger')
        } else if (this.response.state == 'Exist') {
          var r = confirm(this.response.message + ". Do you want to update your transport request");
          if (r == true) {
            axios.put('/api/transport/UpdateTransportRequest', JSON.stringify(this.transportRequest), {
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
      this.transportRequest.email = ''
      this.transportRequest.destination = ''
      this.transportRequest.leaveTimeId = null
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
    axios.get('/api/transport/GetTimeList')
        .then(res => {
          this.times = res.data
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
