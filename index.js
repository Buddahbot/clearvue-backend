const cors = require("cors");

const client = require("./connection.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  express.urlencoded({
    extended: false,
  })
);

//`Select * from customers`
app.get("/api/users", (req, res) => {
  client.query(`SELECT * FROM customer;`, (err, result) => {
    if (!err) {
      res.send(result.rows);
      console.log(res);
    }
  });
  client.end;
});

//Select * from site
app.get("/api/users/site/:customerid", (req, res) => {
  const { customerid } = req.params;
  client.query(
    `SELECT * FROM site WHERE customer_id = ${customerid}`,
    (err, result) => {
      if (!err) {
        console.log(result.rows);
        res.send(result.rows);
        console.log(res);
      }
    }
  );
  client.end;
});

//Select * meters of 1 site
app.get("/api/users/site/meter/:siteId/:id", (req, res) => {
  const { id, siteId } = req.params;
  client.query(
    `SELECT * FROM meter WHERE site_id = ${siteId}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log(res);
      }
    }
  );
  client.end;
});

//Select * circuits of 1 meter
app.get("/circuit/:meterId", (req, res) => {
  const { meterId } = req.params;
  console.log(meterId);
  client.query(
    `SELECT * FROM circuit WHERE meter_id = ${meterId} AND circuit_id_parent IS NULL`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log(res);
      }
    }
  );
  client.end;
});

//Select * circuits of parent curcuit
app.get("/circuitparent/:circuitId", (req, res) => {
  const { circuitId } = req.params;
  console.log(circuitId);
  client.query(
    `SELECT * FROM circuit WHERE circuit_id_parent = ${circuitId}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log(res);
      }
    }
  );
  client.end;
});

//////////// Get one customer from contacts table
app.get("/api/users/:customerid", (req, res) => {
  const { customerid } = req.params;
  client.query(
    `SELECT * FROM customer WHERE customer_id = ${customerid};`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log(res);
      }
    }
  );
  client.end;
});

//////////// Get one site of 1 customer
app.get("/site/:id/:siteId", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { siteId } = req.params;
  console.log(id);
  client.query(
    `SELECT * FROM site WHERE customer_id = ${id} AND site_id = ${siteId};`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log(result.rows);
      }
    }
  );
  client.end;
});

//////////// Get one meter of 1 site
app.get("/meter/:id/:siteId/:meterId", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { siteId } = req.params;
  const { meterId } = req.params;
  console.log(id);
  client.query(
    `SELECT * FROM meter WHERE site_id = ${siteId} AND meter_id = ${meterId}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log(res);
      }
    }
  );
  client.end;
});

/////////// Get one circuit of 1 meter
app.get("/circuit/one/:meterId/:circuitId", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { siteId } = req.params;
  const { meterId } = req.params;
  const { circuitId } = req.params;
  console.log(id);
  client.query(
    `SELECT * FROM circuit WHERE meter_id = ${meterId} AND circuit_id = ${circuitId}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log(res);
      }
    }
  );
  client.end;
});

//////////// Update user
app.put("/api/users/update/:id", (req, res) => {
  const { customerid } = req.params;
  let user = req.body;
  console.log(user);
  // let { id } = req.params;

  let updateQuery = `UPDATE customer
                     SET   customer_id = ${user.customer_id},
                     name = '${user.name}',
                     email = '${user.email}',
                     vat_number = '${user.vat_number}'
                     WHERE customer_id = ${user.customer_id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

//////////// Update site
app.put("/api/site/update/:id", (req, res) => {
  const { id } = req.params;
  let { name, coordinates, address, post_code } = req.body;

  // let { id } = req.params;

  let updateQuery = `UPDATE site
                     SET name = '${name}', coordinates = '${coordinates}', address = '${address}', post_code
                     = '${post_code}' 
                     WHERE site_id = ${id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

//////////// Update meter
app.put("/meter/update/:siteId/:meterId", (req, res) => {
  const { siteId } = req.params;
  const { meterId } = req.params;
  console.log(siteId);
  console.log(meterId);
  let user = req.body;
  console.log(req.body);
  console.log(user);
  // let { id } = req.params;

  let updateQuery = `UPDATE meter
                     SET name = '${user.name}', serial_number = '${user.serial_number}', installation_date = '${user.installation_date}'
                     WHERE site_id = ${siteId} AND meter_id = ${meterId}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

//////////// Update circuit
app.put("/circuit/update/:meterId/:circuitId", (req, res) => {
  const { meterId } = req.params;
  const { circuitId } = req.params;
  console.log(meterId);
  console.log(circuitId);
  let { name } = req.body;
  console.log(name);
  // let { id } = req.params;

  let updateQuery = `UPDATE circuit
                     SET name = '${name}'
                     WHERE meter_id = ${meterId} AND circuit_id = ${circuitId}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

////////// Delete 1 user
app.delete("/api/users/delete/:id", (req, res) => {
  const { id } = req.params;

  let updateQuery = `DELETE FROM customer WHERE customer_id = ${id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Deleting was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

////////// Delete 1 site
app.delete("/api/site/delete/:id", (req, res) => {
  const { id } = req.params;

  let updateQuery = `DELETE FROM site WHERE site_id = ${id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Deleting was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

////////// Delete 1 meter
app.delete("/meter/delete/:id", (req, res) => {
  const { id } = req.params;

  let updateQuery = `DELETE FROM meter WHERE meter_id = ${id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Deleting meter was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

////////// Delete 1 circuit
app.delete("/api/circuit/delete/:circuitId", (req, res) => {
  const { circuitId } = req.params;

  let updateQuery = `DELETE FROM circuit WHERE circuit_id = ${circuitId}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Deleting meter was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

///////// Create customer
app.post("/api/users/create", (req, res) => {
  // const { id } = req.params;
  let user = req.body;

  let insertQuery = `INSERT INTO customer (name, email, vat_number)
                      VALUES('${user.name}', '${user.email}', '${user.vat_number}')                    
  `;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

////////// Create site
app.post("/api/users/createsite", (req, res) => {
  // const { id } = req.params;
  let user = req.body;

  let insertQuery = `INSERT INTO site (customer_id, name, coordinates, address, post_code)
                      VALUES(${user.customer_id},'${user.name}', '${user.coordinates}', '${user.address}', '${user.post_code}' )                    
  `;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion site was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

////////// Create meter
app.post("/api/users/createmeter", (req, res) => {
  // const { id } = req.params;
  let meter = req.body;

  let insertQuery = `INSERT INTO meter (customer_id, name, serial_number, installation_date, site_id)
                      VALUES(${meter.customer_id}, '${meter.name}', '${meter.serial_number}', '${meter.installation_date}', ${meter.site_id})                    
  `;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion meter was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

////////// Create circuit
app.post("/circuit/createcircuit", (req, res) => {
  // const { id } = req.params;
  let circuit = req.body;
  console.log(circuit);
  let insertQuery = `INSERT INTO circuit (meter_id, name, installation_date, is_main )
                      VALUES(${circuit.meter_id}, '${circuit.name}', '${circuit.installation_date}', ${circuit.is_main})                    
  `;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion meter was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

////////// Create circuit of circuit
app.post("/circuit/createcircuit/ofcircuit", (req, res) => {
  // const { id } = req.params;
  let circuit = req.body;
  console.log(circuit);
  let insertQuery = `INSERT INTO circuit (meter_id, name, installation_date, is_main, circuit_id_parent )
                      VALUES(${circuit.meter_id}, '${circuit.name}', '${circuit.installation_date}', ${circuit.is_main}, ${circuit.circuit_id_parent})                    
  `;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion meter was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.listen(3300, () => {
  console.log("Sever is now listening at port 3300");
});
client.connect();
