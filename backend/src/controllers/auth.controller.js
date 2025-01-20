import {User} from "../models/user.model.js"

export const authCallback = async (req, res, next) => {
    try {
      const { id, firstName, lastName, imageUrl } = req.body;
      const user = await User.findOne({clerkId: id});
      if(!user){
        try {
            // Attempt to create a new user
            await User.create({
              clerkId: id,
              fullName: `${firstName} ${lastName}`,
              imageUrl: imageUrl,
            });
          } catch (createError) {
            // Handle duplicate key error during user creation
            if (createError.code === 11000) {
              console.log("Duplicate key error during signup");
            } else {
              throw createError; // Re-throw other errors
            }
          }
      }
      return res.status(200).json({ success: true}); 
    } catch (error) {
      console.error("Error in authCallback:", error);
      next(error);
    }
  };
  