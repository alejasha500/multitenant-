import { Router } from 'express'
import { registerEmpresaController, loginController, refreshController } from './authController.js'
import { validate } from '../../middlewares/validate.js'
import { registerEmpresaSchema, loginSchema  } from '../../utils/joiSchemas.js'

const router = Router()

router.post('/register', validate(registerEmpresaSchema), registerEmpresaController )
router.post('/login', validate(loginSchema), loginController )
router.post('/refresh', refreshController)


export default router