const express = require('express'); const bodyParser = require('body-parser'); const mongoose = require('mongoose'); 
const app = express(); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views');  
mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => console.log('MongoDB connected successfully')) 
  .catch(err => console.error('MongoDB connection error:', err)); 
 
const todoSchema = new mongoose.Schema({   task: String 
}); 
const Todo = mongoose.model('Todo', todoSchema); 
 
app.get('/', async (req, res) => {   try { 
    const todos = await Todo.find();     res.render('index', { todoList: todos }); 
  } catch (err) {     console.error(err); 
    res.status(500).send('Internal Server Error'); 
  } 
}); 
 
app.post('/', async (req, res) => {   try { 
    const newTodo = new Todo({ 
      task: req.body.task 
    }); 
 
    await newTodo.save();     res.redirect('/');   } catch (err) {     console.error(err); 
    res.status(500).send('Internal Server Error'); 
  } 
}); 
 
app.post('/delete', async (req, res) => { 
  try { 
    const todoId = req.body.checkbox;     await Todo.findByIdAndRemove(todoId);     console.log('Successfully deleted'); 
    res.redirect('/');   } catch (err) {     console.error(err); 
    res.status(500).send('Internal Server Error'); 
  } }); 
const PORT = process.env.PORT || 3000; app.listen(PORT, () => { 
  console.log(`Server started on port ${PORT}`); 
}); 
