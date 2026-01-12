import { Router } from 'express'
import { registerEmpresaController, loginController } from './authController.js'
import { validate } from '../../middlewares/validate.js'
import { registerEmpresaSchema, loginSchema } from '../../utils/joiSchemas.js'

const router = Router()

router.post('/register', validate(registerEmpresaSchema), registerEmpresaController )
router.post('/login', validate(loginSchema), loginController )


export default router