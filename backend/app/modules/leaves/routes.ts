import router from '@adonisjs/core/services/router'
const LeavesController = () => import('./controllers/leaves_controller.ts')

export function leaveRoutes() {
  router.group(() => {
    // GET /api/leaves -> Ambil semua daftar cuti
    router.get('/', [LeavesController, 'index'])
    
    // POST /api/leaves -> Buat pengajuan cuti baru
    router.post('/', [LeavesController, 'store'])
    
    // PATCH /api/leaves/:id/status -> Approve / Reject pengajuan cuti
    router.patch('/:id/status', [LeavesController, 'updateStatus'])
  }).prefix('/api/leaves')
}