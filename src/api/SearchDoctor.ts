import axios from "axios";

const url = 'https://round5-online-booking-with-doctor-api.digital-vision-solutions.com/api'

const token = localStorage.getItem('token')

export function alldoctors(){
     try{
      const response=axios.get(`${url}/doctors` , {
            headers: {
                token,
            },
        });
        return  response
    }
      catch(error){
        return error
      } 
}
