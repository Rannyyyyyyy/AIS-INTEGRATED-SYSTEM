import * as AuthAdapter from "../adapters/authAdapter.js"

export const registerStudent = async (studentProfile) => {
    if(studentProfile.firstName === ' '){
        throw new Error("First name is required")
    }

     if(studentProfile.lasttName === ' '){
        throw new Error("Last name is required")
    }

     if(studentProfile.dob === ' '){
        throw new Error("Date of Birth is required")
    }

     if(studentProfile.course === ' '){
        throw new Error("Course is required")
    }

     if(studentProfile.major === ' '){
        throw new Error("Major is required")
    }

    if(studentProfile.address === ' '){
        throw new Error("Address is required")
    }

     if(studentProfile.status === ' '){
        throw new Error("Status is required")
    }

    return await AuthAdapter.create(studentProfile);
}