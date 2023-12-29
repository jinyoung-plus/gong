// GP3/src/models/models.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://gong:1234@localhost:5432/mydb');

// Define Reservation model
const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
        // allowNull defaults to true
    },
    venue: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    reservation_date: {
        type: DataTypes.DATEONLY
        // allowNull defaults to true
    },
    reservation_time: {
        type: DataTypes.TIME
        // allowNull defaults to true
    },
    number_of_guests: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
    },
    special_requests: {
        type: DataTypes.TEXT
        // allowNull defaults to true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    },
    admin_message: {
        type: DataTypes.TEXT
        // allowNull defaults to true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false, // Since you are handling 'created_at' manually
    tableName: 'Reservations' // Explicitly specifying table name
});




// Define Contact model
const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER
        // Removed 'primaryKey: false' since it's unnecessary; 'primaryKey' is false by default.
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    admin_message: {
        type: DataTypes.TEXT
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    // Sequelize model options
    timestamps: true, // Enable automatic timestamps
    createdAt: 'created_at', // Map Sequelize's 'createdAt' to your 'created_at' field
    updatedAt: false // Disable Sequelize's 'updatedAt' as it's not in your schema
});


// Define User model
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Tell Sequelize the exact name of the column that stores the timestamp
    timestamps: true, // Enable timestamps
    createdAt: 'created_at', // Map the createdAt timestamp to the 'created_at' column
    updatedAt: 'updated_at'  // Disable the updatedAt timestamp
});

const Admin = sequelize.define('Admin', {
    admin_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Sequelize model options
    freezeTableName: true,
    timestamps: false // Assuming you don't want createdAt/updatedAt for the admin table
});

Reservation.belongsTo(User, { foreignKey: 'user_id' });
Contact.belongsTo(User, { foreignKey: 'user_id' });

// Export the models
module.exports = { sequelize, Reservation, Contact, User, Admin };
