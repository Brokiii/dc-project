#Dokumenty Cyfrowe - projekt

### How to run?

1. run ```docker build -t my-postgres-db ./``` in terminal to build docker database container
2. run ```docker run -p 5432:5432 my-postgres-db``` to run that container
    - port: 5432
    - db name: insurance
    - username: insurance
    - password: pass
    
### How to use?
1. Endpoints /api/user/login and /api/user/register are the only endpoints that do NOT need authentication - every other endpoints do 
2. Hit /api/user/register with the correct body to register new account
3. Hit /api/user/login with the correct body to create user session. This endpoint will return JWT token
4. You have to put into headers: ```"Authorization":"JWT <token>"``` where token is returned from /login endpoint for every request
5. If you hit /api/user/logout endpoint, token connected with a user became disabled. To use application you have to generate a new one using /login endpoint.
    
endpoint documentation: https://hackmd.io/@eMYgePe_SF2kCfebnQPGyA/BkLUhcBri/edit
    
### Team

Scrum Master: Hubert Brokos

Backend:
- Mateusz Bednarski
- Jakub Kisiel
- Hubert Brokos
- Szymon Gebler

Frontend:
- Monika Drozd
- Jakub Nowak
- Tomasz Żebrowski
