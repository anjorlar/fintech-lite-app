
/**
 * @description convert cash value passed in naira to kobo
 * @param {*} cash 
 * @returns cash value
 */
exports.convertCashToKobo = (cash) => {
    cash = Number(cash)
    switch (true) {
        case (cash > 0): {
            const data = cash * 100
            return {
                message: "cash has been converted to kobo",
                data
            }
        }
        default: {
            return {
                message: `wrong amount, value must be greater than 0`,
                data: 0
            }
        }
    }
}

/**
 * @description convert cash value passed in kobo to naira
 * @param {*} cash 
 * @returns cash value
 */
exports.convertCashToNaira = (cash) => {
    cash = Number(cash)
    if (cash > 0) {
        const data = cash / 100
        return {
            message: `cash converted to naira`,
            data
        };
    } else {
        return {
            message: `wrong amount passed, value must be greater than 0`,
            data: 0
        }
    }
}