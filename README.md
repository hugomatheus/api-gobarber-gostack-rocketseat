# Repositories

Para a criação de um novo repositorio é  levado em consideração se
será criado algum meotodo customizado de integração com o banco de dados
Como exemplo o repositorio CreateAppointmentService que foi criado o metodo findByDate
onde não existe no TypeORM

Quando é criado um repositorio utilizamos
getCustomRepository passando o repostorio criado
Ex: getCustomRepository(AppointmentsRepository);

Quando não é necessário a criação do repositorio utilizamos
getRepository passando a model criada
Ex: getRepository(User);
