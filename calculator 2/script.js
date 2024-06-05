// script.js

// Use insert() function to insert the number in textview.
function insert(num) {
    document.getElementById("textview").value += num;
}

// Use equal() function to return the result based on passed values.
function equal() {
    var exp = document.getElementById("textview").value;
    if (exp) {
        document.getElementById("textview").value = eval(exp);
    }
}

/* Here, we create a clearInput() function to clear the textview. */
function clearInput() {
    document.getElementById("textview").value = '';
}

/* Here, we create a backspace() function to remove the number at the end of the numeric series in textview. */
function backspace() {
    var exp = document.getElementById("textview").value;
    document.getElementById("textview").value = exp.substring(0, exp.length - 1);
}

/* Add a square() function to calculate x^2 */
function square() {
    var num = parseFloat(document.getElementById("textview").value);
    if (!isNaN(num)) {
        document.getElementById("textview").value = num * num;
    }
}

/* Add a sqrt() function to calculate the square root */
function sqrt() {
    var num = parseFloat(document.getElementById("textview").value);
    if (!isNaN(num) && num >= 0) {
        document.getElementById("textview").value = Math.sqrt(num);
    } else {
        document.getElementById("textview").value = "Error";
    }
}

/* Add an nsquare() function to calculate x^n */
function nsquare() {
    var num = parseFloat(document.getElementById("textview").value);
    if (!isNaN(num)) {
        var exponent = prompt("Enter the exponent (n):");
        if (exponent !== null) {
            exponent = parseFloat(exponent);
            if (!isNaN(exponent)) {
                document.getElementById("textview").value = Math.pow(num, exponent);
            } else {
                document.getElementById("textview").value = "Error";
            }
        }
    } else {
        document.getElementById("textview").value = "Error";
    }
}
// Trigonometric functions
function sinFunction() {
    var num = parseFloat(document.getElementById("textview").value);
    if (!isNaN(num)) {
        document.getElementById("textview").value = Math.sin(num);
    } else {
        document.getElementById("textview").value = "Error";
    }
}

function cosFunction() {
    var num = parseFloat(document.getElementById("textview").value);
    if (!isNaN(num)) {
        document.getElementById("textview").value = Math.cos(num);
    } else {
        document.getElementById("textview").value = "Error";
    }
}

function tanFunction() {
    var num = parseFloat(document.getElementById("textview").value);
    if (!isNaN(num)) {
        document.getElementById("textview").value = Math.tan(num);
    } else {
        document.getElementById("textview").value = "Error";
    }
}