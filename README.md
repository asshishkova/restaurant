# restaurant

## Solution

- Orders are saved as a table in mySQL database. Each order contains:
  - `id`: integer, created automatically
  - `customerName`: string, at least 2 characters long,
  - `customerPhone`: string, at least 4 characters long,
  - `customerAddress`: string, can be null (for example, for take away)
  - `orderItems`: object, consists of:
    - `itemName`: string, at least 3 characters long,
    - `itemPrice`: integer, between 0 and 1000,
  - `totalCost`: integer, calculated automatically as a sum of items' prices,
  - `createdAt`: date, created automatically.
- For **saving a new order** all the values (except of `id`, `totalCost`, and `createdAt`) should be sent in a request body.
  - The values are checked by a validation middleware.

  - `orderItems` are assumed to be taken from the client solution. Maybe the manu is written on the page: picture, name, price. And when the user click on the picture, the name and the price are added to the request.

- For **getting all orders from the last day** was added an index for `createdAt` - to optimise the search. By "last day" are assumed last 24 hours. The results are given sorted from newest to oldest.

## How to run the code.

1. If you do not have Docker, [download and install docker](https://docs.docker.com/get-docker/).

2. Pull the latest mysql image: `docker pull mysql/mysql-server`

3. Run a docker container with a new database:

`docker run -p 3306:3306 --name restaurantdb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=restaurant_db -d mysql/mysql-server`


  - If the port is already allocated you can remove the existing db by running `docker rm -f {DB_NAME}`. The db name will be shown if you run `docker ps`.
  - If there is an error "container is zombie and can not be killed" run `docker restart {DB_NAME}` and try to remove it again.


4. Open the project. In the main folder run `npm install`

5. In the `server/db` folder run `npx sequelize-cli db:migrate`
6. If you want to check manually how the program works with existing orders run `npx sequelize-cli db:seed:all` in `server/db` as well.
7. In the main folder run `npm start`.
8. Open `http://localhost:3000/api-docs/` and you will see the api description. You can use "try it out" and "execute" buttons. The are curl commands and request details as well.
9. To run the unit tests stop the server and run `npm test`.

`npm run db:create:test`
