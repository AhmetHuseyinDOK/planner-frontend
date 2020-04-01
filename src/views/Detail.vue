<template>
    <div>
    <v-card>
        <v-card-text>
            {{idealTime}}
        </v-card-text>
    </v-card>
    <v-card class="pa-12" >
        <v-card-text>
            <v-row no-gutters>
                <v-card 
                    style="width: 300px;"
                    class="ma-4"
                    v-for="user in users"
                    :key="user.id"
                >
                    <v-card-title>{{user.name}}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 400px; overflow:scroll">
                        {{user.ranges}}
                    </v-card-text>
                </v-card>
            </v-row>
        </v-card-text>
    </v-card>
    </div>
</template>

<script>
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import Api from '../api';
const moment = extendMoment(Moment);

export default {
    data(){
        return { 
            users:[],
            idealTime: ""
        }
    },
    created(){
        // for (let i = 0; i< 4;i++) {
            
        //     let ranges = [];
            
        //     for(let j = 0; j < 5; j++){
        //         let randomMoment = moment().add(Math.random() * 7 , 'days').add(Math.random() * 48 * 30,'minutes');
        //         ranges.push( moment.range(randomMoment , moment(randomMoment).add(Math.random() * 30 * Math.random() * 6,'minutes')));
        //     }

        //     this.users.push({
        //         id: i,
        //         name: 'user ' + i,
        //         ranges//: [...ranges, ...(this.users[this.users.length - 1] ? this.users[this.users.length - 1].ranges.slice(2) : [])]
        //     })

        // }
        console.log('get data');
        Api.getPlanDetail(this.$route.params.id).then( (plan) => {
            let attendees =  plan.Attendees;
            for (const attendee of attendees) {
                
                attendee.ranges = attendee.ranges.map( r => {
                    console.log(r);
                    return moment.range(moment(r.start), moment(r.end))
                })
            }
            this.users = attendees;
            this.calcIdealTimes();
            console.log(this.users);
        });

        
        

    },
    methods:{
        calcIdealTimes(){

            let idealTimes = [];
            
            for (const range of this.users[0].ranges) {
            
                let intersect = range;

                for (const user of this.users.slice(1)) {


                    for (const range of user.ranges) {
                        if(intersect.intersect(range)){
                            intersect = intersect.intersect(range);
                        }
                    }

                    if(intersect == range){
                        break;
                    }

                }

                if(intersect){
                    idealTimes.push(intersect);
                }

            }
            
            
            this.idealTime = idealTimes;
            console.log(idealTimes);
        }
    }    
}

</script>