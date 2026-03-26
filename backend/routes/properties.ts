import express from 'express';
import { properties } from '../db';
import {authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.json(properties);
});

export default router;