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

    async getClasses(email)
    {
        try
        {
            const url = `${this.baseURL}/classes?email=${email}`;
            const res = await axios.get(url);
            
            console.log(res.status, res.statusText, res.data);

            return res.data.classes;
        }
        catch(err)
        {
            if (err.req) {
                const res = err.res;
                console.log(res.status, res.statusText, res.data);
            }
            return err.message
        }
    }
}
