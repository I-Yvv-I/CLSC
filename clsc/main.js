function showText() {
    let text = document.getElementById("sc").value;
    let input = document.getElementById("input").value;
    let lexed = lex(text)
    if (typeof(lexed) == "string") {
        console.log(lexed);
        document.getElementById("output").innerText = lexed;
        return;
    }
    let output = parse(lexed,input.split('\n'))
    if (output.length == 0) {
        return;
    }
    document.getElementById("output").innerText = output;
}
