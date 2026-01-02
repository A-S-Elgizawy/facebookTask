import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
const Login = () =>{
  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.email === email && user?.password === password) {
      localStorage.setItem("isAuth", "true");
        setLoginStatus("success");
        setTimeout(() => {
          navigate("/Home");
        }, 2000);
    } else {
     setLoginStatus("error");
      setTimeout(() => {
        setLoginStatus(null);
      }, 2000);
    }
}

    return (

        <div className="login row gx-0">
          {loginStatus === "success" && (
            <div className="message success active">
              <i className='bx bx-check-circle'></i>
              <p>Login successful</p>
            </div>
          )}

          {loginStatus === "error" && (
            <div className="message error active">
              <i className='bx bx-x-circle'></i>
              <p>Invalid login credentials</p>
            </div>
          )}
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