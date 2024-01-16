const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const CategoryModel = require("./Models/Categories");
const OrderModel = require("./Models/Orders"); 
const fs = require("fs")
const uri = "mongodb+srv://coralsh286:orcal12865893@clusterdev.xzorssw.mongodb.net/test?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(uri);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.get('/getCategoryList', async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).send(categories);
    } catch (error) {
        console.error('Error in /getCategoryList:', error);
        res.status(500).send(error);
    }
});
const addToOrderInfo = (obj)=> {
    let existingData = [];
    try {
      const data = fs.readFileSync('orderInfo.json', 'utf8');
      existingData = JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
    existingData.push(obj);
    fs.writeFileSync('orderInfo.json', JSON.stringify(existingData, null, 2), 'utf8');
  }
  
app.post('/addOrder', async (req, res) => {
    try {

        const { fullName, address, email, arrOrder } = req.body;

        const newOrder = new OrderModel({
            fullName,
            address,
            email,
  
        });

        const savedOrder = await newOrder.save();
        addToOrderInfo({
            userID:savedOrder._id,
            arrOrder:arrOrder,
        })
        res.status(201).send({order: savedOrder,});
    } catch (error) {
        console.error( error);
        res.status(500).send("faild to save")
    }
});

app.listen(3500, () => {
    console.log("Server is running on port 3500");
});
