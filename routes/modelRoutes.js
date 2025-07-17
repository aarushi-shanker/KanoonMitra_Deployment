import express from 'express';
import modelController from '../controllers/modelCtrl.js';

const modelRouter = express.Router();

modelRouter.post('/generate', modelController);

export default modelRouter;