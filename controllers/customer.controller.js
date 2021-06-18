const { getConnect } = require("../cnn");

const getCustomers = async (req, res) => {
  const connection = await getConnect();
  const result = await connection.execute(`select cu.customer_id,cu.address_id,cu.store_id,cu.first_name,cu.last_name,cu.email, ad.address addres_name,cu.active,cu.create_date,cu.last_update from customer cu,address ad where cu.address_id = ad.address_id`);
  res.json(result.rows);
  await connection.close();
};

const getAddress = async (req, res) => {
  const connection = await getConnect();
  const result = await connection.execute(`select address_id,address from address`);
  res.json(result.rows);
  await connection.close();
}

const getStore = async (req, res) => {
  const connection = await getConnect();
  const result = await connection.execute(`select store_id from store`);
  res.json(result.rows);
  await connection.close();
}

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
  } = req.body;

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
    },{autoCommit: true});

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
  } = req.body;
  console.log(req.body);
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
    },{autoCommit: true});

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

const deleteCustomer = async (req, res) => {
    const connection = await getConnect();
    const customer_id = req.params.id_customer;
    const sql = `DELETE FROM customer WHERE customer_id = :customer_id`;
    try {
       const resp =  await connection.execute(sql, {customer_id},{autoCommit: true});
       console.log(resp);
      res.json({
        message: "Customer eliminado con exito!!",
        body: {
          obejct: {customer_id},

        },
      });
      await connection.close();
    } catch (error) {
        console.log(error)
      res.json({
        error,
      });
    }
}
module.exports = {
  getCustomers,
  postCustomers,
  putCustomers,
  deleteCustomer,
  getAddress,
  getStore
}
