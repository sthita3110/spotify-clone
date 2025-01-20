import { Album } from "../models/album.model.js";

export const getAllAlbums = async(req, res, next) =>{
    try {
        const albums = await Album.find(); //if find is empty, it will fetch all the objects
        res.status(200).json(albums);
    } catch (error) {
        console.log("Error in getAllAlbums Controller", error);
        next(error);
    }
}
export const getAlbumById = async(req, res, next) =>{
    try {
        const {albumId} = req.params;
        const album = await Album.findById(albumId).populate("songs"); //take the id, take a look at the songs table and fetch it

        if(!album){
            return res.status(404).json({message:"Album Not Found"});
        }
        res.status(200).json(album);
    } catch (error) {
        console.log("Error in getAlbumById Controller", error);
        next(error);
    }

}