const mongoCollections = require('../config/mongoCollections');
const parklot = mongoCollections.parklot;
const { ObjectId } = require('mongodb');
//const validation = require('../validation');


module.exports = {
    async get(id) {
    //     if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
    //     id = validation.checkId(id,'ID');
        
        const parkLotCollection = await parklot();
        const parkLotData = await parkLotCollection.findOne( {_id : ObjectId(id) });
        if (parkLotData=== null) throw 'No band with that id';
        parkLotData._id = parkLotData._id.toString();
        return parkLotData;
    },

    async getAll() {
        if (arguments.length !== 0) throw "There should not input an argument !";
        const parkLotCollection = await parklot();
        const parkLotsList = await parkLotCollection.find({}).toArray();
        if (parkLotsList.length== 0) return [];
        for(let i = 0; i < parkLotsList.length; i++) {
            parkLotsList[i]._id = parkLotsList[i]._id.toString();
        }

        console.log(parkLotsList)

        return parkLotsList;
    },


    async create ( isDelete,parkLotname, parkingChargeStandard, parkingLotCoordinates, parklotLocationZipCode, disabilityFriendly, suitableVehicleSize, idfromUploader,trafficConditions, grade, capacity) {

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

        
        const parkLotCollection = await parklot();

        let newParkLot = {

            isDelete: isDelete,
            parkLotname : parkLotname , 
            parkingChargeStandard : parkingChargeStandard, 
            parkingLotCoordinates : parkingLotCoordinates,  
            parklotLocationZipCode : parklotLocationZipCode, 
            disabilityFriendly :disabilityFriendly,
            suitableVehicleSize : suitableVehicleSize, 
            idfromUploader : idfromUploader,
            trafficConditions : trafficConditions,
            rating : grade,
            parkingLotCapacity : capacity
        };

        const insertInfo = await parkLotCollection.insertOne(newParkLot);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

        const newId = insertInfo.insertedId.toString();
        const parkLot = await this.get(newId);
        return parkLot
    },

}