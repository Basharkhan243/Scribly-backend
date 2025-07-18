import mongoose,{Schema} from 'mongoose';

const notesSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        default:"Untitled Note"
    },
    content:{
        type:String,
        required:true
    },
    isPublic:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export const Note= mongoose.model('Note',notesSchema);