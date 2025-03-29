function showText() {
    let text = document.getElementById("sc").value;
    let output = lex(text)
    document.getElementById("output").innerText = output.toString();
}
