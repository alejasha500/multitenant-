import { asyncHandler } from '../../utils/asyncHandler.js'
import { registerEmpresaService, loginService } from './authService.js'
import { convertPrismaToReadable } from '../../utils/uuid.js'

export const registerEmpresaController = asyncHandler(
  async (req, res) => {
    const result = await registerEmpresaService(req.body)

    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    })

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
      success: true,
      user: convertPrismaToReadable(result.user)
    })
  }
)


export const loginController = asyncHandler(

     async (req, res) => {
         const result = await loginService(req.body)
        
          res.cookie('access_token', result.accessToken, {
             httpOnly: true,
             secure: process.env.NODE_ENV === 'production',
             sameSite: 'strict',
              maxAge: 15 * 60 * 1000
            })

           res.cookie('refresh_token', result.refreshToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'strict',
               maxAge: 7 * 24 * 60 * 60 * 1000
             })

          res.status(200).json({
               success: true,
              user: result.user
              })
     }

)