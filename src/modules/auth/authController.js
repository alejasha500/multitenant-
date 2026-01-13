import { asyncHandler } from '../../utils/asyncHandler.js'
import { registerEmpresaService, loginService, refreshService } from './authService.js'
import { convertPrismaToReadable } from '../../utils/uuid.js'
import { config } from '../../config/env.js'
import { UnauthorizedError } from '../../errors/indexError.js'

export const registerEmpresaController = asyncHandler(
  async (req, res) => {
    const result = await registerEmpresaService(req.body)

    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: config.jwt.access.secure,
      sameSite: config.jwt.access.sameSite,
      maxAge: config.jwt.access.cookieMaxAge
    })

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: config.jwt.refresh.secure,
      sameSite: config.jwt.refresh.sameSite,
      maxAge: config.jwt.refresh.cookieMaxAge
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
             secure:  config.jwt.access.secure,
             sameSite: config.jwt.access.sameSite,
              maxAge: config.jwt.access.cookieMaxAge
            })

           res.cookie('refresh_token', result.refreshToken, {
               httpOnly: true,
               secure: config.jwt.refresh.secure,
               sameSite: config.jwt.refresh.sameSite,
               maxAge: config.jwt.refresh.cookieMaxAge
             })

          res.status(200).json({
               success: true,
              user: convertPrismaToReadable(result.user)
              })
     }

) 



export const refreshController = asyncHandler(
  
  async (req, res) => {
  const refreshToken = req.cookies.refresh_token

  if (!refreshToken) {
    throw new UnauthorizedError('No refresh token')
  }

  const result =  refreshService(refreshToken)

  res.cookie('access_token', result.accessToken, {
    httpOnly: true,
    secure: config.jwt.access.secure,
    sameSite: config.jwt.access.sameSite,
    maxAge: config.jwt.access.cookieMaxAge
  })

  res.status(200).json({
    success: true
  })
})