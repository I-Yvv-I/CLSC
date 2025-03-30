const keywords = ["feature", "letter", "rule"];

function lex(script) {
    let fl = script.split("\n");
    let tokens = [];

    let inrule = false;

    let i = 0;
    for (let line of fl) {
        let j = 0;
        let type = "";
        for (let char of line.split(" ")) {
            console.log(type,char,line.split(" "));
            if (type == "" && keywords.includes(char)) {
                tokens.push("KEY:" + char);
                type = char;
                if (type == "rule") {
                    inrule = true;
                }
            } else if (type == "" && inrule == true) { // In-Rule
                
            } else if (type == "feature") { // Feature
                if (char == "=") {
                    if (tokens[tokens.length-1].slice(0,3) != "VAR") {
                        return "Line " + i + ": '" + char + "' cannot be there, you need a variable dummy.";
                    }
                    tokens.push("VLS:" + line.split(" ")[j+1]);
                    break;
                } else {
                    tokens.push("VAR:" + char);
                }
            } else if (type == "letter") { // Letter
                if (char == "=") {
                    if (tokens[tokens.length-1].slice(0,3) != "LET") {
                        return "Line " + i + ": '" + char + "' cannot be there, you need a letter dummy.";
                    }
                    tokens.push("VLS:" + line.split(" ")[j+1]);
                    break;
                } else {
                    tokens.push("LET:" + char);
                }
            } else if (type == "rule") { // Rule
                if (char == "=") {
                    if (tokens[tokens.length-1].slice(0,3) != "RUL") {
                        return "Line " + i + ": '" + char + "' cannot be there, you need a rule-name dummy.";
                    }
                    if (line.split(" ")[j+1] != "{") {
                        return "Line " + i + ": Wheres the open curly bracket?";
                    }
                    break;
                } else {
                    tokens.push("RUL:" + char);
                }
            }
            j += 1;
        }
        console.log(tokens.join(","));
        i += 1;
    }

    console.log(tokens.join(","));
    return tokens;
}