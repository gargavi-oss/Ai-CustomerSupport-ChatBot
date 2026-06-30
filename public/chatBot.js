
(function(){
    const api_url = "http://localhost:3000/api/chat";
    const scriptTag = document.currentScript;
    const ownerId = scriptTag.getAttribute("bot-id");

    const STORAGE_KEY = `chatbot-history-${ownerId}`;
    if(!ownerId){
        console.log("Owner id not found");
        return
    }
    const button=document.createElement("div")
    button.innerHTML="💬";

    Object.assign(button.style,{
        position:"fixed",
        bottom:"24px",
        right:"24px",
        width: "56px",
        height:"56px",
        borderRadius: "50%",
        background:"#000",
        color:"#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor:"pointer",
        fontSize: "22px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
        zIndex:"999999"
    })

    document.body.appendChild(button)
    const box = document.createElement("div");
    Object.assign(box.style,{
        position:"fixed",
        bottom:"90px",
        right:"24px",
        width: "320px",
        height:"420px",
        background: "#fff",
        borderRadius:"14px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        display: "none",
        flexDirection: "column",
        gap:"20px",
        overflow: "hidden",
        zIndex:"999999",
        fontFamily:"Inter, system-ui, sans-serif",

    })
    box.innerHTML = `
    <div style="
        background:#111827;
        color:#fff;
        padding:14px 16px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:15px;
        font-weight:600;
    ">
        <span>💬 Customer Support</span>
        <span id="chat-close" style="cursor:pointer;font-size:18px;">✕</span>
    </div>
    
    <div
        id="chat-messages"
        style="
            flex:1;
            display:flex;
            flex-direction:column;
            gap:10px;
            padding:16px;
            overflow-y:auto;
            background:#f8fafc;
        "
    >
    </div>
    
    <div
        style="
            display:flex;
            align-items:center;
            gap:8px;
            padding:12px;
            border-top:1px solid #e5e7eb;
            background:#fff;
        "
    >
        <input
            id="chat-input"
            type="text"
            placeholder="Type your message..."
            style="
                flex:1;
                padding:10px 14px;
                border:1px solid #d1d5db;
                border-radius:10px;
                outline:none;
                font-size:14px;
            "
        />
    
        <button
            id="chat-send"
            style="
                background:#111827;
                color:white;
                border:none;
                padding:10px 16px;
                border-radius:10px;
                cursor:pointer;
                font-weight:600;
            "
        >
            Send
        </button>
    </div>
    `;
    document.body.appendChild(box)
    button.onclick=()=>{
        console.log("hello")
        box.style.display=box.style.display==="none"? "flex": "none";
    }
    document.getElementById("chat-close").onclick=()=>{
        box.style.display="none"
    }
    function saveMessage(text, from) {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    
        history.push({
            text,
            from,
            time: Date.now(),
        });
    
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
    function loadMessages() {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    
        history.forEach((msg) => {
            addMessage(msg.text, msg.from, false);
        });
    }
    const input= document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");
    const messageArea = document.getElementById("chat-messages");
    loadMessages();
    function addMessage(text, from, save = true) {
        const bubble = document.createElement("div");
    
        bubble.textContent = text;
    
        Object.assign(bubble.style, {
            maxWidth: "80%",
            padding: "10px 14px",
            borderRadius: "16px",
            fontSize: "14px",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            alignSelf: from === "user" ? "flex-end" : "flex-start",
            background: from === "user" ? "#111827" : "#ffffff",
            color: from === "user" ? "#ffffff" : "#111827",
            border: from === "user" ? "none" : "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        });
    
        messageArea.appendChild(bubble);
        messageArea.scrollTop = messageArea.scrollHeight;
    
        if (save) {
            saveMessage(text, from);
        }
    }
    sendBtn.onclick=async()=>{
        const text = input.value.trim();
        if(!text){
            return
        }
        addMessage(text,"user")
        input.value=""
        const typing = document.createElement("div");
        typing.innerHTML="Typing...";
        Object.assign(typing.style,{
            fontSize: "12px",
            color:"#6b7280",
            marginBottom:"8px",
            alignSelf:"flex-start"
        })
        messageArea.appendChild(typing)
        messageArea.scrollTop = messageArea.scrollHeight
        try {
            const response = await fetch(api_url,{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({
                message:text,ownerId
            })})
            const data = await response.json();
            messageArea.removeChild(typing)
            addMessage(data.message || "something went wrong","ai")
        } catch (error) {
            console.log(error)
            messageArea.removeChild(typing)
            addMessage(data || "something went wrong","ai")
        }
    }



})();