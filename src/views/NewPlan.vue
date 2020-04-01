<template>
      
  <div class="about ">
    <v-img
          height="95vh"
          class="d-flex align-content-center flex-wrap pa-12"
          src="https://picsum.photos/2000/1000"
    >
    <v-stepper class="ma-12"   v-model="e1">
    <v-stepper-header>
      <v-stepper-step :editable="e1 < 3"  step="1">What is your event name ?</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :editable="e1 < 3" step="2">When is the start of range ?</v-stepper-step>

      <v-divider></v-divider>

      
      <v-stepper-step  step="3">Share with your friends!</v-stepper-step>

    </v-stepper-header>
    
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12 d-flex align-content-center pa-12"
          height="200px"
          elevation="0"
        > 
            
            <v-text-field :height="textFieldHeight" placeholder="What is your event's name ?" v-model="plan.name" :style="textFieldStyle" >
            </v-text-field>
          
          
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="2">
           <v-card
          class="mb-12 d-flex align-content-center pa-12"
          height="200px"
          elevation="0"
        > 
            
            <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="timeRangeText"
            label="Please select a range of times"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker :min="min" range v-model="plan.range" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
          
          
        </v-card>

        <v-btn
          color="primary"
          @click="finish()"
        >
          Continue
        </v-btn>
      </v-stepper-content>

      

      <v-stepper-content step="3">
        <v-card
          class="mb-12 text-center pa-12"
          height="200px"
          elevation="0"
        > 
            
            <h4>Thank you for choosing us!</h4>
            <span>Invite your friends to <span class="font-weight-bold">{{plan.name}}</span> {{timeRangeText}} </span>
            
              <v-text-field 
              v-model="plan.url"
              class="text-center"
              append-icon="mdi-content-copy"
              @click:append="doCopy"
              readonly>
              </v-text-field>
            
        </v-card>


        

      </v-stepper-content>

    </v-stepper-items>
    
  </v-stepper>
  </v-img>
  </div>
  
</template>

<script>
import moment from 'moment';
import Api from '../api';
export default {
  data: () => ({
      e1: 1,
      modal: false,
      min: moment().toISOString(),
      plan: {
        name: "",
        /** @type {Array<import('moment').Moment>} */range: [],
      },
      textFieldStyle: "font-size: 24px !important",
      textFieldHeight: 100
  }),
  computed: {
    timeRangeText(){
      return this.plan.range.length != 0 ?  'between ' + this.plan.range.map( t => moment(t).format('MMM Do dddd')).join(' and ') : ''
    }
  },
  methods: {
      doCopy: function () {
        this.$copyText(this.plan.url).then(function (e) {
          alert('Copied')
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
      },
      async finish(){
        let plan = await Api.createPlan(this.plan);
        this.plan.url = process.env.VUE_APP_BASE_URL + '/register/'+plan.id
        this.e1 = 3;
      }
    }
}
</script>>