/// <reference path="utility-functions.ts" />

import util = Utility.Fees;

const fee = Utility.Fees.calculateLateFee(444);
const bookCount = Utility.maxBooksAllowed(44);
console.log(fee);
