let salaryInput = document.getElementById("salary_input");
let rent_MortgageInput = document.getElementById("rent_mortgage_input");
let waterBillInput = document.getElementById("waterBill_input");
let electricityBillInput = document.getElementById("electricityBill_input");
let gasBillInput = document.getElementById("gasBill_input");
let phoneBillInput = document.getElementById("phoneBill_input");
let OtherBillInput = document.getElementById("OtherBill_input");
let submitBtn = document.getElementById("submit_btn");
let salaryDisplay = document.getElementById("salary_display");

// Boxes
let wantsBox = document.getElementById("wants-box");
let savingsBox = document.getElementById("savings-box");

function updateBarGraph(budget, salary) {
    console.log("Updating bar graph with budget:", budget);
    const maxBudget = Math.max(...Object.values(budget), 1, salary);
    console.log("Max budget:", maxBudget);

    const salaryBar = document.getElementById("salary-bar");
    if (salaryBar) {
        const percentage = (salary / maxBudget) * 100;
        console.log(`Setting height of salary-bar to ${percentage}%`);
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

    wantsBox.textContent = `Recommended maximum amount to spend: $${wantsAmount.toFixed(2)}`;
    savingsBox.textContent = `Recommended minimum amount to save: $${savingsAmount.toFixed(2)}`;

    updateBarGraph(budget, salary);
    salaryDisplay.textContent = `Your Earnings: $${salary}    ||  Remaining Amount after expenses: $${remainingAmount.toFixed(2)}`;
}

submitBtn.addEventListener("click", handleFormSubmit);

//seatch bar codde
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    

    const wantsAmount = parseFloat(wantsBox.textContent.split('$')[1]) || 0;
    const savingsAmount = parseFloat(savingsBox.textContent.split('$')[1]) || 0;

    //alert if blank
    if (!salaryInput.value || !rent_MortgageInput.value || !waterBillInput.value || 
        !electricityBillInput.value || !gasBillInput.value || 
        !phoneBillInput.value || !OtherBillInput.value) {
        
        alert("Please calculate budget above before searching");
        return; // Stops redirection
    }


    //alert if broke
    if (wantsAmount < 0 || savingsAmount < 0) {
        alert("You're in the negatives, NO SPENDING!");
        return; // if true = stop search
    }
    
    //grabs wrd
    const keyword = document.getElementById('keyword').value;
   //url maker 
   const amazonBaseUrl = "https://www.amazon.com/s?k=";
   const encodedKeyword = encodeURIComponent(keyword);
   const priceFilter = `&rh=p_36%3A0-${Math.floor(wantsAmount * 100)}`;

   const searchUrl = amazonBaseUrl + encodedKeyword + priceFilter;

    // redirects u
    window.open(searchUrl,'_blank');
});