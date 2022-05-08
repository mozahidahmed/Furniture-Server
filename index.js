const express=require('express');
const cors = require('cors');
require('dotenv').config();
const app =express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000;
const ObjectId=require('mongodb').ObjectId;




//middleware
app.use(cors());
app.use(express.json());

//......................................................



//const uri = "mongodb+srv://furniturehouse:7ngS5ABwkeOXQgHZ@cluster0.xcemb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xcemb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

try{
  await client.connect();
   const productCollection=client.db('furniturehouse').collection('furniture');
   const orderCollection=client.db('furniturehouse').collection('order');

   
  



  //fetch data form sarver data...................................................................
   app.get('/product',async(req,res)=>{
           
             const query ={};
             const cursor=productCollection.find(query);
             const product=await cursor.toArray();
             res.send(product);
    
            })

  
 
//..fetch data form sarver END...................................................................


//.DELETE DATA FORM DATABASE START.................................................................
      app.get('/product/:id',async (req,res)=>{
        const id=req.params.id;
        const query ={_id:ObjectId(id)};
        const result =await productCollection.findOne(query);
        res.send(result);
        
        
        
        }) 

//DELETE DATA FORM DATABASE start.................................................................................
        app.delete('/product/:id',async (req,res)=>{
          const id=req.params.id;
          const query ={_id:ObjectId(id)};
          const result =await productCollection.deleteOne(query);
          res.send(result);
          
          
          
          })
  //..DELETE DATA FORM DATABASE END..............................................................      
 

 //add to data in the  server............................... ..........................................
   app.post('/product',async (req,res)=>{
  
    const newProduct=req.body;
    console.log(newProduct)
    const result =await productCollection.insertOne(newProduct)
    res.send(result)
    })




    //...................................
    app.get('/order/:id',async (req,res)=>{
      const id=req.params.id;
      const query ={_id:ObjectId(id)};
      const result =await orderCollection.findOne(query);
      res.send(result);
      
      
      
      }) 

//DELETE DATA FORM DATABASE start.................................................................................
      app.delete('/order/:id',async (req,res)=>{
        const id=req.params.id;
        const query ={_id:ObjectId(id)};
        const result =await orderCollection.deleteOne(query);
        res.send(result);
        
        
        
        })





    app.get('/order',async(req,res)=>{
      const email=req.query.email;     
      const query ={email:email};
      const cursor=orderCollection.find(query);
      const product=await cursor.toArray();
      res.send(product);

     })


    app.post('/order',async (req,res)=>{
  
      const orderProduct=req.body;
      const result =await orderCollection.insertOne(orderProduct)
      res.send(result)

      })

  





    //UPDATE DATA............................................

    app.put('/product/:id',async (req,res)=>{
      const id=req.params.id;
      const query ={_id:ObjectId(id)};
      const body=req.body;
      const options={upsert:true}
      const updateDoc={
        $set:{
          quantity:body.quantity

        }
      }
      const deliverd=await productCollection.updateOne(query,updateDoc,options)
      res.send(deliverd)
      })
  






}

finally{

}


}run().catch(console.dir);




app.get('/',(req,res)=>{
  res.send('running server ')
});


app.listen(port,()=>{

console.log("I AM FIRST OPERATION",port)

})





















// //...................................................
// const uri = "mongodb+srv://furniturehouse :7ngS5ABwkeOXQgHZ@cluster0.xcemb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run(){
  

//   try{

//     await client.connect();
//     const productCollection=client.db('furniturehouse').collection('furniture');


//  //Fatch data form Server ...................................................................
//         app.get('/product',async(req,res)=>{
//         const query ={};
//         const cursor=productCollection.find(query);
//         const product=await cursor.toArray();
//         res.send(product);

//         })
//  //Fatch data form Server ....................................................................





// //add to data in the  server............................... ..........................................
//     app.post('/user',async (req,res)=>{
//       const newUser=req.body;
//       console.log(newUser)
//       //..sent to database.........................
//       const result =await userCollection.insertOne(newUser)
//       res.send(result)

//   })
// //add t data server............................... ................................................
      





// //delete data in the  server............................... ..........................................
// app.delete('/user/:id',async (req,res)=>{

//   const id=req.params.id;
//   const query ={_id:ObjectId(id)};
//   const result =await userCollection.deleteOne(query);
//   res.send(result);
  
  
  
//   })
// //delete  data server............................... ................................................
      







//   }


//   finally{

//   }

// }run().catch(console.dir);


// //.....................................................






