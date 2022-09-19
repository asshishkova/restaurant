# restaurant

## How to run the code.

1. If you do not have Docker, [download and install docker](https://docs.docker.com/get-docker/).

1. Pull the latest mysql image: `docker pull mysql/mysql-server`

1. Run a docker container with a new database:

`docker run -p 3306:3306 --name restaurantdb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=restaurant_db -d mysql/mysql-server`

If the port is already allocated you can remove the existing db by running `docker rm -f {DB_NAME}`. The db name will be shown if you run `docker ps`. And maybe you will also need to run `docker restart {DB_NAME}` before removing — if there is an error "container is zombie and can not be killed".


Items are taken not from db but from the client solution. Maybe they wrote all their manu on the page: picture, name, price. And when you click on the picture it saves the name and the price as a parameter for the future request.
