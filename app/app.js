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

let test = [{principal: "100000", rate: "3.875", term: "360", type: 'installment'}, {principal: "100000", rate: "3.875", term: "360", type: 'revolving'}, {principal: "25000", rate: "5", term: "75", type: 'installment'}]
let test1 = [{
    principal: '25000',
    rate: '6.5',
    term: '80',

},
{
    principal: '15000',
    rate: '5',
    term: '50',

},
{
    principal: '34232',
    rate: '5',
    term: '75',
}]

let test2 = [{
    principal: '5000',
    rate: '20',
    term: '60',
    type: 'revolving',
    acct: '12345',
    creditor: 'JPMCB',
    minimumPayment: '150'
}]

function getDays () {
  const date = new Date()
 
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
 
}

// function totalIntCompounding ( inputs ) {


//     // inputs are creditor, principal, rate, term(months) in arr of objects  
//     let totalPaidArr = []

//     let individualData = []

//     let totalInt = ''

//     // map 

//     // convert months to years
//     let term = parseFloat(x.term/12);
//     // turn balance into number 
//     let balance = parseFloat(x.principal)
//     // turn rate into decimal number 
//     let rate = parseFloat(x.rate/100)
//     // compounding daily 
//     let days = 12
//     // get minimum paymnet 
//     let payment = parseFloat(x.minimumPayment)
   
 
//     // calculations for compound interest formula             
//     let nt = term * days 
//     let rd = rate / days

//     // plug into formula
//     let totalPaid = Math.pow( (1 + rd), nt )
//     // finish formula by multiplying by balance 
//     totalPaid = balance * totalPaid

//     // add total paid to obj and arr 
//     let total = totalPaid
//     totalPaidArr.push(total)
//     x.totalPaid = total

//     // subtract total from principal to find interest
//     totalInt = totalPaid - x.principal
//     console.log(totalInt)

//     // add interest to obj
//     x.totalInterest = totalInt

//     // push data to track individual
//     individualData.push( x )
// }

//Total Interest Calculator


function totalInterest ( inputs ) {
    // inputs are [creditor, principal, rate, term(months), type, min payment]   
    let totalPaidArr = []

    let individualData = []

    let totalInt = ''

    // for each debt passed
    let interestForEach = inputs.map(x => {

        // check if simple or compound interest
        if ( x.type !== 'revolving') {

            // convert months to years
            let term = parseFloat(x.term/12);
            console.log('term: ' + term)
            // Total Principal and Interest = Principal(1 + rate * term)
            let total = x.principal*(1 + (x.rate/100)*term)
            console.log('total: ' + total)
            // add total paid to obj
            x.totalPaid = total
            totalPaidArr.push(total)

            // subtract total from principal to find interest
            totalInt = total - x.principal

            // add interest to obj
            x.totalInterest = totalInt
         
            console.log('rate: '+ (x.rate))
            let rate = parseFloat(x.rate / 100 / 12)
            console.log('rate: ', rate)
         
           term = parseFloat(x.term)
         
            let principal = parseFloat(x.principal)
            console.log('term: ', term)
             
           
            let z = Math.pow(1 + rate, x.term)
           
            let monthlyPayment = parseFloat((principal*z*rate)/(z-1)).toFixed(2)
            x.monthlyPayment = monthlyPayment
           
            // push data to track individual
            individualData.push( x )

        } else {

            // convert months to years
            let term = parseFloat(x.term/12);
            // turn balance into number 
            let balance = parseFloat(x.principal)
            // turn rate into decimal number 
            let rate = parseFloat(x.rate/100)
            // compounding daily 
            let compinPeriod = 12
            let n = 365
            // get minimum paymnet 
            let payment = parseFloat(x.minimumPayment)
           
         
            // calculations for compound interest formula     
            // n/t         
            let nt = term * compinPeriod 
            // r/n
            let rd = rate / compinPeriod
            // p 
            let p = compinPeriod / n

            console.log(p)

            // plug into formula
            let totalPaid = Math.pow( (1 + rd), nt )
            // finish formula by multiplying by balance 
            totalPaid = balance * totalPaid

            
            let withPayments = Math.pow( (1 + rd), nt ) - 1

            console.log('withPayments: ', withPayments) 
            
            withPayments = withPayments / rd 

            console.log('withPayments: ', withPayments) 

            // pmt x p 
            let pmtp = payment * p

            console.log('pmtp: ', pmtp) 


            withPayments = pmtp * withPayments 

            console.log('withPayments: ', withPayments) 


            // add total paid to obj and arr 
            let total = totalPaid
            totalPaidArr.push(total)
            x.totalPaid = total

            // subtract total from principal to find interest
            totalInt = totalPaid - x.principal
            console.log(totalInt)

            // add interest to obj
            x.totalInterest = totalInt

            // push data to track individual
            individualData.push( x )

        }


        return totalInt;
    })

    // add interest on all accounts
    let totalInterestPaid = interestForEach.reduce((a, b) => a + b, 0)
    let totalPaid = totalPaidArr.reduce((a,b) => a + b, 0)

    return { totalInterestPaid, totalPaid, individualData }

}

console.log(totalInterest(test2))


// let test = {
//   totalInterestPaid: 12187.5,
//   totalMonthlyPayments: 904.7275641025641,
//   totalPaid: 62187.5,
//   individualData: [
//     {
//       principal: '10000',
//       rate: '3.875',
//       term: '60',
//       totalPaid: 11937.5,
//       totalInterest: 1937.5,
//       monthlyPayment: 198.95833333333334
//     },
//     {
//       principal: '15000',
//       rate: '3',
//       term: '65',
//       totalPaid: 17437.5,
//       totalInterest: 2437.5,
//       monthlyPayment: 268.2692307692308
//     },
//     {
//       principal: '25000',
//       rate: '5',
//       term: '75',
//       totalPaid: 32812.5,
//       totalInterest: 7812.5,
//       monthlyPayment: 437.5
//     }
//   ]
// }

// let test1 = {
//     totalInterestPaid: 24655.83333333334,
//     individualData: [
//       {
//         principal: '25000',
//         rate: '6.5',
//         term: '80',
//         totalPaid: 35833.333333333336,
//         totalInterest: 10833.333333333336,
//         monthlyPayment: 447.9166666666667
//       },
//       {
//         principal: '15000',
//         rate: '5',
//         term: '50',
//         totalPaid: 18125.000000000004,
//         totalInterest: 3125.0000000000036,
//         monthlyPayment: 362.50000000000006
//       },
//       {
//         principal: '34232',
//         rate: '5',
//         term: '75',
//         totalPaid: 44929.5,
//         totalInterest: 10697.5,
//         monthlyPayment: 599.06
//       }
//     ]
//   }

// Function to show p/l of all prior debts to all proposed debts 
function profitLoss (presentData, proposedData) {
    console.log(presentData, proposedData)
    // get individual data for all debts, seperate prior and proposed 
    let present = presentData.individualData
    let proposed = proposedData.individualData
    // calculate: total paid difference, total interest difference, monthly payment difference (if being paid through loan subtract all against 0)
    let totalSavings = Number(present.totalPaid) - Number(proposed.totalPaid)
    console.log(totalSavings)
    return totalSavings
}

// console.log(profitLoss(test, test1))


// Function to show recoup period for closing costs 



// Function to print data onto a nice proposal 
