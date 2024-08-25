import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth-routes.js';
import blogRoutes from './routes/blog-routes.js';
import userPreferencesRoutes from './routes/user-preferences-routes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/user-preferences', userPreferencesRoutes);
const PORT = process.env.PORT || '8000';
app.listen(PORT, () => {
    mongoose
        .connect('mongodb+srv://devwaqas232:devwaqas232@cluster0.8gerr.mongodb.net/blog')
        .then(() => {
        console.log(`Server is running at Port ${PORT}`);
    })
        .catch((error) => {
        console.log(error);
    });
});
//# sourceMappingURL=app.js.map