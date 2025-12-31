import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
const Login = () =>{
  const navigate = useNavigate();

    return (
        <div className="login row gx-0">
            <div className="content col-sl-12 col-lg-6">
                <h1>Facebook</h1>
                <form action="" className="">
                    <input type="text"  placeholder="Email address or Phone number"/>
                    <input type="text" placeholder="Password"/>
                    <button onClick={() => navigate("/Home")}>Log in</button>
                    <p>Forgotten password?</p>
                    <div className="btn-con">
                        <button >Create new account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login