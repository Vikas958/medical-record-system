const express=require('express');
const app=express();

const cors=require('cors');

app.use(express.json());
app.use(cors());

const mongoose=require('mongoose');
const RecordSystem=require('./models/Records');

mongoose.connect("mongodb://localhost:27017/dbname",{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(()=>{
    console.log("connected successfully");
  })
  .catch((err)=>console.log(err));

  app.post("/addpatient", async (req, res) => {
    const { name, age, serialNumber, disease, doctor } = req.body;  // Add new fields

    const record = new RecordSystem({ name, age, serialNumber, disease, doctor });
    await record.save();
    res.send("Inserted");
});

app.put("/updatepatient/:id", async (req, res) => {
    const { id } = req.params;
    const { name, age, serialNumber, disease, doctor } = req.body;  // Add new fields

    try {
        await RecordSystem.findByIdAndUpdate(id, { name, age, serialNumber, disease, doctor });
        res.send("Patient updated successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/display", async (req, res) => {
    try {
        const records = await RecordSystem.find(); 
        res.send(records);
    } catch (err) {
        res.status(500).send(err); 
    }
});

// Delete patient
app.delete("/deletepatient/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await RecordSystem.findByIdAndDelete(id);
        res.send("Deleted successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});



app.listen(3001,()=>{
    console.log("listening");
})