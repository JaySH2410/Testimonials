import * as SpaceService from '../Services/SpaceService.js'

export async function GetAllSpacesByUserId(req, res) {
    const {userId} = req.query;
    try {
        const allSpaces = await SpaceService.GetAllSpaceByUserId(userId);
        return res.json(allSpaces);
    }
    catch (err) {
        return res.status(500).json({ error: 'Some error occured' });
    }
}

export async function CreateSpace(req, res) {
    const { userId, sname, tname, tdescription, picture, isStarRating, que1, que2, que3 } = req.body;
    try {
        const newSpace = await SpaceService.CreateSpace(userId, sname, tname, tdescription, picture, isStarRating, que1, que2, que3);
        return res.status(201).json({
            message: 'Space created', 
            id: newSpace[0].id, 
            name: newSpace[0].name 
            });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to create space' });
    }
}

export async function EditSpace(req, res) {
    const { id, userId, sname, tname, tdescription, picture, isStarRating, que1, que2, que3 } = req.body;
    try {
        console.log("body",req.body);
        const newSpace = await SpaceService.EditSpace(id, userId, sname, tname, tdescription, picture, isStarRating, que1, que2, que3);
        console.log(newSpace);
        return res.status(201).json({message:"Space edited", id:newSpace[0].id, name:newSpace[0].sname});
    }
    catch (err) {
        console.log(err);
        
        return res.status(500).json({ error: 'Failed to edit space' });
    }
}

export async function GetSpaceDetailsById(req, res) {
    const { id } = req.query;
    try {
        const spaceDetails = await SpaceService.GetSpaceDetailsById(id);
        return res.json(spaceDetails);
    }
    catch (err) {
        return res.status(500).json({ error: 'Some error occured' });
    }
}


// export async function EditSpace() {
    
// }
