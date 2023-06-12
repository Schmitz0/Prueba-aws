const { Router } = require('express');
const bcrypt = require('bcrypt');
const { Usuario } = require('../../db.js');
const jwt = require('jsonwebtoken');
const userExtractor = require('../middleware/userExtractor.js');
const { generateToken } = require('./utils.js');

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email: email } });
    if (user) {
      if (bcrypt.compareSync(password, user.hashPassword)) {
        res.send({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'invalid email or password' });
  } catch (error) {
    res.send(error.message);
  }
});

// router.post('/signin', async (req, res) => {
//   const { email, password, name } = req.body;
//   const user = await Usuario.findOne({ where: { email: email } });
//   try {
//     if(user){
//       throw new Error(`El email "${email}" ya fue registrado`)
//     }
//     const newUser = await Usuario.create({
//               email,
//               hashPassword : await bcrypt.hash(password,8),
//               name,
//           })
//           res.status(200).send(`El usuario ${newUser.name} fue creado con éxito`)
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// router.get('/', userExtractor, async (req,res) => {

//    return res.status(200).json({id: req.body.id, userRole: req.body.userRole})

// })

// router.post('/', async (req,res) => {

//     let { email, password, name , imgUrl} = req.body;

//     if(!email || !password || !name) return res.status(400).send("Faltan datos")

//     if(!imgUrl){
//         imgUrl = "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
//     }

//     try {

//         const checkingUser = await Usuario.findOne({where: {email:email}})

//         const userForToken = {
//             id: checkingUser.id,
//             userRole: checkingUser.role,
//             userName: checkingUser.name,
//             userEmail: checkingUser.email
//         }

//         const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7})

//         return res.status(200).send({
//             token,
//             userRole: checkingUser.role
//         })

//     } catch (error) {

//         const date = new Date( Date.now() ).toString()

//         const newUser = await Usuario.create({
//             email,
//             hashPassword : await bcrypt.hash(password,8),
//             name,
//             imgUrl,
//         })

//         const userForToken = {
//             id: newUser.id,
//             userRole: newUser.role,
//             userName: newUser.name,
//             userEmail: newUser.email
//         }

//         const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7})

//         return res.status(200).send({
//             token,
//             userRole: newUser.role,
//         })
//     }
// })

module.exports = router;