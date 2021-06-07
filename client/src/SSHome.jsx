import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AlarmIcon from '@material-ui/icons/Alarm';
import DeleteIcon from '@material-ui/icons/Delete';
import APIService from "./APIService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

const api = new APIService();

function SSHome()
{   
    const [alarms, setAlarms] = useState([]);
    const [name, setName] = useState("");
    const [when, setWhen] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("email");

        api.getAlarms(email).then(
            (v) => {
                console.log("alarms: ", v.alarms);
                setAlarms(v.alarms);
            })
    }, [])

    function remove(a)
    {
        const email = localStorage.getItem("email");

        api.delAlarms(email, a.name, a.time).then(v => console.log("deleted: ", v));

        const newAlarms = alarms.filter( v => v.name !== a.name );

        console.log(newAlarms);

        setAlarms(newAlarms);
    }

    const createAlarm = async () => 
    {
        if(!name || !when)
        {
            window.alert("Configure o alarm antes de cria-lo");

            return;
        }

        const email = localStorage.getItem("email");

        const res = await api.addAlarm(email, name, when);

        if (!res)
        {
            window.alert("Nao foi possível criar o alarme");

            return;
        }

        window.alert("Alarme criado");

        const newAlarm = alarms.concat([{ name, time: when }]);

            console.log("newAlarm", newAlarm);

            setAlarms(newAlarm);
    }

    return(
        <div>
            <div className="welcome">
                <h1>Bem-vindo!</h1>
            </div>

            <h2 className="alarm">
                Alarmes
            </h2>

            <div className="alarms">
                <List aria-label="main mailbox folders">
                    {
                        alarms.map((a) => 
                        {
                            return (
                                <ListItem button id={a.name}>
                                    <ListItemIcon>
                                        <AlarmIcon />
                                    </ListItemIcon>

                                    <ListItemText>
                                        {a.name} @ {a.time}
                                    </ListItemText>

                                    <ListItemIcon>
                                        <DeleteIcon onClick={() => remove(a)} />
                                    </ListItemIcon>
                                </ListItem>
                            )
                        })
                    }
                    
                </List>
            </div>

            <div className="date">
                {/* <input type="text" ></input> */}
                <TextField id="standard-basic" label="Standard" onChange={e => setName(e.target.value)} />

                <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue={new Date().toISOString()}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={e => setWhen(e.target.value)}
                />

            </div>
            <Button variant="contained" color="primary" onClick={createAlarm}>Criar Alarme</Button>
        </div>
    )
}

export default SSHome;