import cors from 'cors';
import express from 'express';

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json())


app.get('/',(req,res) => {
    res.json({message: "Server Connected Succesfully"});
});

app.listen(PORT,() =>{
    console.log(`Server running at port ${PORT}`);
});