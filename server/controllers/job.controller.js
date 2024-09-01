import { Job } from "../models/job.model";


export const postJob = async (req,res) => {
    try {
        const {tittle,description,requirements,salary,experienceLevel,location,jobType,position,companyId} = req.body;
        const userId = req.id;

        if(!tittle || !description || !requirements || !salary || !experienceLevel || !location || !jobType || !position || !companyId){
            return res.status(400).json({
                message: "Something is missing",
                success:false,
            });
        };
        const job = await Job.create({
            tittle,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({
            message:"Job created successfully",
            success:true,
            job,
        })

    } catch (error) {
        console.log(error);
        
    }
} 

export const getAllJob = async (req,res) => {

    try {
        
    } catch (error) {
        console.log(error);
        
    }

}