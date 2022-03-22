// App Page 

//Blended Rate Test Arr 
// let test = [["2.75", "20000"], [3.5, "10000"], [1.18, 200000]]

//Blended Rate Calc function
function blendedRate ( inputs ) {
    // balance * rate + balance * rate / total 
    // index 0 = rate 
    //index 1 = balance 

    // get total 
    let remove = inputs.map(c => parseFloat(c[1]) )
    let total = remove.reduce((d, e) => d + e, 0)

    // get arr of indexes multiplied 
    let mult = inputs.map(x => parseFloat(x[0]*x[1]) )
    let divideBy = mult.reduce((a, b) => a + b, 0)

    // Divide       
    let rate = divideBy / total 

    return { blendedRate: parseFloat(rate.toFixed(3)), total}

}

// console.log(blendedRate(test))

// Test arr for totalInterest 
let test = [{principal: "10000", rate: "3.875", term: "60"}, {principal: "15000", rate: "3", term: "65"}, {principal: "25000", rate: "5", term: "75"}]


//Total Interest Calculator 
function totalInterest ( inputs ) {
    // inputs are creditor, principal, rate, term(months) in arr of objects  

    let individualData = []; 
    // for each debt passed 
    let interestForEach = inputs.map(x => {
        // convert months to years 
        let term = parseFloat(x.term/12); 

        // Total Principal and Interest = Principal(1 + rate * term)
        let total = x.principal*(1 + (x.rate/100)*term)

        // add total paid to obj 
        x.totalPaid = total 

        // subtract total from principal to find interest 
        let totalInt = total - x.principal 

        // add interest to obj 
        x.totalInterest = totalInt

        // add monthly payment to obj 
        x.monthlyPayment = total / x.term 

        // push data to track individual 
        individualData.push( x )


        return totalInt; 
    })

    // add interest on all accounts 
    let totalInterestPaid = interestForEach.reduce((a, b) => a + b, 0)


    return { totalInterestPaid , individualData} 

}
 
console.log(totalInterest(test))

// Function to show p/l of all prior debts to all proposed debts 
function profitLoss () {
    // get individual data for all debts, seperate prior and proposed 
    // calculate: total paid difference, total interest difference, monthly payment difference (if being paid through loan subtract all against 0)
}


// Function to show recoup period for closing costs 



// Function to print data onto a nice proposal 
