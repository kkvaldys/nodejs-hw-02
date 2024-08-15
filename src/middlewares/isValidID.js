//isValidID.js

import {isValidObjectId} from "mongoose";
import createHttpError from 'http-errors'

const isValidID = (req, res, next) => {
    const {id} = req.params.id;
    const stringID = id.toString();
    if(!isValidObjectId(stringID)) {
       return next(createHttpError(404, `${stringID} is not valid ID`));
    };
    next();
};

export default isValidID;