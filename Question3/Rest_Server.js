
const app = require('express')();
const parser = require("body-parser");

const fs = require("fs");
const dir = __dirname;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());



let hotels = [];

function readData(){
    const filename = "data.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8'); 
    hotels = JSON.parse(jsonContent);
}

function saveData(){
    const filename = "data.json";
    const jsonData = JSON.stringify(hotels);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/hotels", (req, res)=>{
    readData();
    res.send(JSON.stringify(hotels));    
})

app.get("/hotels/:id", (req, res)=>{
    const newName = req.params.id;
    if(hotels.length == 0){
        readData();
    }
    let foundRec = hotels.find((e) => e.newName == newName);
    if(foundRec == null)
        throw "Hotel not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/hotels", (req, res)=>{
    if(hotels.length == 0)
        readData();
    let body = req.body;
    
    for (let index = 0; index < hotels.length; index++) {
        let h1 = hotels[index];
        if (h1.hotelName == body.hotelName) {
            h1.hotelCity = body.hotelCity;
            h1.hotelType = body.hotelType;
            h1.hotelCusine = body.hotelCusine;
            saveData();
            res.send("Hotel updated successfully");
        }
    }
    
})

app.post('/hotels', (req, res)=>{
    if (hotels.length == 0)
        readData();
    let body = req.body;
    hotels.push(body);  
    saveData();
    res.send("Employee added successfully");
})
app.delete("/hotels/:id", (req, res)=>{
  throw "Do it UR Self!!!!";  
})

app.listen(1234, ()=>{
    console.log("Server available at 1234");
})