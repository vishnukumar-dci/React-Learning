const pool = require('../config/db')

const create = async(fullname,email,password,gender,address1,address2,city,state,country,postalcode,phoneno) => {
    try {
      const [row] = await pool.query(`
        INSERT INTO users (
        fullname,
        email,
        passwords,
        gender,
        address1,
        address2,
        city,
        state,
        country,
        postalcode,
        phoneno
        ) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [fullname,email,password,gender,address1,address2,city,state,country,postalcode,phoneno])   
    } catch (error) {
        throw error
    }
}

const getAll = async() =>{
    try {
        const [rows] = await pool.query(
            `SELECT 
                id,
                fullname,
                email,
                gender
                FROM users`)
        return rows;
    } catch (error) {
        throw error
    }
}

module.exports = {
    create,
    getAll
}