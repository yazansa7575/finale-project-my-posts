
setNavBar()     
setInterval(()=>{
    setNavBar()     
},2000)
    
function login()
{
    const UserName = document.getElementById("UserName").value 
    const Password = document.getElementById("Password").value 
    const url ="https://tarmeezacademy.com/api/v1/login"
    const par = {
        "username" : UserName,
        "password" : Password
    }
    loaderToggle()
    axios.post(url,par)
    .then((res)=>{
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user-info",JSON.stringify(res.data.user));
        // hide modal 
        const modal =document.getElementById("login")
        const modalInsta = bootstrap.Modal.getInstance(modal)
        modalInsta.hide()

        // cheek on the naveBar 
        setNavBar();

        // alert login success
        document.getElementById("alert_login_success").style.display="block"
        setTimeout(()=>{
            document.getElementById("alert_login_success").style.display="none"
       },3500)
       setTimeout(()=>{
        let userId =JSON.parse(localStorage.getItem("user-info"))
        window.location.search= `userId=${userId.id}`
       
       },2000)
      
    }).finally(()=>{
        loaderToggle(false)
    })
     

        
        
    
    
    
}
function Register()
{
    const reg_UserName = document.getElementById("reg_UserName").value 
    const reg_Password = document.getElementById("reg_Password").value 
    const reg_name = document.getElementById("reg_name").value 
    const reg_file = document.getElementById("reg_file").files[0] 
    const url ="https://tarmeezacademy.com/api/v1/register"
   
    const formData =new FormData()
    formData.append("username",reg_UserName) 
    formData.append("password",reg_Password) 
    formData.append("name",reg_name) 
    formData.append("image",reg_file) 
    loaderToggle()
    axios.post(url,formData)
    .then((response)=>{
        const Token = response.data.token
        const user_info = response.data.user
        localStorage.setItem("token",Token)
        localStorage.setItem("user-info",JSON.stringify(user_info));

        setNavBar()
        //hide
        const reg_modal =document.getElementById("Register")
        const reg_modalInsta = bootstrap.Modal.getInstance(reg_modal)
        reg_modalInsta.hide()

        // alert login success
        document.getElementById("alert_register_success").style.display="block"
        setTimeout(()=>{
            document.getElementById("alert_register_success").style.display="none"
        },3500)
       location.reload()

    }).finally(()=>{
        loaderToggle(false)
    })






} 
function logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("user-info")
    setNavBar()

    // alert logout danger
    document.getElementById("alert_logout_danger").style.display="block"
    setTimeout(()=>{
    document.getElementById("alert_logout_danger").style.display="none"
    },3500)
    location.reload()
    const urlIdParams = new URLSearchParams(window.location.search)
    window.location.search =""
}
function setNavBar()
{

    // let Register_nav =document.getElementById("Register_nav")
    // let login_nav =document.getElementById("login_nav")
    // let LogOut_nav =document.getElementById("LogOut_nav")
    let addPostIcon =document.getElementById("addPostIcon")

    if(localStorage.getItem("token") == null) //show log & register
    {
        Register_nav.style.display="block"
        login_nav.style.display="block"
        if(addPostIcon != null){
            
            addPostIcon.style.display="none"
        }
        LogOut_nav.style.display="none"

    }else //show logOut
    {
        Register_nav.style.display="none"
        login_nav.style.display="none"
        if(addPostIcon != null){
         addPostIcon.style.display="inline-flex"
        }
        LogOut_nav.style.display="block"

    }

}
function postClicked (id)
{
    location.href=`PostDetails.html?id=${id}`
}
function editClicked(postCome)
{
    
    let Post = JSON.parse(decodeURIComponent(postCome))
    
    let btn_hidden = document.getElementById("btn_hidden").value=Post.id
    
    // open sane modal the create post 
    let modal = new bootstrap.Modal(addPoset,{})
    modal.toggle(); 
    // edit title && btn of post 
    document.getElementById("title_post_edit").innerHTML="Edit Post"
    document.getElementById("btn_UC").innerHTML="Update"
    // put info post
    let Body_Post = document.getElementById("Body_Post")
    let Title_Post = document.getElementById("Title_Post")

    Body_Post.value = Post.body
    Title_Post.value = Post.title


}
function createClicked()
{
    // open sane modal the create post 
    let modal = new bootstrap.Modal(addPoset,{})
    modal.toggle(); 
    // edit title && btn of post 
    document.getElementById("title_post_edit").innerHTML="Create New Post"
    document.getElementById("btn_UC").innerHTML="Create"
    // put info post
    let Body_Post = document.getElementById("Body_Post")
    let Title_Post = document.getElementById("Title_Post")

    Body_Post.value = ""
    Title_Post.value = ""

    let btn_hidden = document.getElementById("btn_hidden").value=""

}
function deleteClicked(postCome)
{
    let Post = JSON.parse(decodeURIComponent(postCome))
    let HeIsSur = confirm("are you sur");
    if(HeIsSur)
    {   loaderToggle()
        const url = `https://tarmeezacademy.com/api/v1/posts/${Post.id}`
        let token = localStorage.getItem("token")
        axios.delete(url,{
            headers:{
                "authorization":`Bearer ${token}`
            }
        })
        .then((res)=>{
            location.reload()
        }).finally(()=>{
            loaderToggle(false)
        })
    }
    else{
        return
    }
    

}
function CreateNewPost()
{
    
    let post_id = document.getElementById("btn_hidden").value
    let isCreated = post_id == null ||post_id == "" 

    const Title_Post = document.getElementById("Title_Post").value 
    const body_Post = document.getElementById("Body_Post").value 
    const image = document.getElementById("File_Post").files[0] 
    const token = localStorage.getItem("token")
    let url =""

        
    const formData = new FormData()

    formData.append("title",Title_Post)
    formData.append("body",body_Post)

    if(isCreated)
    {
        loaderToggle()
        formData.append("image",image)
        url=`https://tarmeezacademy.com/api/v1/posts`
        axios.post(url,formData,{
        headers:{
            "authorization":`Bearer ${token}`
        }
        })
        .then((res)=>{
            
            // hide modal 
            const modal =document.getElementById("addPoset")
            const modalInsta = bootstrap.Modal.getInstance(modal)
            modalInsta.hide()
            
            // alert login success
            document.getElementById("alert_addPost_success").style.display="block"
            setTimeout(()=>{
                document.getElementById("alert_addPost_success").style.display="none"
            },2500)
        
            location.reload()
            window.scrollTo(0,0);

            
        })
        .catch((error)=>{
            let message = error.response.data.message;
            // alert error success
            document.getElementById("alert_addPost_error_success").style.display="block"
            document.getElementById("error").innerHTML=message
            setTimeout(()=>{
                document.getElementById("alert_addPost_error_success").style.display="none"
            },2500)
        })
        .finally(()=>{
            loaderToggle(false)
        })
        
    }
    else
    {
        loaderToggle()
        formData.append("_method","put")
        url=`https://tarmeezacademy.com/api/v1/posts/${post_id}`
        axios.post(url,formData,{
            headers:{
                "authorization":`Bearer ${token}`
            }
        })
        .then((res)=>{
            
            // hide modal 
            const modal =document.getElementById("addPoset")
            const modalInsta = bootstrap.Modal.getInstance(modal)
            modalInsta.hide()
            
            // alert login success
            document.getElementById("alert_edit_success").style.display="block"
            setTimeout(()=>{
                document.getElementById("alert_edit_success").style.display="none"
            },2500)
        
            location.reload()
            window.scrollTo(0,0);

            
        })
        .catch((error)=>{
            let message = error.response;
            // alert error success
            document.getElementById("alert_edit_error_success").style.display="block"
            document.getElementById("error").innerHTML=message
            setTimeout(()=>{
                document.getElementById("alert_edit_error_success").style.display="none"
            },2500)
        })
        .finally(()=>{
            loaderToggle(false)
        })
        

    }
   
}
function profileClicked()
{
    let userId = JSON.parse(localStorage.getItem("user-info"))
    window.location=`profile.html?userId=${userId.id}`
}
function loaderToggle(on =true ){
    if(on)
    {
        document.getElementById("loader").style.visibility="visible"
    }
    else{
        document.getElementById("loader").style.visibility="hidden"
    }

}