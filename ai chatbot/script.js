let prompt = document.querySelector("#prompt");
let chatContainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let submit = document.querySelector("#submit");
let image = document.querySelector("#image img");
let imageinput = document.querySelector("#image input")

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBIFkR0z3NnJPWWvLOexcbTdtZ6Do7EGHQ"
let user = {
    message:null,
    file:{
        mime_type:null,
          data:null
    }
}
let generateResponse = async (aichatbox) =>{
    let text = aichatbox.querySelector(".ai-chat-area")
    let RequestResponse = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "contents": [{
              "parts":[{"text": user.message},(user.file.data?[{"inline_data":user.file}]:[])]
              }]
             }) 
    }
    try{
    let response = await fetch(API_URL,RequestResponse);
    let data = await response.json()
    let apiResponse = data.candidates[0].content.parts[0].text
    .replace(/\*\*(.*?)\*\*/g, "$1")  // Remove bold formatting
    .replace(/\*(.*?)\*/g, "$1")      // Remove italics
    .replace(/\$(.*?)\$/g, "$1")      // Remove LaTeX-style math notation
    .replace(/\\frac{([^}]*)}{([^}]*)}/g, "($1)/($2)") // Convert fractions
    .replace(/\\{([^}]*)}/g, "$1")    // Remove unnecessary brackets
    .replace(/\\ne/g, "≠")            // Convert ≠ (not equal) symbol
    .replace(/\\infty/g, "∞")         // Convert ∞ (infinity) symbol
    .replace(/\\times/g, "×")         // Convert multiplication symbol
    .replace(/\\boxed{([^}]*)}/g, "[$1]") // Replace boxed answers with square brackets
    .trim();


    text.innerHTML = apiResponse;
    }
    catch(error){
        console.log(error);
    }
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
        image.src="img.svg";
        image.classList.remove("choose");
        user.file={
            mime_type:null,
            data:null
        }
    }

}
// Function to create chat box
let makeChatbox = (html, classes) => {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
};

// Function to handle user message
let handleChatResponse = (message) => {
    user.message = message;
    if (message.trim() === "") return; 

    let html = `<div class="user-chatbox">
            <div class="user-chat-area">${user.message}
            ${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg"/>`:""}
            </div>
            <img src="user.png" alt="User" id="userimg">
        </div>`;

    let userChatbox = makeChatbox(html, "user-chatbox");
    chatContainer.appendChild(userChatbox);
    chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
    prompt.value = "";
    setTimeout(()=>{
        let htmlai =`<div class="ai-chatbox">
                <img src="ai.png" alt="AI" id="aiimg">
                <div class="ai-chat-area">
                    <img src="load.svg" alt="Loading..." class="load">
                </div>
            </div>`
        let aichatbox = makeChatbox(htmlai,"ai-chatbox")
        chatContainer.appendChild(aichatbox)
        generateResponse(aichatbox)
    },400)
    }

// Listen for "Enter" key press
prompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevents line break in input
        handleChatResponse(prompt.value);
    }
});
imageinput.addEventListener("change",()=>{
    const file = imageinput.files[0];
    if(!file) return;
    let reader = new FileReader();
    reader.onload = (e)=>{
        let base64str = e.target.result.split(",")[1]
        user.file = {
                mime_type:file.type,
                  data:base64str
        }
        image.src=`data:${user.file.mime_type};base64,${user.file.data}`
        image.classList.add("choose");
    } 
    reader.readAsDataURL(file);
})
imagebtn.addEventListener("click",()=>{
    imagebtn.querySelector("input").click();
})
submit.addEventListener("click",()=>{
    handleChatResponse(prompt.value);
})