//GP3/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/models/models');
const { Reservation } = require('./src/models/models');
const { Contact } = require('./src/models/models');
const { User } = require('./src/models/models');
const { Admin } = require('./src/models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// CORS 미들웨어 사용 설정
// 개발 단계에서 모든 도메인의 요청을 허용하거나, 특정 도메인에 대해서만 허용 설정
app.use(cors({
  origin: 'http://localhost:4200' // 프론트엔드 서버의 URL
}));

app.use(bodyParser.json());
// ... 나머지 서버 설정 및 라우트

// Function to create JWT token
function createToken(user) {
    // Use jsonwebtoken or another library to create a JWT
    // You would also include a secret key and other options as needed
    return jwt.sign({ id: user.id, email: user.email }, 'your_secret_key');
}

// Function to validate the password
function validPassword(inputPassword, savedPassword) {
    // Use bcrypt or another library to compare the password with the hashed password
    return bcrypt.compareSync(inputPassword, savedPassword);
}

app.post('/users', async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    try {
        // Create a new user in the database
        const newUser = await User.create({ email, password });

        // You might want to handle the login response differently.
        // For now, sending back the user's data without the password.
        const userData = { ...newUser.toJSON(), password: undefined };

        console.log(`New user added: ${userData.email}`);
        res.status(201).send(userData);
    } catch (error) {
        console.error('Error during user creation', error);
        res.status(400).send(error);
    }
});

// User registration endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password before saving to the database
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

        // Create a new user with the hashed password
        const newUser = await User.create({ email, password: hashedPassword });

        // Send back a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// User login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email: email } });

        // Check if user exists and the password is valid
        if (user && validPassword(password, user.password)) {
            // If credentials are valid, create a JWT token
            const token = createToken(user);

            // Ensure you are sending back the user_id. It must match your database and model definition.
            res.json({
                user: {
                    email: user.email,
                    user_id: user.user_id, // This should match the column name in your Users table
                },
                token: token
            });
        } else {
            // If credentials are invalid, send an error message
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});


app.post('/admin/register', async (req, res) => {
    const { admin_id, password } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ where: { admin_id: admin_id } });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin already exists' });
        }

        // Create a new admin with the plain password
        const admin = await Admin.create({ admin_id, password });

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                admin_id: admin.admin_id,
                // Do not send the password back
            }
        });
    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({ message: 'Internal server error during admin registration' });
    }
});



// Admin login endpoint
app.post('/admin/login', async (req, res) => {
    const { admin_id, password } = req.body;

    try {
        // Look up the admin in the database
        const admin = await Admin.findOne({ where: { admin_id: admin_id} });

        if (!admin) {
            return res.status(401).json({ message: 'Admin not found' });
        }

        // Compare the provided password with the stored one directly
        if (password !== admin.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If the password matches, create a JWT token
        const token = jwt.sign(
            { admin_id: admin.admin_id },
            'admin', // Replace this with your actual secret key in production
            { expiresIn: '1h' }
        );

        // Send success response with token
        res.json({
            message: 'Admin login successful',
            token: token
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Internal server error during admin login' });
    }
});


app.post('/contacts', async (req, res) => {
    console.log('Received contact data:', req.body);
    try {
        const { name, email, message, user_id } = req.body;

        // Log the received data to ensure `user_id` is present
        console.log('Received contact data:', req.body);

        // Optional: Add additional validation if needed
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const contactData = {
            name,
            email,
            message,
            status: 'Pending'
        };

        if (user_id) {
            contactData.user_id = user_id;
        }

        const newContact = await Contact.create(contactData);
        res.status(201).json({ message: "Contact message saved successfully." });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ message: 'Error saving contact message.' });
    }
});

// 연락처 데이터를 가져오는 라우트
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.findAll(); // Sequelize를 사용할 경우
    res.json(contacts);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Fetch contacts for a specific user
app.get('/contacts/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userContacts = await Contact.findAll({
            where: { user_id: userId }
        });
        res.json(userContacts);
    } catch (error) {
        console.error('Error fetching contacts for user:', error);
        res.status(500).json({ message: 'Error fetching contacts for user.' });
    }
});

// Fetch reservations for a specific user
app.get('/reservations/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userReservations = await Reservation.findAll({
            where: { user_id: userId }
        });
        res.json(userReservations);
    } catch (error) {
        console.error('Error fetching reservations for user:', error);
        res.status(500).json({ message: 'Error fetching reservations for user.' });
    }
});
app.post('/reservations', async (req, res) => {
    try {
        // Extracting reservation data from the request body
        const {
            user_id, venue, date, time, name, email, phone, guests, specialRequests
        } = req.body;

        // Creating a new reservation record in the database
        const newReservation = await Reservation.create({
            user_id,  // If the user is logged in, otherwise this can be null
            venue,
            reservation_date: date,
            reservation_time: time,
            name,
            email,
            phone,
            number_of_guests: guests,
            special_requests: specialRequests,
            status: 'pending'  // Assuming a default status
            // No need to explicitly set 'created_at' as it's automatically handled by Sequelize
        });

        // Sending a response back to the client
        res.status(201).json({ message: "Reservation created successfully", reservation: newReservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Error creating reservation', error: error.message });
    }
});


// 예약 데이터를 가져오는 라우트
app.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations', error);
    res.status(500).json({ message: 'Error fetching reservations.' });
  }
});

// Endpoint to update contact status
app.put('/contacts/:contactId', async (req, res) => {
    try {
        const { contactId } = req.params;
        const { status, admin_message } = req.body;

        const updatedContact = await Contact.update(
            { status, admin_message },
            { where: { id: contactId } }
        );

        if (updatedContact) {
            res.json({ message: 'Contact updated successfully' });
        } else {
            res.status(404).send('Contact not found');
        }
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).send('Error updating contact');
    }
});

// Endpoint to update reservation status
app.put('/reservations/:reservationId/status', async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { status } = req.body;

        const updatedReservation = await Reservation.update(
            { status },
            { where: { id: reservationId } }
        );

        if (updatedReservation) {
            res.json({ message: 'Reservation status updated successfully' });
        } else {
            res.status(404).send('Reservation not found');
        }
    } catch (error) {
        console.error('Error updating reservation status:', error);
        res.status(500).send('Error updating reservation status');
    }
});

// Endpoint to update reservation admin message
app.put('/reservations/:reservationId/message', async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { admin_message } = req.body;

        const updatedReservation = await Reservation.update(
            { admin_message },
            { where: { id: reservationId } }
        );

        if (updatedReservation) {
            res.json({ message: 'Reservation message updated successfully' });
        } else {
            res.status(404).send('Reservation not found');
        }
    } catch (error) {
        console.error('Error updating reservation message:', error);
        res.status(500).send('Error updating reservation message');
    }
});
// 데이터베이스 동기화 코드 추가
//sequelize.sync({ force: false, alter: true }); // This will not drop tables but will alter them to fit the model, which should be used cautiously.

sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
