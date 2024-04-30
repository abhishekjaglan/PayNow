import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import axios from "axios";

export function Dashboard(){
    // let balance = await axios.get('http://localhost:3000/api/balance')
    // .then(response => {
    //     return response.data.balance
    // })
    
    return <>
        <AppBar/>
        <div className="m-8">
            <Balance balance={"10,000"}/>
            <Users/>
        </div>
    </>
}