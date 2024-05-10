const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/", (req, res)=>{
   res.sendFile(__dirname+'/index.html');
} );

app.get('/java', async (req, res) => {
   try {
       const url = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=1e9337b3055fef44005cc4d61842ed62&units=metric'; // Replace with the URL you want to fetch data from
       const response = await axios.get(url);
       res.json(response.data); // Send the fetched data as a response
   } catch (error) {
       res.status(500).send('Error fetching data');
   }
});

app.post("/", (req,res)=>{
    console.log(req.body);
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2; // รวมค่า
    res.send("The calculation result is : " + result); // แสดงผล
 });
 
 app.get("/bmiCalculator", (req, res)=>{
    //res.send("Hello World");
    res.sendFile(__dirname + "/bmiCalculator.html")
  } );
  
 app.post("/bmiCalculator", (req,res)=>{
    console.log(req.body);
    var weight  = Number(req.body.weight);
    var height  = Number(req.body.height)/100;
    var BMI = Math.round(weight/(height*height));
    var description = "";
    if (BMI < 18.5) description = "ผอมเกินไป ค่า BMI: อยู่ในช่วง น้อยกว่า 18.5 ภาวะเสี่ยงต่อโรค: เสี่ยงต่อการได้รับสารอาหารไม่เพียงพอ"
    else if (BMI <= 22.9) description = "น้ำหนักปกติ เหมาะสม ค่า BMI: อยู่ในช่วง 18.6-22.9 ภาวะเสี่ยงต่อโรค: มีความเสี่ยงต่อโรคน้อยที่สุด"
    else if (BMI <= 24.9) description = "น้ำหนักเกิน ค่า BMI: อยู่ในช่วง 23.0-24.9 ภาวะเสี่ยงต่อโรค: ถือว่ายังมีความเสี่ยงมากกว่าคนปกติ"
    else if (BMI <= 29.9) description = "อ้วน ค่า BMI: อยู่ในช่วง 25.0-29.9 ภาวะเสี่ยงต่อโรค: ยังมีความเสี่ยงต่อการเกิดโรค"
    else description = "อ้วนมาก ค่า BMI: อยู่ในช่วง 30.0 ขึ้นไป ภาวะเสี่ยงต่อโรค: เสี่ยงต่อการเกิดโรค"
    res.send("คุณมีค่า BMI = " + BMI + " , คุณอยู่ในเกณฑ์: " + description);
  });  

app.get('/kanye', async (req, res) => {
   try {
       const url = 'https://api.kanye.rest/'; // Replace with the URL you want to fetch data from
       const response = await axios.get(url);
       res.json(response.data); // Send the fetched data as a response
   } catch (error) {
       res.status(500).send('Error fetching data');
   }
});


app.listen(3000, ()=> {
   console.log ("Server is running on port 3000");
});
