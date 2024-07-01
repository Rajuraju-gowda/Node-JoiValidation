const express=require("express");
const app=express();
const Joi= require("joi");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const PORT=3231;

const courses=[
    {id:1,courseName:"java"},
    {id:2,courseName:"node.js"},
    {id:3,courseName:"MSSQL"}
]

app.get('/course',(req,res)=>{
    res.send(courses);
});

app.get('/course/:id',(req,res)=>{
    const course=courses.find(c=> c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course is not found');
    res.send(course);
});


app.post("/course",(req,res)=>{

const schema = Joi.object({
    id:Joi.number().min(3).required(),
    courseName:Joi.string().min(4).required(),
   
});
const { error } = schema.validate(req.body);

if (error) {
  res.json({ ErrorMessage: error.details[0].message });
} else {
  res.send( "your id is added" );
}

//const validation = schema.validate(req.body);

  const course={
      id:courses.length+1,
      courseName:req.body.courseName
  };
  //const { error } = schema.validate(req.body);
    //res.send(error.details[0].message);


  courses.push(course);
  res.send('course is added to your id');
  console.log(courses)
});

app.put('/course/:id', function (req, res) {
    

      const schema = Joi.object({
        id:Joi.number().min(3).required(),
        courseName:Joi.string().min(4).required(),
       
    });
    const { error } = schema.validate(req.body);
    
    if (error) {
      res.json({ ErrorMessage: error.details[0].message });
    } else {
      res.send( "your id is updated" );
    }    

    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (course) {
      let updated = {
        id: course.id,
         courseName:req.body.courseName
      };

      let targetIndex = courses.indexOf(course);
  
      courses.splice(targetIndex, 1, updated);
  
      res.sendStatus(204)
    } else {
      res.sendStatus(404);
    }
    res.send("courses are updated on your  given id ");
  });  


  app.delete('/course/:id', (req, res) => {
 
    const course = courses.find( c=> c.id === parseInt(req.params.id));
    if(!course) res.status(404).send(' not found ! ');
     
    const index = courses.indexOf(course);
    courses.splice(index,1);
     
    res.send(course)
    });


app.listen(PORT,()=>{
    console.log(`server is running ...${PORT}`);
});