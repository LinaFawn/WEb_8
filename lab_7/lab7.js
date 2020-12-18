function get_date(){
    var today = new Date();
    var date = today.toLocaleDateString();
    var time = today.toLocaleTimeString().substring(0, 5);
    return time + " " + date;
}

function answer(isExp, text){
    if (isExp){
        return new Calculator().calculate(text.substring(1))
    }
    else{
        var answer = first[Math.floor(Math.random()*10)] + " "
            + second[Math.floor(Math.random()*10)] + " "
            + third[Math.floor(Math.random()*10)];
        return answer;
    }
}

function send(text, sender, isYour){
    var template = document.querySelector("#msg_tmpl").content.children[0];
    var msg = template.cloneNode(true);
    var chat = document.getElementById("chat");

    msg.children[0].children[0].textContent = sender;
    msg.children[0].children[1].textContent = get_date();
    msg.children[1].children[0].textContent = text;
    msg.children[0].children[2].onclick = () => {msg.parentNode.removeChild(msg);};

    if (isYour) msg.classList.add("youth_msg");
    else msg.classList.add("answer_msg");

    chat.appendChild(msg);
}

function get_words(path, word){
    var words = []
    $.getJSON(path)
        .done(function(data){
            data[word].forEach(element => {
                words.push(element);
            });
        });
    return words;
}

function init_chat(){
    first = get_words("dictionary.json", "first");
    second = get_words("dictionary.json", "second");
    third = get_words("dictionary.json", "third");
    var input = document.getElementById("chat_input");
    var btn = document.getElementById("chat_btn");

    btn.onclick = () => {
        let msg = input.value.trim();
        if(msg !== ""){
            input.value = "";
            send(msg, "You", true);
            let isExp = false;
            if(msg.charAt(0) === '=') isExp = true;
            send(answer(isExp, msg), "Bot", false);
        }
    }
}


var first, second, third
init_chat();
send("Пообщайся со мной!", "Bot", false)