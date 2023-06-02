const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRoute= require('./userRoute')
const ticketRoute= require('./ticketRoute')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', userRoute)
router.use('/', ticketRoute)

module.exports = router;
