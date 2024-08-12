let salaryInput = document.getElementById("salary_input");
let rent_MortgageInput = document.getElementById("rent_mortgage_input");
let waterBillInput = document.getElementById("waterBill_input");
let electricityBillInput = document.getElementById("electricityBill_input");
let gasBillInput = document.getElementById("gasBill_input");
let phoneBillInput = document.getElementById("phoneBill_input");
let OtherBillInput = document.getElementById("OtherBill_input");
let submitBtn = document.getElementById("submit_btn");
let salaryDisplay = document.getElementById("salary_display");
//boxes
let wantsBox = document.getElementById("wants-box");
let savingsBox = document.getElementById("savings-box");


function updateBarGraph(budget, salary) {
    console.log("Updating bar graph with budget:", budget);
    const maxBudget = Math.max(...Object.values(budget), 1, salary); 
    console.log("Max budget:", maxBudget);

    const salaryBar = document.getElementById("salary-bar");
    if (salaryBar) {
        const percentage = (salary / maxBudget) * 100;
        salaryBar.style.height = `${percentage}%`;
        salaryBar.textContent = `$${salary}`;
    }

    for (const category in budget) {
        const barId = category.replace(/_/g, '') + "-bar"; // removes underscores
        const bar = document.getElementById(barId);
        if (bar) {
            const percentage = (budget[category] / maxBudget) * 100;
            console.log(`Setting height of ${barId} to ${percentage}%`);
            bar.style.height = `${percentage}%`;
            bar.textContent = `$${budget[category]}`;
        } else {
            console.error(`Bar with ID ${barId} not found`);
        }
    }
}

function updateSalaryDisplay(e) {
    const salary = e.target.value || 0;
    salaryDisplay.textContent = `Your Salary: $${salary}`;
}

salaryInput.addEventListener("input", updateSalaryDisplay);

function handleFormSubmit(event) {
    event.preventDefault();

    const salary = parseFloat(salaryInput.value) || 0;
    const budget = {
        rent_mortgage: parseFloat(rent_MortgageInput.value) || 0,
        waterBill: parseFloat(waterBillInput.value) || 0,
        electricityBill: parseFloat(electricityBillInput.value) || 0,
        gasBill: parseFloat(gasBillInput.value) || 0,
        phoneBill: parseFloat(phoneBillInput.value) || 0,
        OtherBill: parseFloat(OtherBillInput.value) || 0,
    };

    const totalExpenses = Object.values(budget).reduce((sum, value) => sum + value, 0);
    const remainingAmount = salary - totalExpenses;

    const wantsAmount = remainingAmount * 0.6;
    const savingsAmount = remainingAmount * 0.4;

    wantsBox.textContent = `Maximum recommended amount to spend: $${wantsAmount.toFixed(2)}`;
    savingsBox.textContent = `Minimum recommended amount to save: $${savingsAmount.toFixed(2)}`;

    updateBarGraph(budget, salary);
    salaryDisplay.textContent = `Your Earnings: $${salary}    ||  Remaining Amount after expenses: $${remainingAmount.toFixed(2)}`;
}

salaryInput.addEventListener("input", updateSalaryDisplay);
submitBtn.addEventListener("click", handleFormSubmit);






/*document.getElementById('addBarButton').addEventListener('click', function() {
    const form = document.getElementById('budget_form');    const newDiv = document.createElement('div');
    
    const newId = `bill_input_${form.getElementsByTagName('input').length + 1}`;
        const newLabel = document.createElement('label');
    newLabel.setAttribute('for', newId);
    newLabel.innerHTML = `New Bill ${form.getElementsByTagName('input').length - 1}:&nbsp;&nbsp;&nbsp;&nbsp;`;
    // Create the input element
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('id', newId);
    newInput.setAttribute('placeholder', '  Enter cost here');
    
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newInput);
        newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(document.createElement('br'));
  
    form.insertBefore(newDiv, document.getElementById('addBarButton'));
}); */