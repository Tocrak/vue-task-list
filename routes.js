const express = require('express');
const router = express.Router();
const Task = require('./models/task');

// ------------  
router.get('/', async (req, res) => {
  
    try {
        const result = await Task.find({});

        if (result == null) {
            res.sendStatus(404); // not found
        } else {
            res.json(result);
        }

    } catch (err) {
      res.sendStatus(400); // error
    }
  
});
  
// ------------ 
router.post('/', async (req, res) => {
  
    try {
  
        const note = new Task({
            text: req.body.text,
            listId: req.body.listId
        });
        const result = await note.save();
  
        // if else might not be required
        if (result == null) {
            res.sendStatus(400);
        } else {
            console.log(result)
            res.json(result);
        }
  
    } catch (err) {
      res.sendStatus(400);
    }
  
});

router.delete('/', async (req, res) => {
    try {
        const result = await Task.findByIdAndRemove(req.body.id);

        res.json(result);
    } catch (error) {
        res.status(400).send(error);
    }
});
  
// ------------ 
router.patch('/', async (req, res) => {
    
    try {
        
        const result = await Task.findByIdAndUpdate(req.body.id, {status: req.body.status});
        
        if (result == null) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    
    } catch (err) {
        res.sendStatus(400);
    }
  
});


module.exports = router;