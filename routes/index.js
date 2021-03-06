const userRoutes = require('./user');
const parklotRoutes =  require('./parklot');
const commentRoutes =  require('./comment');
const petrolStationRoutes =  require('./petrolStation');

const constructorMethod = (app) => {
    app.use('/user', userRoutes);
    app.use('/parklot', parklotRoutes);
    app.use('/comment', commentRoutes);
    app.use('/petrolStation', petrolStationRoutes);

    app.use ('*', (req,res) => {
        res.status(404).json({ error: 'Not found' });;
    });
};

module.exports = constructorMethod;