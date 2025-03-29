function showText() {
    let text = document.getElementById("sc").value;
    let output = lex(text)
    if (typeof(output) == "string") {
        console.log(output);
        document.getElementById("output").innerText = output;
        return;
    }
    document.getElementById("output").innerText = output;
}
