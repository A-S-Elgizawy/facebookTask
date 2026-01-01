import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
const Login = () =>{
  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.email === email && user?.password === password) {
      localStorage.setItem("isAuth", "true");
      navigate("/Home");
    } else {
      alert("بيانات غير صحيحة");
    }
}

    return (
        <div className="login row gx-0">
            <div className="content col-sl-12 col-lg-6">
                <h1>Facebook</h1>
                <form action="" onSubmit={handleLogin}>
                    <input type="text"  placeholder="Email address or Phone number"  onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <button >Log in</button>
                    <p>Forgotten password?</p>
                    <div className="btn-con">
                        <button type="submit" onClick={() => navigate("/account")}>Create new account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login