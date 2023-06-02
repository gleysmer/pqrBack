const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('ticket', {
    serial: {
        type: DataTypes.INTEGER,
        autoIncrement: true ,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.ENUM('Peticion','Queja','Reclamo'),
        allowNull: false
    },
    
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('abierto', 'cerrado'),
        allowNull: false,
        defaultValue: 'abierto'
      },
    // estado: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: true,
    //     defaultValue: true
    // },
  },
  {
    timestamps: false
});
};