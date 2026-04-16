const input = document.getElementById("msg");
const button = document.getElementById("send-btn");
const chat = document.getElementById("chat");

// 🔧 CONFIG: troque se necessário
const API_URL = "http://localhost:3000/chat";

button.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

function addMessage(text, type = "bot") {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, "user");
    input.value = "";

    const typing = document.createElement("div");
    typing.className = "message bot";
    typing.innerText = "Digitando...";
    chat.appendChild(typing);

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: msg })
        });

        if (!res.ok) throw new Error("Erro no servidor");

        const data = await res.json();

        typing.remove();
        addMessage(data.reply || "Sem resposta da IA");

    } catch (err) {
        console.error("Erro:", err);
        typing.innerText = "❌ Erro ao conectar com a IA.\nVerifique:\n- Servidor ligado\n- URL correta\n- CORS habilitado";
    }
}