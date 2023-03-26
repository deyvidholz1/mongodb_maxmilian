// High Precision Double - Good for monetary data
// According to the MongoDB Documentation, using Decimal is preferable than Scale Factor
// Scale Factor means saving the number as int, multiplying by 1000 (9.99 -> 9990).
db.science.insertOne({
  /**
   * type for High Precision Double (mongo shell)
   * Needs quotation marks to avoid imprecisions.
   */
  a: NumberDecimal("0.3"),
});

// Note that updating values like NumberDecimal (for example, using $inc) also needs to have NumberDecimal conversion.
// Example:
db.companies.udpateOne({}, { $inc: { a: NumberDecimal("0.1") } });
