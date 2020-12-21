import { Request, Response } from 'express';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviderService = container.resolve(ListProviderService);

    const providers = await listProviderService.execute({ user_id });

    return response.json(classToClass(providers));
  }
}

export default ProvidersController;
