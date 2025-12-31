import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
const Account = () =>{
  const navigate = useNavigate();

    return (
    <div className="account-container row gx-0">
         <div className="content  col-lg-6 col-sl-12">
            <h1>Facebook</h1>
            <form action="" className="">
                <div className="head">
                    <h2>Create a new account</h2>
                    <p>It's quick and easy.</p>
                </div>
                <div className="body">
                <div className="name">
                    <div className="input-container">
                         <input type="text" placeholder="First Name"/>
                    </div>
                    <div className="input-container">
                         <input type="text" placeholder="Surname"/>
                    </div>
                </div>
                <div className="date">
                    <p>Date of birth</p>
                    <div className="date-con">
                    <div className="input-container">
                         <input type="date" />
                    </div>
                    <div className="input-container">
                         <input type="date" />
                    </div>
                    <div className="input-container">
                         <input type="date" />
                    </div>
                    </div>
                </div>
                <div className="gender">
                    <p>Gender</p>
                    <div className="gender-con">
                    <div className="input-container">
                         <label htmlFor="Male">Male</label>
                         <input id="Male" type="radio"  name="gender"/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="Female">Female</label>
                         <input id="Female" type="radio" name="gender"/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="Custom">Custom</label>
                         <input id="Custom" type="radio" name="gender"/>
                    </div>
                    </div>
                </div>
                <div className="mobil-pass">
                    <div className="input-container">
                         <input  type="text"  placeholder="Mobile number or Email address"/>
                    </div>
                    <div className="input-container">
                         <input  type="text" placeholder="New password"/>
                    </div>
                </div>
                <div className="footer">
                    <p>People who use our service may have uploaded your contact information to Facebook. <span> Learn more.</span></p>
                    <p>By clicking Sign up, you agree to our <span> Terms, Privacy Policy.</span> and <span>Cookies Policy.</span> You may receive SMS notifications from us and can opt out at any time.</p>
                    <div className="btn-allready">
                    <button type="submit">Sign up</button>
                    <p onClick={() => navigate("/Login")}>Already have an account?</p>
                    </div>
                </div>
                </div>
            </form>
         </div>
    </div>
    )
}
export default Account