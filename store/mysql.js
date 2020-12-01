const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
};

let connection;

function handleConnection() {
    connection = mysql.createConnection(dbconf);

    connection.connect( function (err) {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', function (err) {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleConnection();

function list(table) {
    return new Promise( function (resolve, reject) {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise( function (resolve, reject) {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function create(table, data) {
    return new Promise( function (resolve, reject) {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, id, data) {
    return new Promise( function (resolve, reject) {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function deleteRow(table, id) {
    return new Promise( function (resolve, reject) {
        connection.query(`DELETE FROM ${table} WHERE id=${id}`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

module.exports = {
    list,
    get,
    create,
    update,
    deleteRow,
    query
}