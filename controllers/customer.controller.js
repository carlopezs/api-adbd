const { getConnect } = require("../cnn");

const getCustomers = async (req, res) => {
  const connection = await getConnect();
  const result = await connection.execute(`select * from customer`);
  res.json(result.rows);
  await connection.close();
};

const postCustomers = async (req, res) => {
  const connection = await getConnect();
  const {
    customer_id,
    store_id,
    first_name,
    last_name,
    email,
    address_id,
    active,
  } = req.query;
  const sql = `
    Insert into customer
    (customer_id,store_id,first_name,last_name,email,address_id,active,create_date,last_update)
   Values
   (:customer_id,:store_id,:first_name,:last_name,:email,:address_id,:active,:create_date,:last_update)
   `;
  try {
    await connection.execute(sql, {
      customer_id,
      store_id,
      first_name,
      last_name,
      email,
      address_id,
      active,
      create_date: new Date(),
      last_update: new Date(),
    });

    res.json({
      message: "Customoer ingresado correctamente",
      obejct: {
        customer_id,
        store_id,
        first_name,
        last_name,
        email,
        address_id,
        active,
        create_date: new Date(),
        last_update: new Date(),
      },
    });

    await connection.close();
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
};

const putCustomers = async (req, res) => {
  const connection = await getConnect();
  const {
    customer_id,
    store_id,
    first_name,
    last_name,
    email,
    address_id,
    active,
  } = req.query;
  const sql = `UPDATE customer set store_id=:store_id,first_name=:first_name,last_name=:last_name,email=:email,address_id=:address_id,active=:active,last_update=:last_update where  customer_id=:customer_id`;
  try {
    await connection.execute(sql, {
      customer_id,
      store_id,
      first_name,
      last_name,
      email,
      address_id,
      active,
      last_update: new Date(),
    });

    res.json({
      message: "Customer actualizado correctamente",
      obejct: {
        customer_id,
        store_id,
        first_name,
        last_name,
        email,
        address_id,
        active,
        last_update: new Date(),
      },
    });
    await connection.close();
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
};

module.exports = {
  getCustomers,
  postCustomers,
  putCustomers,
};
