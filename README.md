# Restaurant

Front End is in _front_ branch.

## Back End

- Orders are saved as a table in a MySQL database. Each order contains:
  - `id`: integer, created automatically
  - `customerName`: string, at least 3 characters long,
  - `customerPhone`: string, at least 4 characters long,
  - `customerAddress`: string, can be null (for example, for take away)
  - `orderItems`: object, consists of:
    - `itemName`: string, at least 2 characters long,
    - `itemPrice`: integer, between 0 and 1000,
  - `totalCost`: integer, calculated automatically as a sum of items' prices,
  - `createdAt`: date, created automatically.
- For **saving a new order** all the values (except `id`, `totalCost`, and `createdAt`) should be sent in a request body.

  - `orderItems` are assumed to be taken from the client solution. The Menu can be written on the React page: picture, name, price - and when the user clicks on the picture, the name and the price are added to the request.

- For **getting all orders from the last day** an index was added for `createdAt` - to optimise the search. Last day assumes **last 24 hours**. The results are given sorted from newest to oldest.

- The logger, validation and error handler are implemented as middleware.

## How to run the code.

1. If you do not have Docker, [download and install docker](https://docs.docker.com/get-docker/).

2. Run a docker container with a new database:

`docker run -p 3306:3306 --name restaurantdb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=restaurant_db -d mysql/mysql-server`

  - If the port is already allocated you can remove the existing db by running `docker rm -f {DB_NAME}`. The db name will be shown if you run `docker ps`.
  - If there is an error "container is zombie and can not be killed" run `docker restart {DB_NAME}` and try to remove it again.

3. Open the project. In the main folder run this command: `npm install`

4. To run the migration, run this command: `npm run db:migrate`

5. If you want to check manually how the program works with existing orders, run this command: `npm run db:seed`.

6. In the main folder run `npm start`.

7. Open `http://localhost:3000/api-docs/` and you will see the API description. You can use "try it out" and "execute" buttons. The are cURL commands and request details as well.

8. To run the unit tests run `npm test` in the main folder.
