const router = require("express").Router();
const { User, validate } = require("../models/user");
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require('path');


// Multer Middleware 
const productImageStore = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './profileImages');
    }, 

    filename: (req, file, callBack) => {
        console.log(file);
        callBack(null, Date.now() + path.extname(file.originalname))
    }
});

const uploadImage = multer({storage: productImageStore});

// Register a new user
router.post('/api/registerUser/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Read a single user
router.get('/api/user/:email', async (req, res) => {
    try {
        var query = { email: req.params.email };
        const user = await User.findOne(query);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update user
router.patch('/api/updateuser/:id', uploadImage.single('image'), async (req, res) => {
    console.log("Update User");
    console.log(req.body);
    //const userId = req.params.id;
    //const updateData = req.body;

    try {
        // Hash the new password
        if (updateData.password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(updateData.password, salt);
            updateData.password = hashPassword;
        }

        // Check if an image was uploaded
        if (req.file) {
            updateData.image = req.file.filename; // Set the image filename in the updateData
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send(user);
        
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
    // res.json({ success: true, message: 'Image uploaded successfully' });
});


router.post('/api/uploadImage/:id', uploadImage.single('image'), async (req, res) => {
    
   // console.log(req.file.filename);
   // console.log(req.params.id);

    try {
        // Find the user by id
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Update the image in the user
        user.image = req.file.filename;
        await user.save();

        // Return a response indicating the success of the upload
        res.json({ success: true, message: 'Image uploaded and updated successfully' });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});



module.exports = router;