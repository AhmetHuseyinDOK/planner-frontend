<template>
      
  <div class="about ">
    <v-img
          height="95vh"
          class="d-flex align-content-center flex-wrap pa-12"
          src="https://picsum.photos/2000/1000"
    >
    <v-stepper class="ma-12"   v-model="e1">
    <v-stepper-header>
      <v-stepper-step :editable="e1 < 3"  step="0">Welcome</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :editable="e1 < 3"  step="1">What is your name ?</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :editable="e1 < 3" step="2">When are you available ?</v-stepper-step>

      <v-divider></v-divider>

      
      <v-stepper-step  step="3">Finish!</v-stepper-step>

    </v-stepper-header>
    
    <v-stepper-items>

    <v-stepper-content step="0">
        <v-card
          class="mb-12 text-center pa-12"
          height="200px"
          elevation="0"
        > 
            <span class="display-1">Welcome To <span class="font-weight-bold"> {{plan.name}} </span></span>
            
          
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="1">
        <v-card
          class="mb-12 text-center pa-12"
          height="200px"
          elevation="0"
        > 
            
            <v-text-field :height="textFieldHeight" placeholder="What is your name ?" v-model="user.name" :style="textFieldStyle" >
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
          class="mb-12 text-center pa-12"
          height="400px"
          elevation="0"
        > 
            <h5>{{timeRangeText}}</h5>


       <TimePicker 
        
        btn-class="ma-4"
        btn-style="width: 200px"
        v-for="day in days"
        @save=" (times ) =>  onSave(day , times)"
        :key="day.toString()"
        :text="day.format('dddd Do MMMM')"
        :start="day" 
        :dayRange="plan.dayRange"
        />   
          
        </v-card>

        <v-btn
          color="primary"
          @click="saveAvailibilities()"
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
           
            
        </v-card>

      </v-stepper-content>

    </v-stepper-items>
    
  </v-stepper>
  </v-img>
  </div>
  
</template>

<script>
import moment from 'moment';
import {getRangeOfDates} from '../util';
import TimePicker from '../components/TimePicker';
import Api from '../api';
export default {
  components:{
    TimePicker
  },
  data: () => ({
      e1: 0,
      modal: false,
      min: moment().toISOString(),
      plan:{
        id: "1234",
        name: "Hamisin Toplanti",
        range: [],
        dayRange: [16 , 48]
      },
      user: {
        name: "",
        /** @type {Array<Array<import('moment').Moment>>} */ranges: []
      },
      selectionMap:  new Map(),
      textFieldStyle: "font-size: 24px !important",
      textFieldHeight: 100
  }),
  created(){
    Api.getPlan(this.$route.params.id).then( (plan) => {
      
      // let attendeeId = localStorage.getItem('id');

      // if(!!attendeeId){
      //   Api.getAttendee(plan.id , attendeeId).then( attendee => {
      //     this.user.name =  attendee.name;
      //     this.user.ranges =  await
      //   });
      // }
      
      this.plan.id = plan.id
      this.plan.name = plan.name
      this.plan.range = plan.range.map( (t) =>  moment(t)); 


    });

    

  },
  computed: {
    timeRangeText(){
      return this.plan.range.length != 0 ?  'between ' + this.plan.range.map( t => moment(t).format('MMM Do dddd')).join(' and ') : ''
    },
    days(){
      return getRangeOfDates(this.plan.range[0],this.plan.range[1],'days')
    }
  },
  methods: {
      onSave(day,times){
        console.log(times.map(t => t.toString()));
        this.selectionMap.set(day , times); 
      },
      async saveAvailibilities(){

        for( let dates of this.selectionMap.values()){
          this.user.ranges.push(...dates)
        }
        await Api.putAttendee(this.plan.id , this.user);
        this.e1 = 3;

      }
    },
    
}
</script>>