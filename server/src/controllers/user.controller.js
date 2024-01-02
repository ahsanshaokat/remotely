const { User, Person, Profile, ProfileSkill } = require('../models');
const { CustomException } = require('../utils');

const createProfileSkill = async (request, response) => {
    try {
        const profileSkill = new ProfileSkill({
            ...request.body
        });
        await profileSkill.save();
        return response.status(201).send(profileSkill);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const getUsers = async (request, response) => {
    try {
        const users = await User.find({ });
        return response.status(201).send(users);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}


const getProfileSkills = async (request, response) => {
    const { _id } = request.params;

    try {
        const profileSkills = await ProfileSkill.find({ profileID: _id }).populate({
            path: 'skillID',
            model: 'Skill'
        });

       if (!profileSkills) {
            throw CustomException('Skills not found!', 404);
        }
        return response.send(profileSkills);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}


const deleteProfileSkill = async (request, response) => {
    const { _id } = request.params;

    try {
        const profileSkill = await ProfileSkill.findOne({ _id });

        await profileSkill.deleteOne({ _id });
        return response.send({
            error: false,
            message: 'Skill successfully deleted!'
        });
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const deleteUser = async (request, response) => {
    const { _id } = request.params;

    try {
        const user = await User.findOne({ _id });

        if (request.userID === user._id.toString()) {
            await User.deleteOne({ _id });
            return response.send({
                error: false,
                message: 'Account successfully deleted!'
            });
        }

        throw CustomException('Invalid request!. Cannot delete other user accounts.', 403);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const updatePerson = async (request, response) => {
    const { _id } = request.params;
    const { isLocked, isPrivate, profileUrl, profileQualifiesForVanityUrl, video,
        groups, tests, competencies, assignments, clientRelationship, otherExperiences,
        assignmentsInProgress, assignmentsSelected, employmentHistory, isCredlyFeatureEnabled,
        title,
        description,
        location,
        portrait,
        visibility,
        isDisabled,
        affiliated,
        isLooking,
        isLookingWeek,
        exposeFullName,
        confidentialityBound,
        isConsoleViewable,
        agencyRef,
        idVerified,
        exposeBillings,
        phoneVerified,
        state,
        hideAgencyEarnings,
        contractorTier,
        exclusiveAgencyContractor,
        hideJss,
        idBadgeStatus,
        contractToHire,
        agencyUid,
        firstName,
        lastName
    } = request.body;

    try {
        const person = await Person.findOneAndUpdate({ _id }, {
            $set: {
                isLocked, isPrivate, profileUrl, profileQualifiesForVanityUrl, video,
                groups, tests, competencies, assignments, clientRelationship, otherExperiences,
                assignmentsInProgress, assignmentsSelected, employmentHistory, isCredlyFeatureEnabled,
            }
        }, { new: true });

        const profile = await Profile.findOneAndUpdate({ _id: person.profileID }, {
            $set: {
                title,
                description,
                location,
                portrait,
                visibility,
                isDisabled,
                affiliated,
                isLooking,
                isLookingWeek,
                exposeFullName,
                confidentialityBound,
                isConsoleViewable,
                agencyRef,
                idVerified,
                exposeBillings,
                phoneVerified,
                state,
                hideAgencyEarnings,
                contractorTier,
                exclusiveAgencyContractor,
                hideJss,
                idBadgeStatus,
                contractToHire,
                agencyUid,
                firstName,
                lastName,
            }
        }, { new: true });

        const personProfile = await User.findOne({ personID: _id }, "username email image isSeller phone description").populate({
            path: 'personID',
            populate: {
                path: 'profileID', 
                model: 'Profile',
            }
        });
        return response.status(201).send(personProfile);
    }
    catch ({ message }) {
        return response.status(500).send({
            error: true,
            message: message
        });
    }
}

const getPerson = async (request, response) => {
    const { _id } = request.params;

    try {
        const person = await User.findOne({ personID: _id }, "fullname username email image isSeller phone description").populate({
            path: 'personID',
            populate: {
                path: 'profileID', 
                model: 'Profile',
                populate: {
                    path: 'skills',
                    model: 'profile-skills',
                    populate: {
                        path: 'skillID',
                        model: 'Skill'
                    }
                }
            }
        });

       if (!person) {
            throw CustomException('Person not found!', 404);
        }
        return response.send(person);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

module.exports = {
    createProfileSkill,
    getProfileSkills,
    deleteProfileSkill,
    deleteUser,
    updatePerson,
    getPerson,
    getUsers
}