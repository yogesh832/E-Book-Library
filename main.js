const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.reset');
const form = document.querySelector('form');
let editedRow = null;

let rowCount = 0;

window.onload = function() {
    loadTableData(); // Load table data from localStorage when the page loads
};
let msg  = document.querySelector('.msg')

submitBtn.addEventListener('click', 
    function submitForm(e) {
    e.preventDefault();
    let dataEntered = getData();
    if (editedRow) {
        updateRow(dataEntered);
        editedRow = null;
    } else {
        insertRow(dataEntered);
    }
    if( dataEntered==false){
       msg.innerHTML="Please enter the complete data" 
    }
    let mobNo = document.getElementById("mobNo").value;
   
    saveTableData();
    form.reset(); // Reset the form after submission
});

resetBtn.addEventListener('click', function resetForm(e) {
    e.preventDefault();
    form.reset(); // Reset the form when the reset button is clicked
});

function getData() {
    let name = document.getElementById("name").value.trim();
    let mobNo = document.getElementById("mobNo").value.trim();
    let bookNo = document.getElementById("bookNo").value.trim();
    let bookName = document.getElementById("bookName").value.trim();
    let serialNo = document.getElementById("serialNo").value.trim();

    // Ensure no fields are empty
    if (name === "" || mobNo === "" || bookNo === "" || bookName === "" || serialNo === "") {
        alert("All fields are required!");
        return null;
    }
if(name, mobNo, bookNo, bookName, serialNo == ""){
    return false;
} 

    return [name, mobNo, bookNo, bookName, serialNo];
}

function insertRow(data) {
    if (!data) return; // Do nothing if data is null

    let table = document.getElementById("table").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow();

    newRow.insertCell(0).textContent = ++rowCount;
    newRow.insertCell(1).textContent = data[0];
    newRow.insertCell(2).textContent = data[1];
    newRow.insertCell(3).textContent = data[2];
    newRow.insertCell(4).textContent = data[3];
    newRow.insertCell(5).textContent = data[4];
    newRow.insertCell(6).innerHTML = `<button class="editBtn" onclick="editRow(this)">Edit</button> 
                                      <button class="deleteBtn" onclick="deleteRow(this)">Delete</button>`;
}

function updateRow(data) {
    if (!data) return; // Do nothing if data is null

    editedRow.cells[1].textContent = data[0];
    editedRow.cells[2].textContent = data[1];
    editedRow.cells[3].textContent = data[2];
    editedRow.cells[4].textContent = data[3];
    editedRow.cells[5].textContent = data[4];
}

function deleteRow(tableData) {
    let rowToDelete = tableData.parentElement.parentElement;
    rowToDelete.parentNode.removeChild(rowToDelete);
    
    // Adjust rowCount and update row numbers
    rowCount--;
    let rows = document.getElementById("table").getElementsByTagName("tbody")[0].rows;
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
    }
    saveTableData(); // Save table data after deletion
}

function editRow(tableData) {
    editedRow = tableData.parentElement.parentElement;
    document.getElementById("name").value = editedRow.cells[1].textContent;
    document.getElementById("mobNo").value = editedRow.cells[2].textContent;
    document.getElementById("bookNo").value = editedRow.cells[3].textContent;
    document.getElementById("bookName").value = editedRow.cells[4].textContent;
    document.getElementById("serialNo").value = editedRow.cells[5].textContent;
}

function saveTableData() {
    let table = document.getElementById('table').getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');
    let tableData = [];

    // Collect data from each row
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let rowData = [];
        for (let j = 1; j < cells.length - 1; j++) { 
            // Skip the first cell (row number) and last cell (buttons)
            rowData.push(cells[j].textContent);
        }
        tableData.push(rowData);
    }
    localStorage.setItem('tableData', JSON.stringify(tableData)); // Save data to localStorage
}

function loadTableData() {
    let tableData = JSON.parse(localStorage.getItem('tableData'));
    if (tableData) {
        let table = document.getElementById('table').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // Clear existing table data

        // Populate table with data from localStorage
        for (let i = 0; i < tableData.length; i++) {
            let newRow = table.insertRow();
            newRow.insertCell(0).textContent = ++rowCount;
            newRow.insertCell(1).textContent = tableData[i][0];
            newRow.insertCell(2).textContent = tableData[i][1];
            newRow.insertCell(3).textContent = tableData[i][2];
            newRow.insertCell(4).textContent = tableData[i][3];
            newRow.insertCell(5).textContent = tableData[i][4];
            newRow.insertCell(6).innerHTML = `<button class="editBtn" onclick="editRow(this)">Edit</button> 
                                              <button class ="deleteBtn" onclick="deleteRow(this)">Delete</button>`;
        }
    }
}
