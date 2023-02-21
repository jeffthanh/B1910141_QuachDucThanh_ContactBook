const express=require("express");
const cors=require("cors");

//them contact
const contactsRouter=require("./app/routes/contact.route");

//them apierror
const ApiError=require("./app/api-error");

const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) =>{
    res.json({message: "Welcome to contact book application." });
});
//use contactrouter
app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next)=>{
    //code will run if there is no defined route
    // suit for requirement. Call next() to pass to middleware
    return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next)=>{
    //Middleware handle center error.
    //At handling code in routes, call next(error)
    //    will turnback to this handling error middleware.
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports=app;