import type { HttpContext } from '@adonisjs/core/http'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import User from '#models/user'

export default class AuthController {
  /**
   * 1. POST /api/auth/register
   * Registrasi User Baru
   */
  async register({ request, response }: HttpContext) {
    const payload = request.only(['fullName', 'email', 'password', 'role', 'employeeId'])

    // Buat user baru di database
    const user = await User.create(payload)

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
    const { email, password } = request.only(['email', 'password'])

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
