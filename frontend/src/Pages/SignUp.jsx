import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios, { Axios } from 'axios'
import { useNavigate } from "react-router-dom";

export function SignUp(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your infromation to create an account"}/>
                    <InputBox onChange={(e) => {
                        setFirstName(e.target.value)
                        console.log(firstName)
                    }} placeholder={"Abhishek"} label={"First Name"}/>
                    <InputBox onChange={(e) => {
                        setLastName(e.target.value)
                        console.log(lastName)
                    }} placeholder={"Jaglan"} label={"Last Name"}/>
                    <InputBox onChange={(e) => {
                        setEmail(e.target.value)
                        console.log(email)
                    }} placeholder={"abhishek@gmail.com"} label={"Email"}/>
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                        console.log(password)
                    }} placeholder={"123456"} label={"Password"}/>
                    <div className="pt-4">
                        <Button onClick={async() => {
                            console.log("in onCLick")
                            const response = await axios.post('http://localhost:3000/api/user/signup', {
                                email, 
                                firstName,
                                lastName,
                                password
                            });
                            console.log(response.data);
                            localStorage.setItem('token', response.data.token);
                            navigate('/dashboard');                     
                        }} label={"Sign Up"}/>
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )    
}