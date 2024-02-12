import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import routerUsers from './routes/users.routes';
import routerAppointment from './routes/appointment.routes';
import routerAuth from './routes/auth.routes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api',routerAuth,routerUsers, routerAppointment);

export default app;