module.exports = function(results, pool,select) {
  results.forEach((result) => {
    pool.query(select, result, (err, res) => {
      if (err) throw err
      console.log(`insert ${result.id} success`)
    })
  })
}