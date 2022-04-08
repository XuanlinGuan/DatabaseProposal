const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.comment;
const { ObjectId } = require('mongodb');
//const validation = require('../validation');


module.exports = {
    async get(id) {
    //     if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
    //     id = validation.checkId(id,'ID');
        
        const commentCollection = await comments();
        const commentData = await commentCollection.findOne( {_id : ObjectId(id) });
        if (commentData=== null) throw 'No band with that id';
        commentData._id = commentData._id.toString();
        return commentData;
    },

    async getAll() {
        if (arguments.length !== 0) throw "There should not input an argument !";
        const commentCollection = await comments();
        const commentsList = await commentCollection.find({}).toArray();
        if (commentsList.length== 0) return [];
        for(let i = 0; i < commentsList.length; i++) {
            commentsList[i]._id = commentsList[i]._id.toString();
        }
        console.log(commentsList);
    
        return commentsList;
    },

    async create ( isDelete, commentTag, commentdate,parkLotId,UserId,commentInfo,level,likedNumber, unlikedNumber) {

        // if (arguments.length !== 6) {
        //     throw "There must be 6 arguments !"
        // }

        // name = validation.checkString(name, 'Name');

        // website = validation.checkString(website, 'Website');
        
        // if (!website.match(/^[hH][tT][tT][pP]:\/\/[wW][wW][wW]\.[a-zA-Z0-9][^\s]{4,}\.[cC][oO][mM]$/)) {
        //     throw "The website format is invalid!"
        // }

        // recordLabel = validation.checkString(recordLabel, 'RecordLabel');

        // genre = validation.checkStringArray(genre, 'Genre');

        // bandMembers = validation.checkStringArray(bandMembers,'BandMembers');

        // yearFormed =validation.checkYear(yearFormed,'YearFormed');

        
        const commentCollection = await comments();

        let newComment = {

            isDelete : isDelete,
            commentTag : commentTag, 
            commentdate : commentdate,
            parkLotId : parkLotId,
            UserId : UserId,
            commentInfo : commentInfo,
            rating: level,
            likedNumber : likedNumber,
            unlikedNumber : unlikedNumber

        };

        const insertInfo = await commentCollection.insertOne(newComment);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

        const newId = insertInfo.insertedId.toString();
        const comment = await this.get(newId);
        return comment
    },

    // async remove(id) {
    //     if(arguments.length !== 1) throw "There must be one and one only argument !";
    //     id = validation.checkId(id, 'ID');

    //     const bandCollection = await bands();
                
    //     const deleteband = await bandCollection.findOne({_id : ObjectId(id)});
    //     if (!deleteband) throw `${id} not in the database ! `; 
        
    //     const deletionInfo = await bandCollection.deleteOne({_id : ObjectId(id)});

    //     if (deletionInfo.deletedCount === 0) throw `Could not delete band with id of ${id}`;
    //     return deleteband.name +" " + "has been successfully deleted" ;
    // },

    // async update(id, name, genre, website, recordLabel, bandMembers, yearFormed) {
    //     if (arguments.length !== 7) throw 'There must be 7 argument!';

    //     id = validation.checkId(id, 'ID');

    //     name = validation.checkString(name, 'Name');

    //     website = validation.checkString(website, 'Website');
        
    //     if (!website.match(/^[hH][tT][tT][pP]:\/\/[wW][wW][wW]\.[a-zA-Z0-9][^\s]{4,}\.[cC][oO][mM]$/)) {
    //         throw "The website format is invalid !"
    //     }

    //     recordLabel = validation.checkString(recordLabel, 'RecordLabel');

    //     genre = validation.checkStringArray(genre, 'Genre');

    //     bandMembers = validation.checkStringArray(bandMembers,'BandMembers');

    //     yearFormed =validation.checkYear(yearFormed,'YearFormed');
        
    //     const bandCollection = await bands();

    //     const old = await bandCollection.findOne({_id : ObjectId(id)});
        
    //     if (!old) throw `There is no ${id} in the database !`;
    
    //     let oldAlbums = old.albums;
    //     let oldOverAllRating = old.overallRating;

    //     let update =  {
    //         name : name,
    //         genre : genre,
    //         website :website,
    //         recordLabel : recordLabel,
    //         bandMembers : bandMembers,
    //         yearFormed : yearFormed,
    //         albums : oldAlbums,
    //         overallRating : oldOverAllRating
    //     };

    //     const updatedInfo = await bandCollection.replaceOne(
    //         {_id : ObjectId(id)},
    //          update
    //     );

    //     if (updatedInfo.modifiedCount === 0) {
    //         throw " Could not update";
    //     }

    //     return await this.get(id);

    // }


}