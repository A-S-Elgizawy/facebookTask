
import { useState } from "react";
import { useEffect, useRef } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const [opendetails, setOpendetails] = useState({});
  const [preview, setPreview] = useState(null);
  const [position, setPosition] = useState("down");
  const menuRef = useRef(null)
  const isDisabled = !text && !image;

    const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };



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
  };
  
    useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpendetails(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const toggleDropdown = (id, e) => {
//   setShowdetails(prev => (prev === id ? null : id)); لبوست واحد فقط
    setOpendetails(prev => ({
    ...prev,
    [id]: !prev[id], // يقلب حالة البوست الحالي فقط
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
                    <div className="img-con myphoto">
                        <img src="https://media.licdn.com/dms/image/v2/D5603AQHAyAjny9anaQ/profile-displayphoto-scale_100_100/B56ZoqmV.wJkAg-/0/1761651287291?e=1768435200&v=beta&t=GKTeWalEiyx3p5LiMUGdcUMZBMvAy5XYsXnxi8xofF0" alt="" />
                    </div>
                    <input type="text" placeholder="What's your on mind, Ahmed" onClick={() => setShowPage(true)} />
                    
                    <div className="featuers">
                        <div className="img-con" >
                            <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/c0dWho49-X3.png" alt="" />
                        </div>
                        <div className="img-con" onClick={() => setShowPage(true)}>
                            <input type="file" hidden id="uploadDirect" accept="image/*"  onChange={handleImage}/>
                            <label htmlFor="uploadDirect">
                                <img src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png" alt="" />
                            </label>
                        </div>
                        <div className="img-con">
                            <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png" alt="" />
                        </div>
                    </div>
            </div>
        </div>

      {/* Posts */}
      {/* <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.text}</p>
            {post.image && <img src={post.image} alt="post" />}
          </div>
        ))}
      </div> */}

        {/*create-post*/}
        {showPage && (
    <div className="create-post row gx-0" >
         <div className="content col-lg-7 col-md-7 col-sl-12">
            <form action="" onSubmit={handleSubmit}>
            <div className="header">
                <h3>Create post</h3>
                <div className="icon-con" onClick={() => setShowPage(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <hr/>
            <div className="profile">
                <div className="img-con">
                    <img src="https://media.licdn.com/dms/image/v2/D5603AQHAyAjny9anaQ/profile-displayphoto-scale_100_100/B56ZoqmV.wJkAg-/0/1761651287291?e=1764806400&v=beta&t=jurAOopIOCrZLDo4x3tyYpGId2qN166RETTFpAzH900" alt=""/>
                </div>
                <p>Ahmed Elgizawy</p>
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
                    <div className="img-con" data-text="Tage people">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yq/r/b37mHA1PjfK.png" alt=""/>
                    </div>
                    <div className="img-con" data-text="Feeling/Activity">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png" alt=""/>
                    </div>
                    <div className="img-con" data-text="checke in">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/y1/r/8zlaieBcZ72.png" alt=""/>
                    </div>
                    <div className="img-con" data-text="GIF">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v4/yT/r/q7MiRkL7MLC.png" alt=""/>
                    </div>
                    <div className="img-con" data-text="More">
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
                                <img src="https://scontent.fcai21-4.fna.fbcdn.net/v/t39.30808-1/552215317_3125705140935348_3117049517644095522_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=102&ccb=1-7&_nc_sid=1d2534&_nc_ohc=jX10d4mE48gQ7kNvwH-HFi3&_nc_oc=AdmXnYrUYoqZNgFsjNdU4QhrSxDYohHvz09kw9Sjn81cJWolByjc3NHtQg-YPouBoIM&_nc_zt=24&_nc_ht=scontent.fcai21-4.fna&_nc_gid=F_3jHkFQRHsO_mYGKBNwpQ&oh=00_AfjwOFws1155Wduwjm3xPUrpB-r-EZbFBuHt7Jp2bU5zjw&oe=691A6EB3" alt=""/>
                            </div>
                            <div className="text">
                                <p className="name">Amir Abdelgelel</p>
                                <div >
                                <p className="hour"> 2  . <i className="fa-solid fa-earth-americas"></i></p>
                                </div>
                            </div>
                            </div>
                            <div className="right">
                            <div className="icon-con togglebtn" ref={menuRef} onClick={(e) => toggleDropdown(post.id,e)}><i className='bx  bx-dots-horizontal-rounded'></i>
                            {opendetails[post.id] && (
                                <div className={`dropdown ${position}`}>
                                    <div className="item">
                                        <i className='bx  bxs-pin'></i> 
                                        <p>Pin post</p>
                                    </div>
                                    <div className="item" onClick={() => console.log('hello')}>
                                        <i className='bx  bxs-bookmark-alt'></i>  
                                        <div>
                                        <p>Save post</p>
                                        <p className="detail">Add this to your post items</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="item">
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
                                     <div className="item" onClick={() => setShowDelete(true)}>
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
                        <div className="bottom row">
                            <div className="col-1 img-comment">
                            <div className="img-con">
                                {/* <img src="" alt=""/> */}
                            </div>
                            </div>
                            <div className="col-11">
                            <div className="input-con" >
                                <textarea  name="" id="" placeholder="Comment as Ahmed S El Gezawy" rows="1"  dir="auto" ></textarea>
                                <div className="icons">
                                <div className="icons-option">
                                    <div className="icon-con"><i className="fa-regular fa-camera"></i></div>
                                    <div className="icon-con"><i className="fa-regular fa-face-smile"></i></div>
                                </div>
                                <i className="fa-solid fa-paper-plane"  ></i>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            ))}

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
                    <button className="move">Move</button>
                 </div>
                </div>
            </div>
           </div>
        )}
    </div>
  );
};

export default Home;
