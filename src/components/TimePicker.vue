<template>
<v-dialog v-model="dialog" persistent scrollable max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn :class="btnClass" :style="btnStyle" color="primary" dark v-on="on">{{text}}</v-btn>
      </template>
    <v-card>

    <v-card-title>Select Times <v-spacer/> <v-checkbox v-model="toggle" ></v-checkbox>  </v-card-title>
    <v-divider></v-divider>
      <v-card-text style="max-height: 400px">
        <v-list-item-group
        v-model="selected"
        multiple
        active-class=""
      >
        <v-list-item 
            v-for="range in times"
            :key="range.toString()"
        >
            <template v-slot:default="{ active , toggle}" >
                <v-list-item-action>
                    <v-checkbox :input-value="active" :true-value="range" @click="toggle"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                <v-list-item-title>{{range.start.format('HH:mm')}} - {{range.end.format('HH:mm')}}</v-list-item-title>
                </v-list-item-content>
            </template>
            </v-list-item>
        </v-list-item-group>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="save()"> save </v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>

import Moment from 'moment';
import {extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default {
    props: [
        'start','text','dayRange','btn-class','btn-style'
    ],
    data(){
        return {
            selected: [],
            times: [],
            dialog: false,
            toggleAll: false,
            
        }
    },
    created(){
        let start = moment(this.start).startOf('day');
        let arr = [];
        let startRange = this.dayRange[0] || 0;
        let endRange = this.dayRange[1] || 48;

        for(let i = startRange; i < endRange; i++){
            let temp = moment(start).add(i * 30 , 'minutes');
            arr.push( moment.range(temp , moment(temp).add('30',"minutes")))
        }
        this.times = arr;
    },
    computed: {
        toggle: {
            set(value){
                if(value){
                    this.selected = this.times.map( (v , i ) => i );
                }else{
                    this.selected = []
                }       
                this.toggleAll = value; 
             },
             get(){
                 return this.toggleAll;   
             }
        }
    },
    methods:{
        save(){
            this.$emit('save',this.glue(this.selected.map( i => this.times[i])))
            this.dialog = false;
        },
        glue(ranges){

            console.log(ranges);

            /**
             * @type {Array<import('moment-range').DateRange>}
             */
            let sum = [ ranges[0] ];

            /**
             * @type {import('moment-range').DateRange}
             */
            let temp = ranges[0];
            for (const range of ranges.slice(1)) {
                
                if(sum[sum.length - 1].adjacent(range)){
                    sum[sum.length - 1] =  sum[sum.length - 1].add( range , {adjacent: true} )
                }else if(temp.adjacent(range)){
                    sum.push(temp.add(range , {adjacent: true} ))
                }

                temp = range;
            }

            return sum;
        }
    }
}

</script>