
import { useState } from "react";
import { useEffect, useRef } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [opendetails, setOpendetails] = useState({});
  const [preview, setPreview] = useState(null);
  const [position, setPosition] = useState("down");
  const [editId, setEditId] = useState(null);
  const menuRef = useRef({})
  const isDisabled = !text && !image;

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

const Imageprofile = localStorage.getItem("profileImage");

    const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
   
   const User = JSON.parse(localStorage.getItem("user") || "{}");

//   =======
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text && !image) return;

    const newPost = {
      id: Date.now(),
      text,
      image: preview,
    };

    setPosts([newPost, ...posts]);
    setText("");
    setImage(null);
    setPreview(null); 
    setShowPage(false)
  };

const deletepost = (id) => {
  setPosts(prevPosts =>
    prevPosts.filter(post => post.id !== id)
  );
  setShowDelete(false);
  setSelectedPostId(null);
};

  // ✏️ تجهيز التعديل
  const startEdit = (post) => {
    setText(post.text);
    setImage(null);          // file جديد لاحقًا
    setPreview(post.image)
    setEditId(post.id);
  };

  // ✏️ حفظ التعديل
  const updatePost = () => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === editId
          ? { ...post, text , image: preview || post.image }
          : post
      )
    );

    setText("");
    setImage(null);
    setEditId(null);
    setPreview(null)
  };
  
useEffect(() => {
  const handleClickOutside = (e) => {
    let clickedInside = false;

    Object.values(menuRef.current).forEach(ref => {
      if (ref && ref.contains(e.target)) {
        clickedInside = true;
      }
    });

    if (!clickedInside) {
      setOpendetails({});
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const toggleMenu = (id,e) => {
        setOpendetails(prev => ({
            ...prev,
            [id]: !prev[id],   // يفتح ويقفل لنفس البوست
        }));
        
  const rect = e.currentTarget.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;

  if (spaceBelow < 373) {
    setPosition("up");
  } else {
    setPosition("down");
  }

   
};

  return (
    <div className="post-container row gx-0">
        {/*add post*/}
        <div className="post col-lg-7 col-md-7 col-sl-12">
            <div className="personal-feature ">
                <div className="camera">
                    {/* {profileImage ? ( */}
                        <div className="img-con myphoto">
                        <img className="myimg" src={Imageprofile || "/default-avatar.png"} alt="preview" />
                        <img className="faceimg" src="https://scontent.fcai21-3.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s160x160&_nc_cat=1&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=136b72&_nc_ohc=rEFmZcvck6gQ7kNvwGD6yiR&_nc_oc=AdkZe5Jv1o9FfmKKi48QdxRyunVl3R37FPkowRTSXBzhvtSkj-XrZ8kOVnnPZK5QAk8&_nc_zt=24&_nc_ht=scontent.fcai21-3.fna&oh=00_Afo8o7xJP4M5uMV3AZ2E58vveqEUM0cQYs2z-AMy_TRwNA&oe=697F14BA" alt="" />
                        </div>
                    {/* // ):( */}
                    {/* <div className="img-con myphoto">
                        <img src="https://scontent.fcai21-3.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s160x160&_nc_cat=1&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=136b72&_nc_ohc=rEFmZcvck6gQ7kNvwGD6yiR&_nc_oc=AdkZe5Jv1o9FfmKKi48QdxRyunVl3R37FPkowRTSXBzhvtSkj-XrZ8kOVnnPZK5QAk8&_nc_zt=24&_nc_ht=scontent.fcai21-3.fna&oh=00_Afo8o7xJP4M5uMV3AZ2E58vveqEUM0cQYs2z-AMy_TRwNA&oe=697F14BA" alt="" />
                    </div> */}
                    {/* // )} */}
                       <div className="icon-con">
                        <input type="file" hidden id="uploadDirect" accept="image/*"  onChange={handleProfileImage}/>
                        <label htmlFor="uploadDirect"> 
                          <i className='bx  bx-camera-alt'></i> 
                        </label>
                       </div>
                    </div>
                    <input type="text" placeholder="What's your on mind?" onClick={() => setShowPage(true)} />
                    
                    <div className="featuers">
                        <div className="img-con vedio" >
                            <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/c0dWho49-X3.png" alt="" />
                        </div>
                        <div className="img-con" onClick={() => setShowPage(true)}>
                            <input type="file" hidden id="uploadDirect" accept="image/*"  onChange={handleImage}/>
                            <label htmlFor="uploadDirect">
                                <img src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png" alt="" />
                            </label>
                        </div>
                        <div className="img-con emo">
                            <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png" alt="" />
                        </div>
                    </div>
            </div>
        </div>

        {/*create-post*/}
        {showPage && (
         <div className="create-post row gx-0" >
         <div className="content col-lg-7 col-md-7 col-sl-12">
            <form action="" onSubmit={handleSubmit}>
            <div className="header">
                <h3>Create post</h3>
                <div className="icon-con" onClick={() => setShowPage(false)}>
                    <i className='bx  bx-x'></i> 
                </div>
            </div>
            <hr/>
            <div className="profile">
                <div className="img-con">
                    <img src={Imageprofile || "/default-avatar.png"} alt=""/>
                </div>
                <p>{User?.firstname} {User?.surname}</p>
            </div>
            <div className="caption-img">
            <input type="text" placeholder="What's on your mind?" value={text}  onChange={(e) => setText(e.target.value)}/>
                    {preview && (
                    <div className="img-con">
                        <img src={preview} alt="preview" />
                    </div>
                    )}
            </div>
               <div className="options-post">
                <p>Add to your post</p>
                <div className="options">
                    <div className="img-con"  data-text="Photo/vedio" >
                    <input hidden id="upload" type="file" accept="image/*"  onChange={handleImage}/>
                        <label htmlFor="upload">
                        <img  src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png" alt=""/>
                        </label>
                    </div>
                    <div className="img-con tempo" data-text="Tage people">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yq/r/b37mHA1PjfK.png" alt=""/>
                    </div>
                    <div className="img-con tempo" data-text="Feeling/Activity">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png" alt=""/>
                    </div>
                    <div className="img-con tempo" data-text="checke in">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/y1/r/8zlaieBcZ72.png" alt=""/>
                    </div>
                    <div className="img-con tempo" data-text="GIF">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yT/r/q7MiRkL7MLC.png" alt=""/>
                    </div>
                    <div className="img-con tempo" data-text="More">
                        <i className='bx  bx-dots-horizontal-rounded'></i> 
                    </div>
                </div>
            </div>
            <button  className={`post ${!isDisabled ? "active" : ""}`}>Post</button>
            </form>
         </div>
         </div>
        )}

        {/* posts */}
            {posts.map((post) => (
                <div className="post Post row gx-0" key={post.id}>
                    <div className="post-Container col-lg-7 col-md-7 col-sl-12">
                        <div className="header">
                        <div className="data-post">
                            <div className="left">
                            <div className="img-con">
                                <img src={Imageprofile || "/default-avatar.png"} alt=""/>
                            </div>
                            <div className="text">
                                <p className="name">{User?.firstname} {User?.surname}</p>
                                <div >
                                <p className="hour"> 2  . <i className="fa-solid fa-earth-americas"></i></p>
                                </div>
                            </div>
                            </div>
                            <div className="right">
                            <div className="icon-con togglebtn" ref={el => (menuRef.current[post.id] = el)} onClick={(e) => toggleMenu(post.id,e)}><i className='bx  bx-dots-horizontal-rounded'></i>
                            {opendetails[post.id] && (
                                <div className={`dropdown ${position}`}>
                                    <div className="item">
                                        <i className='bx  bxs-pin'></i> 
                                        <p>Pin post</p>
                                    </div>
                                    <div className="item">
                                        <i className='bx  bxs-bookmark-alt'></i>  
                                        <div>
                                        <p>Save post</p>
                                        <p className="detail">Add this to your post items</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="item" onClick={() => startEdit(post)}>
                                        <i className='bx  bxs-edit'></i>    
                                        <p>Edit post</p>
                                    </div>
                                    <div className="item">
                                        <i className='bx  bxs-cog'></i>    
                                        <p>Edit audience</p>
                                    </div>
                                    <div className="item">
                                        <i className='bx  bxs-bell-slash'></i>     
                                        <p>Turn on notification on this post</p>
                                    </div>
                                    <div className="item">
                                        <i className='bx  bxs-translate'></i>      
                                        <p>Turn of translation</p>
                                    </div>
                                    <div className="item">
                                        <i className='bx  bxs-code'></i>       
                                        <p>Embed</p>
                                    </div>
                                    <hr />
                                     <div className="item" onClick={() => {setSelectedPostId(post.id); setShowDelete(true)}}>
                                        <i className='bx  bxs-trash-alt'></i>    
                                        <div>
                                        <p>Move to trash</p>
                                        <p className="detail">items in your trash are deleted after 30 days</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                            {/* <div className="icon-con"><i className="fa-solid fa-xmark"></i></div> */}
                            </div>
                        </div>
                        <div className="summary">
                         <p dir="auto">{post.text}</p> 
                        </div>
                        </div>
                         {post.image && <div className="img-post">
                         <img src={post.image} alt="post" />
                        </div>}
                        <div className="footer">
                        <div className="top">
                            <div className="item reaction" >
                            <div className="btn"  >
                                <div className="icon" ><i className="fa-regular fa-thumbs-up"></i></div>
                                <div className="text changed">Like</div>
                            </div>
                            </div>
                            <div className="item">
                            <div className="icon"><i className="fa-regular fa-comment"></i></div>
                            <div className="text">Commnet</div>
                            </div>
                            <div className="item">
                            <div className="icon"><i className="fa-regular fa-share-from-square"></i></div>
                            <div className="text">Share</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="bottom ">
                            <div className="img-con">
                                <img src={Imageprofile || "/default-avatar.png"} alt=""/>
                            </div>
                            <div className="input-con" >
                                <input type="text" placeholder="comment"/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            ))}

        {editId && (
        <div className="create-post row gx-0" >
         <div className="content col-lg-7 col-md-7 col-sl-12">
            <form action="" onSubmit={updatePost}>
            <div className="header">
                <h3>Edit post</h3>
                <div className="icon-con" onClick={() => setEditId(null)}>
                    <i className='bx  bx-x'></i> 
                </div>
            </div>
            <hr/>
            <div className="profile">
                <div className="img-con">
                    <img src={Imageprofile || "/default-avatar.png"} alt=""/>
                </div>
                <p>{User?.firstname} {User?.surname}</p>
            </div>
            <div className="caption-img">
            <input type="text" placeholder="What's on your mind, Ahmed" value={text}  onChange={(e) => setText(e.target.value)}/>
                    {preview && (
                    <div className="img-con">
                        <img src={preview} alt="preview" />
                    </div>
                    )}
            </div>
               <div className="options-post">
                <p>Add to your post</p>
                <div className="options">
                    <div className="img-con"  data-text="Photo/vedio" >
                    <input hidden id="upload" type="file" accept="image/*"  onChange={handleImage}/>
                        <label htmlFor="upload">
                        <img  src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png" alt=""/>
                        </label>
                    </div>
                    <div className="img-con tempo" data-text="Tage people">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yq/r/b37mHA1PjfK.png" alt=""/>
                    </div>
                    <div className="img-con tempo" data-text="Feeling/Activity">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png" alt=""/>
                    </div>
                    <div className="img-con tempo" data-text="checke in">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/y1/r/8zlaieBcZ72.png" alt=""/>
                    </div>
                    <div className="img-con tempo" data-text="GIF">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yT/r/q7MiRkL7MLC.png" alt=""/>
                    </div>
                    <div className="img-con tempo" data-text="More">
                        <i className='bx  bx-dots-horizontal-rounded'></i> 
                    </div>
                </div>
            </div>
            <button type="submit" className="post active">Save</button>
            </form>
         </div>
        </div>            
      )}

        {/* delete  */}
                {showDelete && (
                <div className="delete-container row gx-0">
                                <div className="content  col-lg-7 col-md-7 col-sl-12">
                                    <div className="head">
                                        <h2>Move to your trash?</h2>
                                        <div className="icon-con" onClick={() => setShowDelete(false)}>
                                            <i className='bx  bx-x'></i> 
                                        </div>
                                    </div>
                                    <div className="body">
                                    <p>Items in your trash will be automatically deleted after 30 days. You can delete them from your trash earlier by going to activity log in settings.</p>
                                    <div className="btns">
                                        <button className="cancel" onClick={() => setShowDelete(false)}>Cancel</button>
                                        <button className="move" onClick={() => deletepost(selectedPostId)}>Move</button>
                                    </div>
                                    </div>
                                </div>
                 </div>
                )}
    </div>
  );
};

export default Home;
