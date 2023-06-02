const { Router }= require('express');
const {User, Ticket } = require("../db.js");

const router = Router();


router.get("/ticket", async (req, res) => {
  
    try {
      const users = await Ticket.findAll({
        include: {
            model: User,
            attributes: ["correo"],
        }
      });
      if(users.length>0){
        res.status(200).json(users)
      }else{
        res.status(404).json({msg:"no hay ticket por mostrar"})
      }
    }catch(error){
        console.log(error)
    }
});
        
// ruta para crear ticket
router.post("/ticket", async (req, res) => {
    const { 
        correo,
        titulo,
        descripcion,
        } = req.body;
  
    try {
      const user = await User.findOne({ where: { correo: correo } });
  
      if (!user) {
        return res.status(404).json({ message: "El usuario no se encuentra en nuestra base de datos." });
      }
      else {
        const createTicket = await Ticket.create({
            descripcion,titulo,
            
          });

          

        // const pqr = await Pqr.findOne({
        //     where: {
        //       titulo: titulo,
        //     },
        //   });
        //   await createTicket.setPqr(pqr);
        //   createTicket.addTicket(pqr);
          await createTicket.setUser(user);
  
          res.status(200).json(createTicket);
        }
    
  }catch(error){
    res.status(400).json({ message: error.message });
  }
});


// ruta para cambiar el estado que se encuentra el ticket
router.put("/estado/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findOne({
        where: { serial: id },
      });
  
      if (ticket.estado === "abierto") {
        await Ticket.update({ estado: "cerrado" }, { where: { serial: id } });
        res.send("estado cerrado");
      } else {
        await Ticket.update({ estado: "abierto" }, { where: { serial: id } });
        res.send("estado abierto ");
      }
    } catch (err) {
      console.log(err);
    }
  });

//   ruta para eliminar ticket por serial
router.delete("/ticket/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedTicket = await Ticket.findOne({
        where: {
          serial: req.params.id,
        },
      });
      if (deletedTicket) {
        await Ticket.destroy({ where: { serial: id } });
        return res.status(200).json("ticket eliminado");
      } else {
        res.status(404).json({ msj: "ticket no encontrado" });
      }
    } catch (err) {
      return res.status(500).send(`No se pudo eliminar el ticket  (${err})`);
    }
  });


module.exports= router;