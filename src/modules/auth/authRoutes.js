import { Router } from 'express'
import { registerEmpresaController } from './authController.js'
import { validate } from '../../middlewares/validate.js'
import { registerEmpresaSchema } from '../../utils/joiSchemas.js'

const router = Router()

router.post('/register', validate(registerEmpresaSchema), registerEmpresaController )


export default router