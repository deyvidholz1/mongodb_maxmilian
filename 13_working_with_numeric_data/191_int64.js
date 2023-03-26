db.companies.insertOne({
  name: "My Cool Company",
  /**
   * it'll work for javascript based drivers (or mongoDB shell which is based on javascript)
   * because the default type for numbers is double (64-bit)
   */
  valuation: 5000000000,
});

// For long ints, use NumberLong()
db.companies.insertOne({
  name: "My Cool Company",
  /**
   * Qsuotation marks are needed to ensure that the value is treated as a string and correctly passed to the NumberLong constructor.
   * Without the quotation marks, the value would be treated as a Number type by JavaScript and would lose precision
   */
  valuation: NumberLong("9223372036854775807"),
});

// Note that updating values like NumberLong (for example, using $inc) also needs to have NumberLong conversion.
// Example:
db.companies.udpateOne({}, { $inc: { valuation: NumberLong("1") } });
