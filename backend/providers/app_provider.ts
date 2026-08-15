import type { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  public async register() {}
  public async boot() {}
  public async start() {}
  public async ready() {}
  public async shutdown() {}
}
