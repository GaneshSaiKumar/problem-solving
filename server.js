const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');
const path = require('path')
const csv = require('csv-parser');
const json2csv = require('json2csv').parse;


const app = express();
const PORT = 5000;

const filename = 'questions.csv';
const filePath = `./${filename}`;
const initialQuestions = [];

fs.createReadStream(filePath, { encoding: 'utf-8' })
  .on('error', (err) => {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'id,title,answer,notes\n');
    }
  })
  .pipe(csv())
  .on('data', (row) => {
    const { id, title, answer, notes } = row;
    initialQuestions.push({ id, title, answer, notes });
  })
  .on('end', () => {
    console.log('Parsed questions:', initialQuestions);
  });

app.use(express.json());
app.use(bodyparser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with specific origins if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Load questions from CSV
app.get('/api/questions', (req, res) => {
  console.log(req.body)
  const allQuestions = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      allQuestions.push(row);
    })
    .on('end', () => {
      res.json(allQuestions);
    });
});

// Save question to CSV
app.post('/api/questions', (req, res) => {
  const { id, title, answer } = req.body;
  try {
    fs.appendFileSync(filePath, `${id},${title},${answer}\n`);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error saving question:', error);
  }
});


app.put('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;
  const questionIndex = initialQuestions.findIndex((q) => q.id === id);
  console.log(id, notes, initialQuestions, questionIndex)
  if (questionIndex !== -1) {
    initialQuestions[questionIndex].notes = notes;
    const csv = json2csv(initialQuestions, { fields: ['id', 'title', 'answer', 'notes'] });
    fs.writeFile(filename, csv, (err) => {
      if (err) {
        console.error('Error saving notes:', err);
        res.status(500).json({ error: 'Error saving notes' });
      } else {
        res.status(200).json({ message: 'Notes saved successfully' });
      }
    });
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

// Delete question from CSV
app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error deleting question:', err);
      res.status(500).send('Error deleting question');
    } else {
      const lines = data.split('\n');
      lines.splice(id, 1);

      fs.writeFile(filePath, lines.join('\n'), (err) => {
        if (err) {
          console.error('Error deleting question:', err);
          res.status(500).send('Error deleting question');
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
