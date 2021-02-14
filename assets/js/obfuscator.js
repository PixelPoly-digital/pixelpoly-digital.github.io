// vars
let copy = document.getElementById("copy");
let input = document.getElementById("input");
let output = document.getElementById("output");
let minified = document.getElementById("minified");
let obfuscate = document.getElementById("obfuscate");
let result = document.getElementById("result");
let addon = document.getElementById("addon");

function obfaddon() {
  if (addon.files.length > 0) {
    input.disabled = true;

    // setup ZIP
    var zip = new JSZip;
    let files = addon.files;

    for (let file of files) {
      let filename = file.name;
      console.log(filename);
    }
  } else {
    input.disabled = false;
  };
};

function obf() {
  if (input.value !== "") {
    obfuscate.disabled = false;
    result.style.display = "block";
  } else {
    obfuscate.disabled = true;
    result.style.display = "none";
  };
};
obf();

obfuscate.onclick = function() {
	if (input.value) {
		obfuscateMain();
	} else {}
};

function obfuscateMain() {
  let one_arg = String(input.value).match(/\"[^"]*"|'[^']*'/g);
  if (Array.isArray(one_arg)) {
    window.alert("Note! This process may take long according to your JSON file size! Be wise about its usage.");
    let result = String(input.value);
    let pre_result = "";
    let index = 0;
    while (index < one_arg.length) {
      result = result.replace((one_arg[index].replace("\"", "").replace("\"", "")), `${unicodeEscape(one_arg[index].replace("\"", "").replace("\"", ""))}`);
      index++;
    }
    pre_result = result;
    window.setTimeout(() => {
      output.value = (pre_result);
      if (minified.checked === true) {
        let result = JSON.minify(output.value);
        output.value = result;
      } else {
        console.log(input.value);
      }
    });
  } else {

  }
};

copy.onclick = function() {
  output.select();
  output.setSelectionRange(0, output.value.length);
  document.execCommand("copy");
};

// Unicode Escaoe Code. #0753
let unicodeEscape = (str) => {
  let result = "";
  for (let index = 0, charCode; !isNaN(charCode = str.charCodeAt(index++));) {
    result += "\\u" + ("0000" + charCode.toString(16)).slice(-4);
  }
  return result;
};


// JSON.minify()
(function(window) {
  var JSON = this.JSON;

  // Create the global JSON object if it doesn't exist.
  if (Object(JSON) !== JSON) JSON = this.JSON = {};

  JSON.minify = function(source) {
    var index = 0,
      length = source.length,
      result = "",
      symbol,
      position;

    while (index < length) {
      symbol = source.charAt(index);

      switch (symbol) {
        // Ignore whitespace tokens. According to ES 5.1 section 15.12.1.1,
        // whitespace tokens include tabs, carriage returns, line feeds, and
        // space characters.
        case "\t":
        case "\r":
        case "\n":
        case " ":
          index += 1;
          break;
          // Ignore line and block comments.
        case "/":
          symbol = source.charAt(index += 1);
          switch (symbol) {
            // Line comments.
            case "/":
              position = source.indexOf("\n", index);
              if (position < 0) {
                // Check for CR-style line endings.
                position = source.indexOf("\r", index);
              }
              index = position > -1 ? position : length;
              break;
              // Block comments.
            case "*":
              position = source.indexOf("*/", index);
              if (position > -1) {
                // Advance the scanner's position past the end of the comment.
                index = position += 2;
                break;
              }
              throw SyntaxError("Unterminated block comment.");
            default:
              throw SyntaxError("Invalid comment.");
          }
          break;
          // Parse strings separately to ensure that any whitespace characters and
          // JavaScript-style comments within them are preserved.
        case '"':
          position = index;
          while (index < length) {
            symbol = source.charAt(index += 1);
            if (symbol == "\\") {
              // Skip past escaped characters.
              index += 1;
            } else if (symbol == '"') {
              break;
            }
          }
          if (source.charAt(index) == '"') {
            result += source.slice(position, index += 1);
            break;
          }
          throw SyntaxError("Unterminated string.");
          // Preserve all other characters.
        default:
          result += symbol;
          index += 1;
      }
    }
    return result;
  };
}).call(this);