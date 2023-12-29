// Inside your models.js or a new admin.model.js file

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
    timestamps: false // Assuming you don't want createdAt/updatedAt for the admin table
});

module.exports = { Admin }; // Add to your module.exports if in models.js
