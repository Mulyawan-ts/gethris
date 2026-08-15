import type { HttpContext } from '@adonisjs/core/http'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import User from '#models/user'
import { signupValidator, loginValidator } from '../../../validators/user.ts'

export default class AuthController {
  /**
   * 1. POST /api/auth/register
   * Registrasi User Baru
   */
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)

    // 'role' SENGAJA tidak diambil dari input publik agar user tidak bisa
    // mendaftar langsung sebagai admin/hr. Role default selalu 'employee';
    // kenaikan role hanya boleh dilakukan lewat endpoint admin terpisah.
    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      employeeId: payload.employeeId ?? null,
      role: 'employee',
    })

    // Generate Access Token seketika setelah register
    const token = await User.accessTokens.create(user)

    return response.created({
      status: 'success',
      message: 'Registrasi berhasil',
      data: {
        user,
        token: token.value!.release(),
      },
    })
  }

  /**
   * 2. POST /api/auth/login
   * Login & Dapatkan Access Token
   */
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    // Verifikasi email & password
    const user = await User.verifyCredentials(email, password)

    // Generate Access Token baru
    const token = await User.accessTokens.create(user)

    return response.json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        token: token.value!.release(),
      },
    })
  }

  /**
   * 3. POST /api/auth/logout
   * Hapus Access Token yang sedang aktif
   */
  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    // Assert tipe user agar TypeScript mengenali currentAccessToken
    const authenticatedUser = auth.user as User & { currentAccessToken: AccessToken }
    const token = authenticatedUser?.currentAccessToken

    if (token) {
      await User.accessTokens.delete(user, token.identifier)
    }

    return response.json({
      status: 'success',
      message: 'Logout berhasil',
    })
  }

  /**
   * 4. GET /api/auth/me
   * Ambil Profil User yang sedang Login
   */
  async me({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.json({
      status: 'success',
      data: user,
    })
  }
}
