import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
const Account = () =>{
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const user = { email, password , firstname , surname};

    localStorage.setItem("user", JSON.stringify(user));
    alert("تم إنشاء الحساب بنجاح");
    navigate("/Login")
  }

const [preview, setPreview] = useState(null);
const [image, setImage] = useState(null);
//    const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };
const [profileImage, setProfileImage] = useState(null);
const handleProfileImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setProfileImage(reader.result);
    localStorage.setItem("profileImage", reader.result); // ✅ حفظ
  };

  reader.readAsDataURL(file);
};
    return (
    <div className="account-container row gx-0">
         <div className="content  col-lg-6 col-sl-12">
            <h1>Facebook</h1>
            <form action="" onSubmit={handleRegister}>
                <div className="head">
                    <h2>Create a new account</h2>
                    <p>It's quick and easy.</p>
                </div>
                <div className="body">
                <div className="name">
                    <div className="input-container" >
                         <input type="text" placeholder="First Name" onChange={(e) => setFirstname(e.target.value)} required/>
                    </div>
                    <div className="input-container">
                         <input type="text" placeholder="Surname" onChange={(e) => setSurname(e.target.value)} required/>
                    </div>
                </div>
                {/* <div className="date">
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
                </div> */}
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
                         <input  type="text"  placeholder="Mobile number or Email address" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="input-container">
                         <input  type="password" placeholder="New password" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                </div>
                {/* <div className="upload-img">
                         <div className="img-con" >
                            <input type="file" hidden id="uploadDirect" accept="image/*"  onChange={handleProfileImage}/>
                            <label htmlFor="uploadDirect">
                                <div className="upload">
                                    {profileImage && (
                                        <div className="img-con">
                                        <img src={profileImage} alt="preview" />
                                        </div>
                                        )}
                                   <div className="info">
                                   <p>Upload</p>
                                   <i className='bx  bx-plus'></i> 
                                   </div>
                                </div>
                            </label>
                        </div>
                </div> */}
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