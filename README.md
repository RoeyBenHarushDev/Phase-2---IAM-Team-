# Full-Stack-Team IAM-Phase2

## Description
Identity & Access Management system, the service will support:
<br>registration, login, forgot password and actions on users (suspend user by admin, edit details and more).
<br>The service is using Google API to allow login in with gmail.
<br>Users sessions and permission are managed by JWT cookie.
<br>The service will authenticate users with an email verification code.
<br>Data is stored on Mongo Atlas cloud.

## Before you start, you should know:
* passwords and codes sent to email can end up in the spam folder
* api requests that contain body in postman should be formatted as JSON  
## Prequisites
```bash
  Node.js 16v
```
## Run with render
```bash
  https://iam-team.onrender.com/
```
## Local run
### Install
```bash
  npm install
```
### Start server
```bash
  npm start
```
### Start client
```bash
type in url borwser: http://localhost:5000 
```
### Other dependancies
```bash
  create .env file with secrets that will pass by demand 
```
## API documantion
```bash
  [https://www.postman.com/interstellar-star-937701/workspace/iam/request/24057770-d7e4b5fb-6fe7-4508-9987-c7ba1ad3a9be](https://documenter.getpostman.com/view/24057770/2s8YzTTMkM)
```
## Built with
* nodejs
* express
* mongoose
* Google API
* javascript
* html
* css

## Credits
* Roey Ben Harush
* Racheli Dekel
* Shahar Ariel
* Tomer Duchovni
* Roni Naor
