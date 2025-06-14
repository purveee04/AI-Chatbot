let prompt=document.querySelector("#prompt")
let chatContainer=document.querySelector(".chat-container")
// let imagebtn=document.querySelector("#image")
// let imageinput=document.querySelector("#image input")

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`"

let user={
    message:null,
    // file:{
    //     mime_type:null,
    //         data: null
    // }
}
async function generateResponse(aiChatBox) {

    let text=aiChatBox.querySelector(".ai-chat-area")
    let RequestOption={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
    //     body:JSON.stringify({
    //         "contents": [
    //   {
    //     "parts": [
    //       {
    //         "text": user.message
    //       },
    //       (user.file.data?[{"inline_data":user.file}] :[])
    //     ]
    //   }
    // ]
    //     })
    body: JSON.stringify({
    "contents": [
        {
            "parts": [
                {
                    "text": user.message
                }
            ]
        }
    ]
})

    }
    try{
        let response= await fetch(Api_Url,RequestOption)
        let data=await response.json()
        let apiResponse= data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        text.innerHTML=apiResponse
    }
    catch(error){
        console.log(error)
    }
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})

    }
}

function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}

function handlechatResponse(message){
    user.message=message
    let html=`<img src="user.png" alt="" id="userImage" width="50">
<div class="user-chat-area">
${user.message}
</div>`
prompt.value=""
let userChatBox=createChatBox(html,"user-chatbox")
chatContainer.appendChild(userChatBox)

chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
setTimeout(()=>{
let html=`<img src="chatbot.png" alt="" id="aiImage" width="50">
 <div class="ai-chat-area">
 </div>`
 let aiChatBox=createChatBox(html,"ai-chatbox")
 chatContainer.appendChild(aiChatBox)
 generateResponse(aiChatBox)
},600)


}

prompt.addEventListener("keydown",(e)=> {
    if(e.key=="Enter"){
        handlechatResponse(prompt.value)
        
    }
    
    
})

// imageinput.addEventListener("change",()=>{
//     const file=imageinput.files[0]
//     if(!file) return 
//     let reader=new FileReader()
//     reader.onload=(e)=>{
//         let base64string=e.target.result.split(",")[1]
//         user.file={
//             mime_type:file.type,
//             data:base64string
//         }
//     }
//     reader.readAsDataURL(file)
// })
// imagebtn.addEventListener("click",()=>{
//     imagebtn.querySelector("input").click()
// })

