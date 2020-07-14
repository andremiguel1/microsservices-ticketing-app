import express from 'express';
import {json} from 'body-parser'

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    
    console.log('E aí, Blz?');
    res.send('Hi there!');
 
});

app.listen(3000, () => {
    console.log('v0.0.1');
    console.log('Listening on port 3000!');
    
});