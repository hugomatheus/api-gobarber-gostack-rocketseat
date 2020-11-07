import { Request, Response } from 'express';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import { container } from 'tsyringe';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listProviderService = container.resolve(ListProviderService);
    const providers = await listProviderService.execute({ user_id });
    return response.json(providers);
  }
}

export default ProvidersController;
