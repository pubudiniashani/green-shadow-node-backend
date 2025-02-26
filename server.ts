import express from 'express';
import cropRoutes from "./routes/crop-routes";
import fieldRoutes from "./routes/field-routes";
import staffRoutes from "./routes/staff-routes";


const app = express();

app.use(express.json());

app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type");

    next();
})

app.use('/crop',cropRoutes)

app.use('/field',fieldRoutes)

app.use('/staff',staffRoutes)

app.get("/", (req, res) => {
    res.send("Server is running!");
});


app.listen(3000, (err=>{
    console.log("Server running on port 3000");
}));



