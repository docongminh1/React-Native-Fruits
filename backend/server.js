import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router';


var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/fruits');

// Initialize http server
const app = express();

//body-parser in here
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//upload image
app.use('/image', express.static(__dirname + '/public/image'))
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/files', express.static(__dirname + '/files'))


app.use(express.static(__dirname + '/public'))
app.set('view', __dirname + '/view')
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/view/index.html');
})

// Handle / route
// app.get('/', (req, res) =>
//     res.send('Server is working !!!')
// )

// Logger that outputs all requests into the console
app.use(morgan('combined'));
// Use api as prefix for all API endpoints
app.use('/api', router);

const server = app.listen(port, () => {
    const { address, port } = server.address();
    //console.log(`Listening at http://${address}:${port}`);
    console.log(`Server starting on: ${port}`)
});
