function createTable() {
    event.preventDefault();

    const previousTable = document.getElementById("Table");
    if (previousTable) {
        previousTable.remove();
    }

    const tableLocation = document.getElementsByClassName("container-table")[0];

    const table = document.createElement("table");
    table.id = "Table";
    const tableBody = document.createElement("tbody");
    const columnNumber = (Number(document.getElementById("maxColumn").value) - Number(document.getElementById("minColumn").value)) + 2;
    const rowNumber = (Number(document.getElementById("maxRow").value) - Number(document.getElementById("minRow").value)) + 2;

    for (var i = 0; i < columnNumber; i++) {
        const rows = document.createElement("tr");

        for (var j = 0; j < rowNumber; j++) {
            const box = document.createElement("td");
            if (i === 0 && j === 0) {
                box.textContent = "";
                // box.classList.add("fixed-column");
            } else if (j === 0) {
                box.textContent = Number(document.getElementById("minColumn").value) + i - 1;
                // box.classList.add("fixed-column");
            } else if (i === 0) {
                box.textContent = Number(document.getElementById("minRow").value) + j - 1;
            } else {
                box.textContent = (Number(document.getElementById("minColumn").value) + i - 1) * (Number(document.getElementById("minRow").value) + j - 1);
            }

            rows.appendChild(box);
        }
        tableBody.appendChild(rows);
    }

    table.appendChild(tableBody);
    tableLocation.appendChild(table);
    // table.setAttribute("border", "2");

}



function validateNumber(input) {

    const value = Number(input.value); 
    
    var nextElement = input.nextElementSibling;
    if (nextElement && nextElement.classList.contains("Error")) {
        nextElement.remove();
    }

    var errorMessage = "";

    const minColumn = Number(document.getElementById("minColumn").value);
    const maxColumn = Number(document.getElementById("maxColumn").value);
    const minRow = Number(document.getElementById("minRow").value);
    const maxRow = Number(document.getElementById("maxRow").value);

    if (isNaN(value) || value < -50 || value > 50) {
        errorMessage = "Please enter a number between -50 and 50";
    }
    
    if (minColumn > maxColumn && (input.id === "minColumn" || input.id === "maxColumn")) {
        errorMessage = "Minimum cannot exceed maximum!";
    } else if (minColumn <= maxColumn) {
        var minColumnError = document.getElementById("minColumn").nextElementSibling;
        var maxColumnError = document.getElementById("maxColumn").nextElementSibling;

        if (minColumnError && minColumnError.classList.contains("Error")) {
            minColumnError.remove();
        }

        if (maxColumnError && maxColumnError.classList.contains("Error")) {
            maxColumnError.remove();
        }
    }
    
    if (minRow > maxRow && (input.id === "minRow" || input.id === "maxRow")) {
        errorMessage = "Minimum cannot exceed maximum!";
    } else if (minRow <= maxRow) {
        var minRowError = document.getElementById("minRow").nextElementSibling;
        var maxRowError = document.getElementById("maxRow").nextElementSibling;

        if (minRowError && minRowError.classList.contains("Error")) {
            minRowError.remove();
        }

        if (maxRowError && maxRowError.classList.contains("Error")) {
            maxRowError.remove();
        }
    }

    if (errorMessage) {
        const error = document.createElement("div");
        error.className = "Error";
        error.textContent = errorMessage;
        input.after(error);
    }

    validateForm();
}

function validateForm() {
    const minColumn = Number(document.getElementById("minColumn").value);
    const maxColumn = Number(document.getElementById("maxColumn").value);
    const minRow = Number(document.getElementById("minRow").value);
    const maxRow = Number(document.getElementById("maxRow").value);

    const numbers = [minColumn, maxColumn, minRow, maxRow];

    const submit = document.getElementById("button");

    var validTable = true;

    for (var i = 0; i < 4; i++) {
        if(isNaN(numbers[i]) || numbers[i] < -50 || numbers[i] > 50 || minColumn > maxColumn || minRow > maxRow) {
            validTable = false;
        }
    }

    if(validTable) {
        submit.removeAttribute('disabled');
    } else {
        submit.setAttribute('disabled', 'true');
    }

}


document.getElementById("minColumn").addEventListener("input", function() {
    validateNumber(this);
});

document.getElementById("maxColumn").addEventListener("input", function() {
    validateNumber(this);
});

document.getElementById("minRow").addEventListener("input", function() {
    validateNumber(this);
});

document.getElementById("maxRow").addEventListener("input", function() {
    validateNumber(this);
});

const submit = document.getElementById("button");
submit.addEventListener("click", createTable);

// console.log(users[0]);