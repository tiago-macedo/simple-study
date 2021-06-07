import axios from "axios";

export default class APIService 
{
    baseURL;

    constructor()
    {
        if(process.env.NODE_ENVIRONMENT === "product")
        {
            this.baseURL =  "<PRODUCTION URL>";
        }
        else 
        {
            this.baseURL = "http://localhost:5000/api";
        }
    }

    async signUp(email, password, isStudent)
    {
        try
        {
            const url = `${this.baseURL}/auth/sign-up`;

            const reqBody =
            {
                email, 
                password,
                isStudent, 
                isProfessor: !isStudent
            };

            const res = await axios.post(url, reqBody);

            console.log(res.status, res.statusText, res.data);

            if (res.status === 200)
            {
                return true;
            }
        }
        catch(err)
        {
            if (err.res)
            {
                const res = err.res;

                console.log(res.status, res.statusText, res.data);
            }
        } 

        return false;
    }


    async signIn(email, password)
    {
        try
        {
            const url = `${this.baseURL}/auth/sign-in?email=${email}&password=${password}`;

            const res = await axios.get(url);

            console.log(res.status, res.statusText, res.data);
            
            if (res.status === 200)
            {
                return true;
            }
        }
        catch(err)
        {
            if (err.res)
            {
                const res = err.res;

                console.log(res.status, res.statusText, res.data);
            }
        } 

        return false;
    }

    async addAlarm(email, alarm, date)
    {
        try
        {
            const url = `${this.baseURL}/alarms`;

            const reqBody =
            {
                email, 
                alarm: {
                    name: alarm, 
                    when: date
                }
            };

            const res = await axios.post(url, reqBody);

            console.log(res.status, res.statusText, res.data);

            if (res.status === 200)
            {
                return true;
            }
        }
        catch(err)
        {
            if (err.res)
            {
                const res = err.res;

                console.log(res.status, res.statusText, res.data);
            }
        } 

        return false;
    }


    async getAlarms(email)
    {
        try
        {
            const url = `${this.baseURL}/alarms?email=${email}`;

            const res = await axios.get(url);

            console.log(res.status, res.statusText, res.data);
            
            if (res.status === 200)
            {
                return res.data;
            }
        }
        catch(err)
        {
            if (err.res)
            {
                const res = err.res;

                console.log(res.status, res.statusText, res.data);
            }
        } 

        return [];
    }

    async delAlarms(email, name, time)
    {
        try
        {
            const url = `${this.baseURL}/alarms?email=${email}&name=${name}&time=${time}`;

            const res = await axios.delete(url);

            console.log(res.status, res.statusText, res.data);
            
            if (res.status === 200)
            {
                return true;
            }
        }
        catch(err)
        {
            if (err.res)
            {
                const res = err.res;

                console.log(res.status, res.statusText, res.data);
            }
        } 

        return false;
    }
}