
# samu-slak

Slack like chat application.

Contains three microservices:
- [samu-slak](https://github.com/samutamm/samu-slak)
- [person-api](https://github.com/samutamm/personapi)
- [messenger](https://github.com/samutamm/messenger)
Architecture could be described as
![alt tag](docs/samu-slak-architecture.png)

# TODO

## Usability
- User registration
- New channel creation
- UI design to more comfortable
- UI to scale to different screen sizes

## Security
- Apikey authentication to Messenger

## Maintainability
- All three repos to be easily portable (with envs etc)
- Create configuration server/path where each component can fetch configurations like api urls
- Refactor samu-slak frontend-component not to make CORS requests straight to Messenger api
but via samu-slak backend with websockets. Then it would look like
![alt tag](docs/samu-slak-architecture-ideal.png)
