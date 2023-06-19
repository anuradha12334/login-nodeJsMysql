const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const { resolve } = require('path')
const bcrypt = require('bcryptjs')


    //start querying in db
    var connection = mysql.createConnection({
        host: process.env.Database_host,
        user: process.env.Database_user,
        password: process.env.Database_password,
        database:process.env.Database
    })

exports.register = (req, res) => {
         console.log(req.body)

         //old method
        //  const name = req.body.name
        //  const email = req.body.email
        //  const password = req.body.password
        //  const passwordConfirm = req.body.passwordConfirm

        //destructing in js 
         const { name ,email , password , passwordConfirm } = req.body

         connection.query('select email from users where email = ?' , [email] , async (error, results) => {
            if(error)
            {
                console.log(error)
            }

            if(results.length > 0)
            {
               return res.render('register',{
                message:'That email is already in use'
               })
            }
            else if( password !== passwordConfirm )
            {
                return res.render('register',{
                    message:'Password do not match'
                   })
            }
                let hashedPassword = await bcrypt.hash(password , 8)
                console.log(hashedPassword)

                connection.query('insert into users set ?', { name: name , email:email , password : hashedPassword },(error,results) => {
                         if(error)
                         {
                            console.log(error)
                         }
                         else
                         {
                            console.log(results)
                            return res.render('register',{
                                message:'User Registered'
                               })
                         }
                })


         })
}


exports.login = () => {
    
}