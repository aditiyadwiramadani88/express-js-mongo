const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoose = require('mongoose');
const { response } = require('express');
mongoose.connect('mongodb://localhost:27017/app_todo', {useNewUrlParser: true, useUnifiedTopology: true});
app.use('/static', express.static('static'))
const Todo= mongoose.model('todo', { list: String });



app.get('/index', (req,res) => { 

    res.sendfile('index.html')
})


app.post('/', async(req, res) => { 

    // regex required
    const required = /^\s*$/;

    if(req.body.list) { 
    if(!required.test(req.body.list)) { 
        // create data 
        const create  = new Todo({'list': req.body.list})
        const data = await create.save()
        res.json(data)
    }
 }
 
 res.status(404)
 res.json({"status": 'required'})

})


app.get('/', async(req, res) => { 

    // get all data
    const data = await Todo.find({})
    res.json(data)    
})

app.delete('/:id', async(req , res) => { 

    // chexk id
    if(!req.params.id)  { 
        res.json({"status" : "id not fout"})
    }

    // delete data
    const del = await Todo.deleteOne({"_id": req.params.id})
    res.json({"sucess": "success delete data"})


})



app.put('/:id', async(req, res) => { 

       // chexk id
       if(!req.params.id)  { 
           res.status(404)
        res.json({"status" : "id not fout"})
    }

        // regex required
        const required = /^\s*$/;

        if(req.body.list) { 
        if(!required.test(req.body.list)) { 
            // updating
            const upd = await Todo.updateOne({"_id": req.params.id}, {"list": req.body.list})
            
            console.log(upd)
            res.json({"status": "sucess update"})

        }
    }
    res.status(404)
    res.json({"status": 'required'})
})


app.listen(3000)
