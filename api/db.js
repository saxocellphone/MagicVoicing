let host = process.env.DB_HOST || 'localhost';
let username = process.env.DB_USERNAME || 'magic_voicing';
let passwd = process.env.DB_PASSWD || 'magic_voicing';
let db_name = process.env.DB_NAME || 'magic_voicing';

module.exports = {
    DB: `mongodb+srv://${username}:${passwd}@${host}/${db_name}`
}