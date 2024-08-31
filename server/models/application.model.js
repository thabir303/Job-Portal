import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        require:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    status:{
        type:String,
        enum:['accepted','pending','rejected'],
        default: 'pending',
    }

},{timestamps:true});

export const Application = mongoose.Schema('Application',applicationSchema);