/* =========================================
   STUDENT TOOLKIT - JAVASCRIPT
   ========================================= */


/* ---------- CALCULATOR TABS ---------- */

function showCalculator(number) {

    // Hide all calculator sections
    const calculators = document.querySelectorAll(".calculator-content");

    calculators.forEach(function(calculator) {
        calculator.classList.remove("active");
    });


    // Remove active class from all tabs
    const tabs = document.querySelectorAll(".calculator-tab");

    tabs.forEach(function(tab) {
        tab.classList.remove("active");
    });


    // Show selected calculator
    const selectedCalculator =
        document.getElementById("calculator-" + number);

    if (selectedCalculator) {
        selectedCalculator.classList.add("active");
    }


    // Activate selected tab
    if (tabs[number - 1]) {
        tabs[number - 1].classList.add("active");
    }
}


/* ---------- CALCULATOR 1 ----------
   What is X% of Y?
*/

function calculatePercentageOfNumber() {

    const percentage =
        parseFloat(document.getElementById("percent1").value);

    const number =
        parseFloat(document.getElementById("number1").value);

    const result =
        document.getElementById("result1");


    // Check inputs
    if (isNaN(percentage) || isNaN(number)) {

        result.textContent =
            "Please enter both numbers.";

        return;
    }


    // Calculate
    const answer = (percentage / 100) * number;


    // Display result
    result.innerHTML =
        `${percentage}% of ${number} = <strong>${formatNumber(answer)}</strong>`;
}


/* ---------- CALCULATOR 2 ----------
   X is what percentage of Y?
*/

function calculatePercentage() {

    const x =
        parseFloat(document.getElementById("number2").value);

    const y =
        parseFloat(document.getElementById("number3").value);

    const result =
        document.getElementById("result2");


    // Check inputs
    if (isNaN(x) || isNaN(y)) {

        result.textContent =
            "Please enter both numbers.";

        return;
    }


    // Prevent division by zero
    if (y === 0) {

        result.textContent =
            "The second number cannot be zero.";

        return;
    }


    // Calculate
    const answer = (x / y) * 100;


    // Display result
    result.innerHTML =
        `${x} is <strong>${formatNumber(answer)}%</strong> of ${y}.`;
}


/* ---------- CALCULATOR 3 ----------
   Percentage Increase / Decrease
*/

function calculatePercentageChange() {

    const original =
        parseFloat(document.getElementById("originalNumber").value);

    const newNumber =
        parseFloat(document.getElementById("newNumber").value);

    const result =
        document.getElementById("result3");


    // Check inputs
    if (isNaN(original) || isNaN(newNumber)) {

        result.textContent =
            "Please enter both numbers.";

        return;
    }


    // Prevent division by zero
    if (original === 0) {

        result.textContent =
            "The original number cannot be zero.";

        return;
    }


    // Calculate percentage change
    const change =
        ((newNumber - original) / original) * 100;


    // Increase
    if (change > 0) {

        result.innerHTML =
            `The percentage increase is <strong>${formatNumber(change)}%</strong>.`;

    }

    // Decrease
    else if (change < 0) {

        result.innerHTML =
            `The percentage decrease is <strong>${formatNumber(Math.abs(change))}%</strong>.`;

    }

    // No change
    else {

        result.innerHTML =
            "There is <strong>no percentage change</strong>.";
    }
}


/* ---------- NUMBER FORMATTING ---------- */

function formatNumber(number) {

    // Round very long decimals
    if (Number.isInteger(number)) {
        return number.toLocaleString();
    }


    return number.toLocaleString(undefined, {
        maximumFractionDigits: 2
    });
}


/* ---------- CURRENT YEAR ---------- */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();
}


/* ---------- ENTER KEY SUPPORT ---------- */

// Allow Enter key to calculate
document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const activeCalculator =
            document.querySelector(".calculator-content.active");


        if (!activeCalculator) {
            return;
        }


        if (activeCalculator.id === "calculator-1") {

            calculatePercentageOfNumber();

        }

        else if (activeCalculator.id === "calculator-2") {

            calculatePercentage();

        }

        else if (activeCalculator.id === "calculator-3") {

            calculatePercentageChange();
        }
    }
});
// ================= AGE CALCULATOR =================

function calculateAge() {

    const birthDateInput = document.getElementById("birthDate");
    const ageAtDateInput = document.getElementById("ageAtDate");
    const result = document.getElementById("ageResult");

    const birthDate = new Date(birthDateInput.value);
    const ageAtDate = new Date(ageAtDateInput.value);

    if (!birthDateInput.value || !ageAtDateInput.value) {
        result.innerHTML = "Please select both dates.";
        return;
    }

    if (birthDate > ageAtDate) {
        result.innerHTML = "Date of birth cannot be after the calculation date.";
        return;
    }

    let years = ageAtDate.getFullYear() - birthDate.getFullYear();
    let months = ageAtDate.getMonth() - birthDate.getMonth();
    let days = ageAtDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;

        const previousMonth = new Date(
            ageAtDate.getFullYear(),
            ageAtDate.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    result.innerHTML =
        `You are <strong>${years} years, ${months} months, and ${days} days</strong> old.`;
}
// ================= GPA CALCULATOR =================

function addGpaRow() {

    const gpaRows = document.getElementById("gpaRows");

    const row = document.createElement("div");

    row.className = "gpa-row";

    row.innerHTML = `
        <input
            type="text"
            class="course-name"
            placeholder="Course Name">

        <input
            type="number"
            class="course-credit"
            placeholder="Credit"
            min="0"
            step="0.5">

        <select class="course-grade">

            <option value="">Grade</option>
            <option value="4.0">A+</option>
            <option value="4.0">A</option>
            <option value="3.7">A-</option>
            <option value="3.3">B+</option>
            <option value="3.0">B</option>
            <option value="2.7">B-</option>
            <option value="2.3">C+</option>
            <option value="2.0">C</option>
            <option value="1.7">C-</option>
            <option value="1.3">D+</option>
            <option value="1.0">D</option>
            <option value="0.0">F</option>

        </select>
    `;

    gpaRows.appendChild(row);
}


function calculateGPA() {

    const rows = document.querySelectorAll(".gpa-row");

    let totalCredits = 0;
    let totalPoints = 0;

    for (const row of rows) {

        const credit = parseFloat(
            row.querySelector(".course-credit").value
        );

        const grade = row.querySelector(".course-grade").value;

        if (!credit || grade === "") {
            continue;
        }

        totalCredits += credit;
        totalPoints += credit * parseFloat(grade);
    }

    const result = document.getElementById("gpaResult");

    if (totalCredits === 0) {
        result.innerHTML = "Please enter your credits and grades.";
        return;
    }

    const gpa = totalPoints / totalCredits;

    result.innerHTML =
        `Your GPA is <strong>${gpa.toFixed(2)}</strong>`;
}
