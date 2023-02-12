setTimeout(()=>{
    GetUserInfo()
    GetPostsProfile()
    GetIdFromUrl()
},3000)
loaderToggle()

function GetIdFromUrl()
{
    const urlIdParams = new URLSearchParams(window.location.search)
    const id = urlIdParams.get("userId")
    return id
}
function GetUserInfo()
{
    let id   
    if(GetIdFromUrl() == "" || GetIdFromUrl() == null)
    {
        id =JSON.stringify( localStorage.getItem("user-info").id)
    }else
    {
        id = GetIdFromUrl()
    }
    loaderToggle()
    const url=`https://tarmeezacademy.com/api/v1/users/${id}`
    axios.get(url)
    .then((res)=>{
        let user= res.data.data
        document.getElementById("image-profile").src=user.profile_image
        document.getElementById("email-profile").innerHTML=user.email
        document.getElementById("userName-profile").innerHTML=user.username
        document.getElementById("name-profile").innerHTML=user.name
        document.getElementById("postCount-profile").innerHTML=user.posts_count
        document.getElementById("comment-profile").innerHTML=user.comments_count
    })  
}
 function GetPostsProfile()
{
    let id   
    if(GetIdFromUrl() == "" || GetIdFromUrl() == null)
    {
        id =JSON.stringify( localStorage.getItem("user-info").id)
    }else
    {
        id = GetIdFromUrl()
    }
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
    .then( response => {
        let Posts  =  response.data.data
        for( let post of Posts)
        {   
            // JSON.parse(localStorage.getItem("user-info")) != null || JSON.parse(localStorage.getItem("user-info")).id == post.author.id
            let thereToken = localStorage.getItem("token")
            let btnvontentedit= ``
            let btnvontentdel= ``
            if(thereToken)
            {
                let IsMyPost = JSON.parse(localStorage.getItem("user-info")).id === post.author.id ;
                if(IsMyPost)
                {
                    btnvontentedit =`<button onclick="editClicked('${encodeURIComponent(JSON.stringify(post))}')" id="btn_Edit" class="btn btn-secondary p-2 m-1 " style="float:right;width:60px; height:40px ;out-line:none;border:none" >Edit</button>`
                    btnvontentdel =`<button onclick="deleteClicked('${encodeURIComponent(JSON.stringify(post))}')" id="btn_Del" class="btn btn-danger p-2 m-1 " style="float:right;width:60px; height:40px ;out-line:none;border:none" >Delete</button>`
                }
                else{
                    btnvontentedit=``
                    btnvontentdel=``
                }
            }
            let content = 
            `
                <!-- Post -->
                    <div class="post card mb-3 shadow-lg " >
                        <div class="card-header">
                            <img src="${post.author.profile_image}" class="rounded-circle" width="25px" height="25px" alt="">
                            <b>${post.author.name}</b>
                            ${btnvontentdel}
                            ${btnvontentedit}

                        </div>
                        
                        <div class="card-body" onclick="postClicked(${post.id})">
                            <img src="${post.image}" width="100%" height="max-content" class="rounded "  alt="">
                            <p style="opacity: .9; font-size: 15px;" class="mx-1">${post.created_at}</p>
                            <h5 class="card-title">${post.title} </h5> 
                            <p class="card-text">
                            ${post.body}
                            </p>
                            <hr>

                            <div class="comment" ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square mb-1 mr-1"  viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                                <span class="fw-bold mx-2">(${post.comments_count}) comment</span>
                            
                            </div>

                        </div>
                    </div>
            <!--// Post //-->
            `
            document.getElementById("posts").innerHTML +=  content
        } 
    })      
    .finally(()=>{
        loaderToggle(false)
    })
}
