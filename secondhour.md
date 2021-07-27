# Passport Local Strategy

## Create a .env file to store private information
- ### Can store database string (conString)
- ### Can store secret
## Requiring dotenv will give us access to variables set in the .env file via 'process.env.VARIABLE_NAME'.
- ### NOTE: You want to install dotenv and require path as well.
- ### You also want to add .env to .gitignore
`require('dotenv').config()`
## OR
`require('dotenv').config({ path: path.resolve(__dirname, '../.env') });`