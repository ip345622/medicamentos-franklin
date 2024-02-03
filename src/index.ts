import app from './app';
import { connectionDB } from './db';
import dotenv from 'dotenv';

dotenv.config();



connectionDB();

app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT );
    
})