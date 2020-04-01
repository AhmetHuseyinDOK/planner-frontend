import Axios from 'axios'

class Api {

    constructor() {
        this.sender = Axios.create({
            baseURL: process.env.VUE_APP_API_URL
        });
    }

    async getPlan(id) {
        let { data } = await this.sender.get('/plan/'+id);
        return data;
    }

    async getAttendee(id , attendeeId) {
        let { data } = await this.sender.get('/plan/'+id+'/attendee/'+ attendeeId);
        return data;
    }

    async getPlanDetail(id){
        let { data } = await this.sender.get('/plan/'+id+'/detailed');
        return data;
    }

    async createPlan(plan) {
        let { data } = await this.sender.post('/plan', plan)
        return data;
    }

    async putAttendee(planId,attendee) {
        let { data } = await this.sender.put('/plan/'+ planId + "/attendee" , attendee);
        return data;
    }

}

export default new Api();