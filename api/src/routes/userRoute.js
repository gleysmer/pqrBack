const { Router }= require('express');
const { User, Ticket } = require("../db.js");
const router = Router();


// router.get('/', (req, res)=>{
//     res.send('hola mundo')
// })

router.get("/usuario", async (req, res) => {
  const { correo, nombre } = req.query;

  try {
    const users = await User.findAll({
       attributes: ['correo', 'dni'] ,

      //  include: [{
      //   model: Ticket,
      //   attributes: ["id","estado","descripcion"],
      //   through: {
      //       attributes: [],
      //   },
    // }]
      include: {
        model: Ticket,
        attributes: ["serial","titulo","descripcion","estado",],
      },
      order: [['id', 'ASC']]
    
  });

    if (nombre) {
      let result = users.filter((e) =>
        e.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      result.length
        ? res.status(200).send(result)
        : res.status(404).send("nombre no econtrado");
    } else if (correo) {
      const users = await User.findAll({
        include: {
          model: Ticket
        },
        where: {
          email: {
            [Op.like]: `${correo}%`,
          },
        },
      });
      users.length > 0
        ? res.status(200).send(users)
        : res.status(400).send(`Usuario ${correo} no encontrado`);
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


  
  router.post("/usuario", async (req, res) => {
    try {
      const { nombre, apellido, dni, correo, telefono } = req.body;
  
      const validate = await User.findOne({
        where: {
          correo: correo,
        },
      });
  
      if (validate) {
        return res
          .status(400)
          .send({ message: "el correo ya se encuentra registrado" });
      }
  
      const newUser = await User.create({
        
        nombre,
        apellido,
        dni,
        correo,
        telefono,
      });
  
      if (!newUser) {
        return res.status(500).json({ error: "creacion de usuario fallido" });
      }
  
      return res.status(200).send({ message: "usuario registrado" });
    } catch (error) {
      console.log("error es: ", error);
      res.status(400).json({ error: error.message });
    }
  });

module.exports= router;