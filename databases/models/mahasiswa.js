'use strict';
module.exports = function(sequelize, DataTypes) {
    var Mahasiswa = sequelize.define('Mahasiswa', {
        npm: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nama: {
            type: DataTypes.STRING,
            notEmpty: true
        },        
        jenis_kelamin: {
            type: DataTypes.ENUM('L', 'P','-'),
            defaultValue: '-'
        },
        semester: {
            type: DataTypes.STRING
        },
        no_hp: {
            type: DataTypes.STRING
        },
        prodi: {
            type: DataTypes.STRING,
        },
        tanggal_lahir: {
            type: DataTypes.DATE
        },
    });
    return Mahasiswa;
}