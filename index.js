const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const admin = require('./firebaseConfig');
const multer = require('multer');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer();

const db = admin.firestore();

app.post("/postInternships.html", upload.none(), async (req, res) => {
    const {id,company,role,location,salary,duration,date,link} = req.body;
    try{
        const collection = db.collection('internships');
        const query = await collection.doc(id).get();
        console.log(id);
        if(query.exists){
            res.sendStatus(409);
            return;
        }
        
        const numericId = Number(id);
        if (isNaN(numericId)) {
            res.sendStatus(400);
            return;
        }

        console.log(Number(id));
        const newInternship = {
            id: numericId,
            company,
            role,
            location,
            salary,
            duration,
            date,
            link
        };
        await db.collection('internships').doc(id).set(newInternship);
        res.sendStatus(204);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});


app.get("/getInternships.html/all", async (req, res) => {
    try{
        const collection = db.collection('internships');
        const query = await collection.orderBy('id').get();
        const internships = [];
        query.forEach(doc => {
            internships.push(doc.data());
        });
        res.send(internships);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});


app.get("/putInternships.html/:id", async (req, res) => {
    const id = req.params.id;
    const collection = db.collection('internships');
    try{
        const query = await collection.doc(id).get();
        if(query.exists){
            res.send(query.data());
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
    
});

app.put("/putInternships.html/:id", upload.none(), async (req, res) => {
    const id = req.params.id;
    const {company,role,location,salary,duration,date,link} = req.body;
    try{
        const collection = db.collection('internships');
        const query = await collection.doc(id).get();
        if(query.exists){
            const updatedInternship = {
                id: Number(id),
                company,
                role,
                location,
                salary,
                duration,
                date,
                link
            };
            await collection.doc(id).set(updatedInternship);
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/deleteInternships.html/:id', async (req, res) => {
    const id = req.params.id;
    const collection = db.collection('internships');
    try{
        const query = await collection.doc(id).get();
        if(query.exists){
            res.send(query.data());
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});

app.delete('/deleteInternships.html/:id', async (req, res) => {
    const id = req.params.id;
    const collection = db.collection('internships');
    try{
        const query = await collection.doc(id).get();
        if(query.exists){
            await collection.doc(id).delete();
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});



app.use(express.static('public'));	

app.use((req, res)=>{
    res.status(404).send('Page not found');
});


app.listen( process.env.PORT || 3000  , () => {
    console.log('server started');
});

