# apiNode
apilavalle brinda servicios a aplicacion lavalle.

Desarrollada con Node.js.

Toma datos desde nosql (MongoDB) o mysql (phpMyAdmin)

api rest

run start =  npm run dev 

run start =   nodemon app.js

nosql or mysql
heroku config:set ENGINE_DB=mysql
heroku restart
heroku run rails console
heroku ps:scale web=0
heroku ps:scale web=1