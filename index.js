const express = require('express');
const fs = require('fs');
let count = 0;
let count_about = 0;

function store(file, data) {
    fs.writeFileSync(file, data + '\n');
}

function get_count(file) {
    let counter = -1;
    let data = fs.readFileSync(file, { encoding: "utf-8" }); 
    counter = parseInt(data); 
    console.log(counter); 
    return counter;    
}

const app = express();

app.use((req, res, next) => {
    if (!fs.existsSync('count.txt')) {
        store('count.txt', count);        
      }
      if (!fs.existsSync('count_about.txt')) {
        store('count_about.txt', count_about );        
      }
      next();      
});



app.get('/',(req, res) => {    
    count = get_count('count.txt') + 1;    
    store ('count.txt', count);
    res.send(`<h1>Корневая страница</h1><br>
    Просмотров: ` + count + `
    <br><a href = "/about">About</a>
    `)
});

app.get('/about',(req, res) => {      
    count_about = get_count('count_about.txt') + 1 ;
    store ('count_about.txt', count_about);
    res.send(`<h1>Cтраница About</h1><br>
    Просмотров: ` + count_about + `
    <br><a href = "/">Home</a>`)
});

app.listen(3000);