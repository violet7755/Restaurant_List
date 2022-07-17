// app.js
// require packages used in the project
const express = require('express')
const app = express()
const restaurantList = require('./restaurant.json')
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting：index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// routes setting：show page
app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === id)
  res.render('show', { restaurant })
})

// routes setting：search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})