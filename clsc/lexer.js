const keywords = ["feature", "letter", "rule"];
const symbols = ["//",">","/","_"];

function lex(script) {
    let fl = script.split("\n");
    let tokens = [];

    let inrule = false;
    let rule_contents = [];

    let i = 0;
    for (let line of fl) {
        let j = -1;
        let type = "";
        let inbracket = false;
        let bracket = [];
        for (let char of line.split(" ")) {
            j += 1;
            //console.log(type,inrule,char,line.split(" "));
            if (type == "" && inrule == false && keywords.includes(char)) {
                tokens.push("KEY:" + char);
                type = char;
            } else if (char == ";" || char.charAt(0) == ';') { // New line / comment
                tokens.push("EOL");
                break
            } else if (type == "" && inrule == true) { // In-Rule
                //console.log(char.charAt(0),char.charAt(0) == "[" || inbracket,bracket)
                if (char == '}') {
                    tokens.push(rule_contents)
                    rule_contents = []
                } else if (char.length == 0) {
                    continue;
                } else if (symbols.includes(char)) {
                    rule_contents.push("SYM:" + char);
                } else if (char.charAt(0) == "[" || inbracket) {
                    inbracket = true
                    if (char.slice(1,-2).includes(',')) {
                        return "Line " + (i+1) + ": '" + char + "' cannot have a ','.";
                    }
                    bracket.push(char.slice(1,-1))
                    //console.log(bracket,char.charAt(char.length-1),char.slice(-1,-2))
                    if (char.charAt(char.length-1) == ']') {
                        rule_contents.push("BRA:" + bracket.join(','));
                        inbracket = false
                        bracket = []
                    }
                } else {
                    rule_contents.push("LET:" + char);
                }
            } else if (type == "feature") { // Feature
                if (char == "=") {
                    if (tokens[tokens.length-1].slice(0,3) != "VAR") {
                        return "Line "+ (i+1) + ": '" + char + "' cannot be there, you need a variable dummy.";
                    }
                    let vls = line.split(" ")[j+1];
                    let semi = false
                    if (vls.charAt(vls.length-1) == ';') {
                        vls = vls.slice(0,-1)
                        semi = true
                    }
                    tokens.push("VLS:" + vls);
                    if (semi) {
                        tokens.push("EOL");
                    }
                    break;
                } else {
                    tokens.push("VAR:" + char);
                }
            } else if (type == "letter") { // Letter
                if (char == "=") {
                    if (tokens[tokens.length-1].slice(0,3) != "LET") {
                        return "Line "+ (i+1) + ": '" + char + "' cannot be there, you need a letter dummy.";
                    }
                    let vls = line.split(" ")[j+1];
                    let semi = false
                    if (vls.charAt(vls.length-1) == ';') {
                        vls = vls.slice(0,-1)
                        semi = true
                    }
                    tokens.push("VLS:" + vls);
                    if (semi) {
                        tokens.push("EOL");
                    }
                    break
                } else {
                    tokens.push("LET:" + char);
                }
            } else if (type == "rule") { // Rule
                if (char == "=") {
                    if (tokens[tokens.length-1].slice(0,3) != "RUL") {
                        return "Line "+ (i+1) + ": '" + char + "' cannot be there, you need a rule-name dummy.";
                    }
                    if (line.split(" ")[j+1] != "{") {
                        return "Line "+ (i+1) + ": Wheres the open curly bracket?";
                    }
                    tokens.push("EOL");
                    inrule = true;
                    break;
                } else {
                    tokens.push("RUL:" + char);
                }
            }
        }
        if (tokens[tokens.length-1] != "EOL") {
            console.log(tokens);
            return "Line "+ (i+1) + ": No semicolon?";
        }
        //console.log(tokens.join("|"));
        i += 1;
    }

    console.log(tokens);
    return tokens;
}