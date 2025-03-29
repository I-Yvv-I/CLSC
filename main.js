function showText() {
    let text = document.getElementById("input").value;
    document.getElementById("output").innerText = text;
    lex(text)
}